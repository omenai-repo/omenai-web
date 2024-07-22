import {
  ConflictError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { NextResponse } from "next/server";

function isValidArtworkPriceFilterData(
  data: unknown
): data is ArtworkPriceFilterData {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const { pricing } = data as Record<string, any>;

  return (
    typeof pricing === "object" &&
    pricing !== null &&
    typeof pricing.price === "number" &&
    typeof pricing.usd_price === "number" &&
    (pricing.shouldShowPrice === undefined ||
      typeof pricing.shouldShowPrice === "string")
  );
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data: {
      filter: ArtworkPriceFilterData;
      art_id: string;
    } = await request.json();

    if (!isValidArtworkPriceFilterData(data.filter))
      throw new ConflictError("Wrong input data sent");

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
