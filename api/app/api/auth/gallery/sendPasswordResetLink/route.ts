import {
  ForbiddenError,
  NotFoundError,
  ServerError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendPasswordRecoveryMail } from "@shared/emails/models/recovery/sendPasswordRecoveryMail";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
import { VerificationCodes } from "@shared/models/auth/verification/codeTimeoutSchema";
import { generateDigit } from "@shared/utils/generateToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { recoveryEmail } = await request.json();

    const data = await AccountGallery.findOne(
      { email: recoveryEmail },
      "email gallery_id admin name verified"
    ).exec();

    if (!data)
      throw new NotFoundError("Email is not associated to any account");

    const { email, gallery_id, admin, name, verified } = data;

    if (!verified)
      throw new ForbiddenError("Please verifiy your account first.");

    const email_token = await generateDigit(7);

    const isVerificationTokenActive = await VerificationCodes.findOne({
      author: gallery_id,
    });

    if (isVerificationTokenActive)
      throw new ForbiddenError(
        "Token link already exists. Please visit link to continue"
      );

    const storeVerificationCode = await VerificationCodes.create({
      code: email_token,
      author: gallery_id,
    });

    if (!storeVerificationCode)
      throw new ServerError("A server error has occured, please try again");

    await sendPasswordRecoveryMail({
      name: admin,
      email: email,
      token: email_token,
      gallery_name: name,
      route: "gallery",
    });

    return NextResponse.json(
      { message: "Password reset link has been sent", id: gallery_id },
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
