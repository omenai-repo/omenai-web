import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@shared/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { id, value, like_id } = await request.json();

    const updateImpression = await Artworkuploads.updateOne(
      { art_id: id },
      { $inc: { impressions: value === true ? 1 : -1 } }
    );

    if (!updateImpression)
      throw new ServerError("An unexpected error has occured.");

    if (value) {
      await Artworkuploads.updateOne(
        { art_id: id },
        { $push: { like_IDs: like_id } }
      );
    } else {
      await Artworkuploads.updateOne(
        { art_id: id },
        { $pull: { like_IDs: like_id } }
      );
    }

    return NextResponse.json(
      {
        message: "Successful",
        data: updateImpression,
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
