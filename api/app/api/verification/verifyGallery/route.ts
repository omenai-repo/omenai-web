import { RateLimitExceededError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendVerifyGalleryMail } from "@shared/emails/models/verification/sendVerifyGalleryMail";
import { getIp } from "@shared/lib/auth/getIp";
import { requestGalleryVerif } from "@shared/lib/auth/limiter";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const ip = await getIp();

    const { success } = await requestGalleryVerif.limit(ip);

    if (!success)
      throw new RateLimitExceededError(
        "Too many requests attempted. Please try again after 24hrs"
      );

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
