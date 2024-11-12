import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendGalleryAcceptedMail } from "@shared/emails/models/gallery/sendGalleryAcceptedMail";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id, name, email } = await request.json();

    const verify_gallery = await AccountGallery.updateOne(
      { gallery_id },
      { $set: { gallery_verified: true } }
    );

    if (!verify_gallery) throw new ServerError("Something went wrong");

    // TODO: Send mail to gallery
    sendGalleryAcceptedMail({
      name,
      email,
    });

    return NextResponse.json(
      { message: "Gallery verification accepted" },
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
