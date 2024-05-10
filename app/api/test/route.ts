import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { TestDb } from "@/models/test/TestSchema";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectMongoDB();
    // Update all documents
    const updateResult = await Artworkuploads.updateMany(
      {}, // Empty filter to update all documents
      {
        $set: {
          "pricing.currency": "$", // Add new field "currency" with value "$"
        },
      }
    );

    if (!updateResult) throw new Error("Something went wrong");
    return NextResponse.json({ message: "Created" }, { status: 200 });
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);
    console.log(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
