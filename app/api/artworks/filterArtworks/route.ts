import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { buildMongoQuery } from "@/utils/buildMongoFilterQuery";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data = await request.json();
    const builtFilters = buildMongoQuery(data);

    const results = await Artworkuploads.find(builtFilters);

    if (!results) throw new ServerError("Something went wrong");
    return NextResponse.json(
      { message: "Filter successful", data: results },
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
