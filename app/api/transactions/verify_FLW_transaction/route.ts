import {
  ConflictError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { sendSubscriptionPaymentSuccessfulMail } from "@/emails/models/subscription/sendSubscriptionPaymentSuccessMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await connectMongoDB();
    const verify_transaction = await fetch(
      `https://api.flutterwave.com/v3/transactions/${data.transaction_id}/verify`,
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

    if (convert_verify_transaction_json_response.status !== "success") {
      return NextResponse.json(
        {
          message: convert_verify_transaction_json_response.message,
        },
        { status: 404 }
      );
    }

    if (convert_verify_transaction_json_response.data.status !== "successful") {
      return NextResponse.json(
        {
          message: "Transaction failed",
          data: convert_verify_transaction_json_response.data,
        },
        { status: 200 }
      );
    } else {
      // If subscription verification, save token to database
      if (
        convert_verify_transaction_json_response.data.meta.type ===
        "subscription"
      ) {
        if (
          convert_verify_transaction_json_response.data.status ===
            "successful" &&
          convert_verify_transaction_json_response.data.tx_ref ===
            convert_verify_transaction_json_response.data.tx_ref &&
          convert_verify_transaction_json_response.data.amount ===
            convert_verify_transaction_json_response.data.amount &&
          convert_verify_transaction_json_response.data.currency ===
            convert_verify_transaction_json_response.data.currency
        ) {
          // Success! Confirm the customer's payment

          // Check DB to see if a subscription with this customer reference is present
          const found_customer = await Subscriptions.findOne({
            "customer.email":
              convert_verify_transaction_json_response.data.customer.email,
          });
          // Create new customer subscription

          var subscriptionStartDate = new Date();

          // Calculate subscription end date (current date and time + 30 days - 2 minutes)
          var subscriptionEndDate = new Date(subscriptionStartDate);
          subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
          if (!found_customer) {
            const subscription_data = {
              sub_card_info: convert_verify_transaction_json_response.data.card,
              sub_start_date: subscriptionStartDate.toISOString(),
              sub_expiry_date: subscriptionEndDate.toISOString(),
              sub_status: "active",
              sub_value: convert_verify_transaction_json_response.data.amount,
              sub_currency:
                convert_verify_transaction_json_response.data.currency,
              sub_tx_ref: convert_verify_transaction_json_response.data.tx_ref,
              sub_flw_ref:
                convert_verify_transaction_json_response.data.flw_ref,
              sub_payment_type:
                convert_verify_transaction_json_response.data.payment_type,
              sub_payment_status:
                convert_verify_transaction_json_response.data.status,
              customer: convert_verify_transaction_json_response.data.customer,
            };

            const create_customer_subscription_document =
              await Subscriptions.create({
                ...subscription_data,
              });

            if (!create_customer_subscription_document)
              throw new ServerError(
                "An error has occured, please contact customer service"
              );
            else {
              // Send subscription started email
              const update_customer_sub_status = await AccountGallery.updateOne(
                {
                  email:
                    convert_verify_transaction_json_response.data.customer
                      .email,
                },
                { $set: { subscription_active: true } }
              );

              if (!update_customer_sub_status)
                throw new ServerError(
                  "An error has occured, please contact customer service"
                );

              // const update_artwork_show_on_sub_status = await Artworkuploads.updateMany({gallery_id: })
              await sendSubscriptionPaymentSuccessfulMail({
                name: convert_verify_transaction_json_response.data.customer
                  .name,
                email:
                  convert_verify_transaction_json_response.data.customer.email,
              });
              return NextResponse.json(
                {
                  message: "Transaction successful",
                  data: convert_verify_transaction_json_response.data,
                },
                { status: 200 }
              );
            }
          }
        } else {
          throw new ConflictError("Invalid transaction");
        }
      } else {
        // If payment type is not subscription, add it to transactions database
        return NextResponse.json(
          {
            message: "Transaction successful",
            data: convert_verify_transaction_json_response.data,
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    console.log(error);
    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
