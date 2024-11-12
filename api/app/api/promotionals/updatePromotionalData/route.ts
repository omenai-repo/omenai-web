import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { PromotionalModel } from "@shared/models/promotionals/PromotionalSchema";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data: { id: ObjectId; updates: PromotionalDataUpdateTypes } =
      await request.json();

    const updatePromotionalData = await PromotionalModel.findByIdAndUpdate(
      data.id,
      { $set: data.updates }
    );

    if (!updatePromotionalData)
      throw new ServerError(
        "Something went wrong, please try again or contact support"
      );

    return NextResponse.json({ message: "Promotional data updated" });
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
