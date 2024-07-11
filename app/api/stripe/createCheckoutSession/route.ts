import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { stripe } from "@/lib/payments/stripe/stripe";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Create Checkout Sessions from body params.
    await connectMongoDB();
    const { item, amount, gallery_id, meta } = await request.json();

    const gallery = await AccountGallery.findOne(
      { gallery_id },
      "connected_account_id"
    );

    const commission = Math.round(amount * 0.3 * 100);
    const currentTimestampSeconds = Math.floor(Date.now() / 1000);
    const thirtyMinutesOffset = 30 * 60;
    const futureTimestamp = currentTimestampSeconds + thirtyMinutesOffset;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { ...meta, gallery_id },
      payment_intent_data: {
        application_fee_amount: commission,
        transfer_data: {
          destination: gallery.connected_account_id,
        },
      },
      expires_at: futureTimestamp,
      mode: "payment",
      success_url: `http://localhost:3000/payment/success`,
      cancel_url: `http://localhost:3000/payment/cancel`,
    });
    if (!session) throw new ServerError("Something went wrong, try again");
    return NextResponse.json({
      message: "Checkout Session created... Redirecting",
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
