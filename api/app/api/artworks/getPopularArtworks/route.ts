import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@shared/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { id } = await request.json();

    const popular_artworks = await Artworkuploads.find({ gallery_id: id })
      .sort({
        impressions: -1,
      })
      .limit(3)
      .exec();

    if (!popular_artworks)
      throw new ServerError("An eunexpected error has occured.");

    const filter_popular_artworks = popular_artworks.filter((art) => {
      return art.impressions > 0;
    });

    return NextResponse.json(
      {
        message: "Successful",
        data: filter_popular_artworks,
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
