import {
  ForbiddenError,
  NotFoundError,
  RateLimitExceededError,
  ServerError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendGalleryMail } from "@shared/emails/models/gallery/sendGalleryMail";
import { getIp } from "@shared/lib/auth/getIp";
import { limiter } from "@shared/lib/auth/limiter";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { VerificationCodes } from "@shared/models/auth/verification/codeTimeoutSchema";
import { generateDigit } from "@shared/utils/generateToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const ip = await getIp();

    const { success } = await limiter.limit(ip);
    if (!success)
      throw new RateLimitExceededError("Too many requests, try again later.");

    await connectMongoDB();

    const { author } = await request.json();

    const { admin, email, verified } = await AccountGallery.findOne(
      { gallery_id: author },
      "admin email verified"
    ).exec();

    if (!admin || !email)
      throw new NotFoundError("Unable to authenticate account");

    if (verified)
      throw new ForbiddenError(
        "This action is not permitted. Account already verified"
      );

    const email_token = generateDigit(7);

    const isVerificationTokenActive = await VerificationCodes.findOne({
      author,
    });

    if (isVerificationTokenActive)
      await VerificationCodes.deleteOne({
        author,
        code: isVerificationTokenActive.code,
      });

    const storeVerificationCode = await VerificationCodes.create({
      code: email_token,
      author,
    });

    if (!storeVerificationCode)
      throw new ServerError("A server error has occured, please try again");

    await sendGalleryMail({
      name: admin,
      email,
      token: email_token,
    });

    return NextResponse.json(
      {
        message: "Verification code resent",
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
