import {
  ConflictError,
  ServerError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@shared/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data: {
      filter: ArtworkPriceFilterData;
      art_id: string;
    } = await request.json();

    if (data === null || data === undefined)
      throw new ConflictError("Invalid input data");

    const updateArtworkPrice = await Artworkuploads.updateOne(
      { art_id: data.art_id },
      { $set: { ...data.filter } }
    );

    if (!updateArtworkPrice)
      throw new ServerError("Request could not be completed at this time.");

    return NextResponse.json(
      {
        message: "Successful",
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
