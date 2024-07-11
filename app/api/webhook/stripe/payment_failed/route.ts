import { stripe } from "@/lib/payments/stripe/stripe";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secretHash = process.env.STRIPE_PAYMENT_FAILED_WEBHOOK_SECRET!;
  const rawBody = await request.text();

  let event;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (secretHash) {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripe-signature");
    try {
      event = await stripe.webhooks.constructEvent(
        rawBody,
        signature,
        secretHash
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return NextResponse.json({ status: 400 });
    }
  }

  if ((event.type = "checkout.session.async_payment_failed")) {
    //   await sendPaymentSuccessMail({  });
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ status: 200 });
}
