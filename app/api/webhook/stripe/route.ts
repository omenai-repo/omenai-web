import { handlePaymentIntentSucceeded } from "@/lib/events/checkoutCompleted";
import { stripe } from "@/lib/payments/stripe/stripe";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secretHash = process.env.STRIPE_WEBHOOK_SECRET!;
  const req = await request.json();
  let event;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (secretHash) {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripe-signature");
    try {
      event = await stripe.webhooks.constructEvent(
        request.body,
        signature,
        secretHash
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return NextResponse.json({ status: 400 });
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    case "checkout.session.expired":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ status: 200 });
}
