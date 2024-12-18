import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id, status } = await request.json();

    const block_gallery = await AccountGallery.updateOne(
      { gallery_id },
      { $set: { status } }
    );

    if (!block_gallery) throw new ServerError("Something went wrong");

    // TODO: Send mail to gallery

    return NextResponse.json(
      { message: "Gallery status updated" },
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
