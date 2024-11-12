import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@shared/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { id } = await request.json();

    const foundImpression = await Artworkuploads.findOne(
      { art_id: id },
      "like_IDs"
    );

    if (!foundImpression)
      throw new ServerError("An unexpected error has occured.");

    return NextResponse.json(
      {
        message: "arwork found",
        data: foundImpression,
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
