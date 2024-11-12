import { NotFoundError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@shared/models/artworks/UploadArtworkSchema";
import { trimWhiteSpace } from "@shared/utils/trimWhitePace";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { title } = await request.json();
    const new_title = trimWhiteSpace(title);

    const artwork = await Artworkuploads.findOne(
      { title: new_title },
      "art_id gallery_id title artist pricing url availability"
    ).exec();
    if (!artwork) throw new NotFoundError("Artwork not found");

    return NextResponse.json(
      {
        message: "Successful",
        data: artwork,
      },
      { status: 200 }
    );
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response!.message },
      { status: error_response!.status }
    );
  }
}
