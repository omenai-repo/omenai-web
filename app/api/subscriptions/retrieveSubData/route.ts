import { NotFoundError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id } = await request.json();

    const subscription_data = await Subscriptions.findOne({
      "customer.gallery_id": gallery_id,
    });

    if (!subscription_data)
      return NextResponse.json(
        { message: "Data not found", data: null },
        { status: 200 }
      );

    return NextResponse.json(
      {
        message: "Successfully retrieved subscription data",
        data: subscription_data,
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
