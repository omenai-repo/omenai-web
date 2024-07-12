import { formatISODate } from "@/utils/formatISODate";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { sendPaymentSuccessMail } from "@/emails/models/payment/sendPaymentSuccessMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { stripe } from "@/lib/payments/stripe/stripe";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { CreateOrder } from "@/models/orders/CreateOrderSchema";
import { formatPrice } from "@/utils/priceFormatter";
import { NextResponse } from "next/server";
import { formatIntlDateTime } from "@/utils/formatIntlDateTime";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const email_order_info = await CreateOrder.findOne(
      {
        "buyer.email": "dantereus1@gmail.com",
        "artwork_data.art_id": "7b3d8ac1-7313-4da9-b849-c7ea902f625f",
      },
      "artwork_data order_id createdAt buyer"
    );

    const price = "$435.53";
    await sendPaymentSuccessMail({
      email: "dantereus1@gmail.com",
      name: email_order_info.buyer.name,
      artwork: email_order_info.artwork_data.title,
      order_id: email_order_info.order_id,
      order_date: formatIntlDateTime(email_order_info.createdAt),
      transaction_Id: "vakvjavnajd",
      price,
    });

    return NextResponse.json({
      data: "Done",
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
