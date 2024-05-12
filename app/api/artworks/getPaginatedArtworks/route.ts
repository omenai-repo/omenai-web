import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { buildMongoQuery } from "@/utils/buildMongoFilterQuery";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    let artworks;
    let total;

    const data = await request.json();

    const skip = (data.page - 1) * 10;

    // Apply filters if present
    if (Object.keys(data.filters).length === 0) {
      artworks = await Artworkuploads.find().skip(skip).limit(10);
      total = await Artworkuploads.countDocuments();
    } else {
      const builtFilters = buildMongoQuery(data.filters);

      artworks = await Artworkuploads.find(builtFilters).skip(skip).limit(10);
      total = await Artworkuploads.countDocuments(builtFilters);
    }

    if (!artworks) throw new ServerError("An error was encountered");

    return NextResponse.json(
      {
        message: "Artworks fetched successfully",
        data: artworks,
        page: data.page,
        pageCount: Math.ceil(total / 10),
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
