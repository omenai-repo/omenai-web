import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const unverified_galleries = await AccountGallery.find(
      { gallery_verified: false },
      "name location admin logo description email"
    );

    if (!unverified_galleries)
      throw new ServerError("Something went wrong, contact tech team");

    return NextResponse.json(
      { message: "Data retrieved", data: unverified_galleries },
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
