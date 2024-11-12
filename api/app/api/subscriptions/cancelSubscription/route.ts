import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Subscriptions } from "@shared/models/subscriptions/SubscriptionSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id } = await request.json();

    const cancel_subscription = await Subscriptions.updateOne(
      { "customer.gallery_id": gallery_id },
      { $set: { status: "canceled" } }
    );

    if (!cancel_subscription)
      throw new ServerError("An error has occured, please try again");
    return NextResponse.json(
      { message: "Subscription has been canceled" },
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
