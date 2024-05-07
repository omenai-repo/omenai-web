import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  // Calculate the date that is three days ago
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  await Subscriptions.updateMany(
    { sub_expiry_date: { $lt: threeDaysAgo } },
    { $set: { sub_status: "cancelled " } }
  );
  // TODO: Send email to all emails telling them their card is unable to be charged.

  return NextResponse.json({ message: "Successful" });
}
