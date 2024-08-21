import { sendSubscriptionPaymentFailedMail } from "@/emails/models/subscription/sendSubscriptionPaymentFailedMail";
import { sendSubscriptionPaymentSuccessfulMail } from "@/emails/models/subscription/sendSubscriptionPaymentSuccessMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { SubscriptionPlan } from "@/models/subscriptions/PlanSchema";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { SubscriptionTransactions } from "@/models/transactions/SubscriptionTransactionSchema";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getSubscriptionExpiryDate } from "@/utils/getSubscriptionExpiryDate";
import { formatPrice } from "@/utils/priceFormatter";
import { NextResponse } from "next/server";
import crypto from "crypto";
export async function POST(request: Request) {
  const req = await request.json();
  const secretHash = process.env.FLW_SECRET_HASH!;
  const signature = request.headers.get("verif-hash");

  if (!signature) {
    // This request isn't from Flutterwave, discard
    return NextResponse.json({ status: 401 });
  }

  // Convert the signature and secret hash to Buffers
  const signatureBuffer = Buffer.from(signature, "utf8");
  const secretHashBuffer = Buffer.from(secretHash, "utf8");

  // Check if they have the same length
  if (signatureBuffer.length !== secretHashBuffer.length) {
    return NextResponse.json({ status: 401 });
  }

  // Use crypto.timingSafeEqual to compare
  const isValidSignature = crypto.timingSafeEqual(
    signatureBuffer,
    secretHashBuffer
  );

  if (!isValidSignature) {
    // Signature doesn't match, discard the request
    return NextResponse.json({ status: 401 });
  }
  // Send failure mail if status is failure

  if (req.event === "charge.completed") {
    // Check if this transaction has already been processed
    // const existingTransaction = await SubscriptionTransactions.findOne({
    //   reference: req.data.id,
    // });

    // if (existingTransaction) {
    //   // Transaction already processed
    //   return NextResponse.json({ status: 200 });
    // }

    console.log(req.data);

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

    console.log(convert_verify_transaction_json_response.data);

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

      const currency = getCurrencySymbol("USD");

      try {
        // Retrieve the MongoDB Client
        const date = new Date();

        // Success! Confirm the customer's payment

        // Update transaction collection
        session.startTransaction();

        if (
          convert_verify_transaction_json_response.meta_data.charge_type !==
            null &&
          convert_verify_transaction_json_response.meta_data.charge_type ===
            "card_change"
        ) {
          await Subscriptions.updateOne(
            {
              "customer.gallery_id":
                convert_verify_transaction_json_response.meta_data.gallery_id,
            },
            {
              $set: {
                card: convert_verify_transaction_json_response.data.card,
              },
            },
            { session }
          );
          const response = await fetch(
            `https://api.flutterwave.com/v3/transactions/${convert_verify_transaction_json_response.data.id}/refund`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.FLW_TEST_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.json();

          if (result.status === "error")
            return NextResponse.json({ status: 401 });
          else {
            return NextResponse.json({ status: 200 });
          }
        } else {
          const data: Omit<
            SubscriptionTransactionModelSchemaTypes,
            "trans_id"
          > = {
            amount: formatPrice(
              convert_verify_transaction_json_response.data.amount,
              currency
            ),
            date,
            gallery_id:
              convert_verify_transaction_json_response.meta_data.gallery_id,
            reference: convert_verify_transaction_json_response.data.id,
            type: "subscription",
          };

          const create_transaction = await SubscriptionTransactions.create(
            data
          );

          // Check DB to see if a subscription with this customer reference is present
          const found_customer = await Subscriptions.findOne({
            "customer.gallery_id":
              convert_verify_transaction_json_response.meta_data.gallery_id,
          });
          // Create new customer subscription

          const expiry_date = getSubscriptionExpiryDate(
            convert_verify_transaction_json_response.meta_data.plan_interval
          );
          const plan = await SubscriptionPlan.findById(
            convert_verify_transaction_json_response.meta_data.plan_id
          );

          if (!found_customer) {
            const subscription_data = {
              card: convert_verify_transaction_json_response.data.card,
              start_date: date.toISOString(),
              expiry_date: expiry_date.toISOString(),
              status: "active",
              payment: {
                value: convert_verify_transaction_json_response.data.amount,
                currency: "USD",
                type: convert_verify_transaction_json_response.data
                  .payment_type,
                flw_ref: convert_verify_transaction_json_response.data.flw_ref,
                status: convert_verify_transaction_json_response.data.status,
                trans_ref: create_transaction.trans_id,
              },
              customer: {
                ...convert_verify_transaction_json_response.data.customer,
                gallery_id:
                  convert_verify_transaction_json_response.meta_data.gallery_id,
              },
              plan_details: {
                type: plan.name,
                value: plan.pricing,
                currency: plan.currency,
                interval:
                  convert_verify_transaction_json_response.meta_data
                    .plan_interval,
              },
              next_charge_params: {
                value:
                  convert_verify_transaction_json_response.meta_data
                    .plan_interval === "monthly"
                    ? +plan.pricing.monthly_price
                    : +plan.pricing.annual_price,
                currency: "USD",
                type: plan.name,
                interval:
                  convert_verify_transaction_json_response.meta_data
                    .plan_interval,
                id: plan._id,
              },
            };

            await Subscriptions.create(
              {
                ...subscription_data,
              },
              { session }
            );

            await AccountGallery.updateOne(
              {
                gallery_id:
                  convert_verify_transaction_json_response.meta_data.gallery_id,
              },
              { $set: { subscription_active: true } }
            );
          } else
            await Subscriptions.updateOne(
              {
                "customer.email":
                  convert_verify_transaction_json_response.data.customer.email,
              },
              {
                $set: {
                  card: convert_verify_transaction_json_response.data.card,
                  start_date: date.toISOString(),
                  expiry_date: expiry_date.toISOString(),
                  status: "active",
                  payment: {
                    value: convert_verify_transaction_json_response.data.amount,
                    currency: "USD",
                    type: convert_verify_transaction_json_response.data
                      .payment_type,
                    flw_ref:
                      convert_verify_transaction_json_response.data.flw_ref,
                    status:
                      convert_verify_transaction_json_response.data.status,
                    trans_ref: create_transaction.trans_id,
                  },
                  customer: {
                    ...convert_verify_transaction_json_response.data.customer,
                    gallery_id:
                      convert_verify_transaction_json_response.meta_data
                        .gallery_id,
                  },
                  plan_details: {
                    type: plan.name,
                    value: plan.pricing,
                    currency: plan.currency,
                    interval:
                      convert_verify_transaction_json_response.meta_data
                        .plan_interval,
                  },
                  next_charge_params: {
                    value:
                      convert_verify_transaction_json_response.meta_data
                        .plan_interval === "monthly"
                        ? +plan.pricing.monthly_price
                        : +plan.pricing.annual_price,
                    currency: "USD",
                    type: plan.name,
                    interval:
                      convert_verify_transaction_json_response.meta_data
                        .plan_interval,
                    plan_id: plan._id,
                  },
                },
              },
              { session }
            );
        }
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
