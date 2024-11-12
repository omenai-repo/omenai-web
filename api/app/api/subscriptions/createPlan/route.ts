import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { SubscriptionPlan } from "@shared/models/subscriptions/PlanSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = await request.json();

    const createPlan = await SubscriptionPlan.create({ ...data });

    if (!createPlan)
      throw new ServerError(
        "Something went wrong with creating this plan. Please contact support"
      );

    return NextResponse.json({ message: "Plan created successfully" });
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
