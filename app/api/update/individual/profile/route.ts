import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { AccountIndividual } from "@/models/auth/IndividualSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data = await request.json();

    const updatedData = await AccountIndividual.findOneAndUpdate(
      { user_id: data.id },
      { $set: { ...data } }
    );

    if (!updatedData) throw new ServerError("An unexpected error has occured.");

    return NextResponse.json(
      {
        message: "Profile data updated",
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
