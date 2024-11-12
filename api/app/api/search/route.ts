import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@shared/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { searchTerm } = await request.json();

    const regex = new RegExp(searchTerm, "i");

    const foundArtworks = await Artworkuploads.find(
      {
        $or: [{ title: regex }, { artist: regex }],
      },
      "artist title url art_id pricing medium rarity availability like_IDs"
    ).exec();

    return NextResponse.json(
      {
        message: "Successful",
        data: foundArtworks,
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
