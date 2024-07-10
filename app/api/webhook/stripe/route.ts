import { handlePaymentIntentSucceeded } from "@/lib/events/checkoutCompleted";
import { stripe } from "@/lib/payments/stripe/stripe";
import { CreateOrder } from "@/models/orders/CreateOrderSchema";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getFormattedDateTime } from "@/utils/getCurrentDateTime";
import { formatPrice } from "@/utils/priceFormatter";
import { NextResponse } from "next/server";
import { Transactions } from "@/models/transactions/TransactionSchema";
import { getCurrentMonthAndYear } from "@/utils/getCurrentMonthAndYear";
import { SalesActivity } from "@/models/sales/SalesActivity";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { sendPaymentSuccessMail } from "@/emails/models/payment/sendPaymentSuccessMail";

export async function POST(request: Request) {
  const secretHash = process.env.STRIPE_WEBHOOK_SECRET!;
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

  switch (event.type) {
    case "checkout.session.completed":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      if (
        paymentIntent.status !== "complete" ||
        paymentIntent.payment_status !== "paid"
      ) {
        return NextResponse.json({ status: 400 });
      }

      await connectMongoDB();
      //   Update Order Payment Information
      const currency = getCurrencySymbol(paymentIntent.currency.toUpperCase());
      const formatted_date = getFormattedDateTime();
      const date = new Date();

      const meta = paymentIntent.metadata;
      const payment_information = {
        status: "complete",
        transaction_value: formatPrice(
          paymentIntent.amount_total / 100,
          currency
        ),
        transaction_date: formatted_date,
        transaction_reference: paymentIntent.id,
      };
      const updateOrderPaymentInfo = await CreateOrder.updateOne(
        {
          "buyer.email": meta.user_email,
          "artwork_data.art_id": meta.art_id,
        },
        {
          $set: {
            payment_information,
          },
        }
      );
      if (!updateOrderPaymentInfo) return NextResponse.json({ status: 400 });

      //TODO: Update artwork tag to 'SOLD'

      // Update transaction collection
      const data: Omit<TransactionModelSchemaTypes, "trans_id"> = {
        trans_amount: formatPrice(paymentIntent.amount_total / 100, currency),
        trans_date: date,
        trans_gallery_id: meta.gallery_id,
        trans_owner_id: meta.user_id,
        trans_owner_role: "user",
        trans_reference: paymentIntent.id,
        trans_type: "purchase_payout",
      };

      const createTransaction = await Transactions.create(data);

      if (!createTransaction) return NextResponse.json({ status: 400 });

      //   Add transaction to sales activity

      const { month, year } = getCurrentMonthAndYear();
      const activity = {
        month,
        year,
        value: paymentIntent.amount_total / 100,
        gallery_id: meta.gallery_id,
      };

      const addSalesData = await SalesActivity.create({ ...activity });

      if (!addSalesData) return NextResponse.json({ status: 400 });

      await sendPaymentSuccessMail({ email: meta.user_email });
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
