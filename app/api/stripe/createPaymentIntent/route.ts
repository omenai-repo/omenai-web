import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { stripe } from "@/lib/payments/stripe/stripe";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { amount, gallery_id, meta } = await request.json();
    const gallery = await AccountGallery.findOne(
      { gallery_id },
      "connected_account_id"
    );
    if (!gallery)
      throw new ServerError("Something went wrong. Please try again");
    // Use an existing Customer ID if this is a returning customer.

    const commission = Math.round(amount * 0.3 * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: { ...meta, gallery_id },
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: commission,
      transfer_data: {
        destination: gallery.connected_account_id,
      },
    });

    return NextResponse.json({
      paymentIntent: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PK!,
    });
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
