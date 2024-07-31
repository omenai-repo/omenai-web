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

    const { page, preferences } = await request.json();

    const skip = (page - 1) * 10;

    const userCuratedArtworks = await Artworkuploads.find({
      medium: { $in: preferences },
    })
      .skip(skip)
      .limit(20)
      .sort({
        createdAt: -1,
      });

    if (!userCuratedArtworks) throw new ServerError("An error was encountered");

    return NextResponse.json(
      {
        message: "Successful",
        data: userCuratedArtworks,
      },
      { status: 200 }
    );
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);
    console.log(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
