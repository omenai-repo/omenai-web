import {
  BadRequestError,
  ForbiddenError,
  RateLimitExceededError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { getIp } from "@shared/lib/auth/getIp";
import { limiter } from "@shared/lib/auth/limiter";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { VerificationCodes } from "@shared/models/auth/verification/codeTimeoutSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const ip = await getIp();

    const { success } = await limiter.limit(ip);
    if (!success)
      throw new RateLimitExceededError("Too many requests, try again later.");
    await connectMongoDB();

    const { params, token } = await request.json();

    const user = await AccountGallery.findOne(
      { gallery_id: params },
      "verified"
    ).exec();

    if (user.verified)
      throw new ForbiddenError(
        "This action is not permitted, account already verified"
      );

    const isTokenActive = await VerificationCodes.findOne({
      author: params,
      code: token,
    }).exec();

    if (!isTokenActive) throw new BadRequestError("Invalid token data");

    await AccountGallery.updateOne({ gallery_id: params }, { verified: true });

    await VerificationCodes.deleteOne({ code: token, author: params });

    return NextResponse.json(
      { message: "Verification was successful. Please login" },
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
