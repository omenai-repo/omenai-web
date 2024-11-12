import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { stripe } from "@shared/lib/payments/stripe/stripe";
import { NextResponse } from "next/server";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { customer } = await request.json();
    const account = await stripe.accounts.create({
      metadata: customer,
      email: customer.email,
      country: customer.country,
      controller: {
        stripe_dashboard: {
          type: "express",
        },
        fees: {
          payer: "application",
        },
        losses: {
          payments: "application",
        },
      },
      capabilities: {
        transfers: {
          requested: true,
        },
      },
      tos_acceptance: {
        service_agreement: customer.country === "US" ? null : "recipient",
      },
    });

    if (!account)
      throw new ServerError("Something went wrong. Contact Support");

    const update_connected_id = await AccountGallery.updateOne(
      {
        email: customer.email,
      },
      { $set: { connected_account_id: account.id } }
    );

    if (!update_connected_id)
      throw new ServerError("Something went wrong. Contact Support");

    return NextResponse.json(
      {
        message: "Connected account created",
        account_id: account.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
