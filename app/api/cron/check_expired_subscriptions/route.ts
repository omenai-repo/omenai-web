import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import generateString, { generateAlphaDigit } from "@/utils/generateToken";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET() {
  await connectMongoDB();
  const currentDate = new Date();
  const expired_user_emails = await Subscriptions.find(
    {
      sub_expiry_date: { $lte: currentDate },
      sub_status: { $ne: "cancelled" },
    },
    "customer.email sub_card_info.token"
  );

  await Subscriptions.updateMany(
    {
      sub_expiry_date: { $lte: currentDate },
    },
    { $set: { sub_status: "expired" } }
  );
  const emailsToUpdate = expired_user_emails.map((email) => {
    return email.customer.email;
  });

  // Iterate through the expired documents

  await AccountGallery.updateMany(
    { email: { $in: emailsToUpdate } },
    { $set: { subscription_active: false } }
  );

  const user_token_data = expired_user_emails.map((doc) => {
    // Handle the expired document (e.g., update a field)
    // Update the necessary field for the expired document
    const tx_ref = generateString();
    return {
      token: doc.sub_card_info.token,
      email: doc.customer.email,
      currency: "USD",
      country: "US",
      amount: "200",
      tx_ref,
    };
  });

  const response = await fetch(
    "https://api.flutterwave.com/v3/bulk-tokenized-charges",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Expired subscription reactivation attempt",
        retry_strategy: {
          retry_interval: 120,
          retry_amount_variable: 60,
          retry_attempt_variable: 2,
        },
        bulk_data: user_token_data,
      }),
    }
  );

  const result = await response.json();

  return NextResponse.json(
    {
      message: "This cron job ran at it's designated time",
      data: result,
      token: user_token_data,
    },
    { status: 200 }
  );
}
