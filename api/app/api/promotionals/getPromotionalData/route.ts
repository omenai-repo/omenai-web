import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { PromotionalModel } from "@shared/models/promotionals/PromotionalSchema";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongoDB();

    const get_promotionals = await PromotionalModel.find().sort({
      createdAt: -1,
    }); // Sort by createdAt in descending order (newest first)

    if (!get_promotionals) throw new Error("Something went wrong");

    return NextResponse.json({
      message: "Promotional data retreived",
      data: get_promotionals,
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
