import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { sendVerifyGalleryMail } from "@/emails/models/verification/sendVerifyGalleryMail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    await sendVerifyGalleryMail({ name, email: "moses@omenai.net" });

    return NextResponse.json(
      { message: "Gallery verification request sent" },
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
