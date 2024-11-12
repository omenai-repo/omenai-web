import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendGalleryRejectedMail } from "@shared/emails/models/gallery/sendGalleryRejectionMail";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { RejectedGallery } from "@shared/models/auth/RejectedGalleryScema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id, name, email } = await request.json();

    const add_to_rejected = await RejectedGallery.create({ name, email });

    if (!add_to_rejected) throw new ServerError("Something went wrong");

    const delete_gallery_info = await AccountGallery.deleteOne({ gallery_id });

    if (!delete_gallery_info) throw new ServerError("Something went wrong");

    // TODO: Send mail to gallery
    await sendGalleryRejectedMail({
      name,
      email,
    });

    return NextResponse.json(
      { message: "Gallery verification rejected" },
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
