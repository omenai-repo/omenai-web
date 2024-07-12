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
  const secretHash = process.env.STRIPE_PAYMENT_SUCCESS_WEBHOOK_SECRET!;
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

  if (
    event.type === "checkout.session.async_payment_succeeded" ||
    event.type === "checkout.session.completed"
  ) {
    const paymentIntent = event.data.object;
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

    // Create the update info
    const payment_information = {
      status: "completed",
      transaction_value: formatPrice(
        paymentIntent.amount_total / 100,
        currency
      ),
      transaction_date: formatted_date,
      transaction_reference: paymentIntent.id,
    };

    // Apply update to CreateOrder collection
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

    const email_order_info = await CreateOrder.findOne(
      {
        "buyer.email": meta.user_email,
        "artwork_data.art_id": meta.art_id,
      },
      "artwork_data order_id createdAt buyer"
    );

    const price = formatPrice(paymentIntent.amount_total / 100, currency);
    const transaction_Id = createTransaction.trans_id;
    await sendPaymentSuccessMail({
      email: meta.user_email,
      name: email_order_info.buyer.name,
      artwork: email_order_info.artwork_data.title,
      order_id: email_order_info.order_id,
      order_date: email_order_info.createdAt,
      transaction_Id,
      price,
    });
  }
  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ status: 200 });
}
