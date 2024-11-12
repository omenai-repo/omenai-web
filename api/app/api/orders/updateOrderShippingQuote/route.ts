import { CreateOrder } from "@shared/models/orders/CreateOrderSchema";
import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";

import { NextResponse } from "next/server";
import { sendOrderAcceptedMail } from "@shared/emails/models/orders/orderAcceptedMail";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { data, order_id } = await request.json();

    const updateOrders = await CreateOrder.findOneAndUpdate(
      { order_id },
      {
        $set: {
          shipping_quote: data,
          order_accepted: { status: "accepted", reason: "" },
        },
      },
      { new: true }
    );

    if (!updateOrders) throw new ServerError("Quote could not be updated");

    await sendOrderAcceptedMail({
      name: updateOrders.buyer.name,
      email: updateOrders.buyer.email,
      order_id: updateOrders.order_id,
      user_id: updateOrders.buyer.user_id,
      artwork_data: updateOrders.artwork_data,
    });

    return NextResponse.json(
      {
        message: "Successfully updated quote data",
      },
      { status: 200 }
    );
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
