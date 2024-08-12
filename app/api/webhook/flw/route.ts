import { sendSubscriptionPaymentFailedMail } from "@/emails/models/subscription/sendSubscriptionPaymentFailedMail";
import { sendSubscriptionPaymentSuccessfulMail } from "@/emails/models/subscription/sendSubscriptionPaymentSuccessMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { SubscriptionTransactions } from "@/models/transactions/SubscriptionTransactionSchema";
import { formatPrice } from "@/utils/priceFormatter";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const secretHash = process.env.FLW_SECRET_HASH;
  const signature = request.headers.get("verif-hash");

  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave, discard
    return NextResponse.json({ status: 401 });
  }
  // Send failure mail if status is failure

  if (req.event === "charge.completed") {
    if (req.data.status === "failed") {
      await sendSubscriptionPaymentFailedMail({
        name: req.data.customer.name,
        email: req.data.customer.email,
      });

      return NextResponse.json({ status: 200 });
    }
    if (req.data.status === "pending") {
      // await sendSubscriptionPaymentFailedMail({
      //   name: req.data.customer.name,
      //   email: req.data.customer.email,
      // });

      return NextResponse.json({ status: 401 });
    }
    // Verify transaction again

    const verify_transaction = await fetch(
      `https://api.flutterwave.com/v3/transactions/${req.data.id}/verify`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLW_TEST_SECRET_KEY}`,
        },
      }
    );

    const convert_verify_transaction_json_response =
      await verify_transaction.json();

    if (
      convert_verify_transaction_json_response.data.status === "successful" &&
      convert_verify_transaction_json_response.data.tx_ref ===
        req.data.tx_ref &&
      convert_verify_transaction_json_response.data.amount ===
        req.data.amount &&
      convert_verify_transaction_json_response.data.currency ===
        req.data.currency
    ) {
      const client = await connectMongoDB();

      // Create a session with the initialized MongoClient
      const session = await client.startSession();

      try {
        // Retrieve the MongoDB Client
        const date = new Date();

        // Success! Confirm the customer's payment

        // Update transaction collection
        session.startTransaction();
        const data: Omit<SubscriptionTransactionModelSchemaTypes, "trans_id"> =
          {
            amount: formatPrice(req.data.amount, "USD"),
            date,
            gallery_id: req.meta_data.gallery_id,
            reference: req.data.id,
            type: "subscription",
          };

        const create_transaction = await SubscriptionTransactions.create(data);

        // Check DB to see if a subscription with this customer reference is present
        const found_customer = await Subscriptions.findOne({
          "customer.email": req.data.customer.email,
        });
        // Create new customer subscription

        // Calculate subscription end date (current date and time + 30 days - 2 minutes)
        var subscriptionEndDate = new Date(date);
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
        subscriptionEndDate.setMinutes(subscriptionEndDate.getMinutes());

        if (!found_customer) {
          const subscription_data = {
            card: req.data.card,
            start_date: date.toISOString(),
            expiry_date: subscriptionEndDate.toISOString(),
            status: "active",
            payment: {
              value: req.data.amount,
              currency: "USD",
              type: req.data.payment_type,
              flw_ref: req.data.flw_ref,
              status: req.data.status,
              trans_ref: create_transaction.trans_id,
            },
            customer: req.data.customer.email,
          };

          await Subscriptions.create({
            ...subscription_data,
          });

          await AccountGallery.updateOne(
            { email: req.data.customer.email },
            { $set: { subscription_active: true } }
          );

          // const update_artwork_show_on_sub_status = await Artworkuploads.updateMany({gallery_id: })
        }

        await Subscriptions.updateOne(
          { customer: req.data.customer.email },
          {
            $set: {
              card: req.data.card,
              start_date: date.toISOString(),
              expiry_date: subscriptionEndDate.toISOString(),
              status: "active",
              payment: {
                value: req.data.amount,
                currency: "USD",
                type: req.data.payment_type,
                flw_ref: req.data.flw_ref,
                status: req.data.status,
                trans_ref: create_transaction.trans_id,
              },
              customer: req.data.customer.email,
            },
          }
        );
      } catch (error) {
        console.log("An error occurred during the transaction:" + error);

        // If any errors are encountered, abort the transaction process, this rolls back all updates and ensures that the DB isn't written to.
        await session.abortTransaction();
        // Exit the webhook
        return NextResponse.json({ status: 401 });
      } finally {
        // End the session to avoid reusing the same Mongoclient for different transactions
        await session.endSession();
      }

      await sendSubscriptionPaymentSuccessfulMail({
        name: req.data.customer.name,
        email: req.data.customer.email,
      });
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ status: 200 });
    }
  }
}
