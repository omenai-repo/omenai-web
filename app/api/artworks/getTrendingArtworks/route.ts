import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { page } = await request.json();

    const skip = (page - 1) * 10;

    const allTrendingArtworks = await Artworkuploads.find({
      impressions: { $gt: 0 },
    })
      .skip(skip)
      .limit(20)
      .sort({
        impressions: -1,
      });

    if (!allTrendingArtworks) throw new ServerError("An error was encountered");

    return NextResponse.json(
      {
        message: "Successful",
        data: allTrendingArtworks,
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
