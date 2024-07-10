import {
  ConflictError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { sendPasswordConfirmationCodeMail } from "@/emails/models/gallery/sendPasswordChangeConfirmationCode";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { VerificationCodes } from "@/models/auth/verification/codeTimeoutSchema";
import { generateDigit } from "@/utils/generateToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id } = await request.json();

    const account = await AccountGallery.findOne({
      gallery_id,
    });
    if (!account) throw new ServerError("Something went wrong");
    const token = generateDigit(6);

    const check_code_existence = await VerificationCodes.findOne({
      author: account.gallery_id,
    });

    if (check_code_existence)
      throw new ConflictError("Token active, check your email or try later");

    const create_code = await VerificationCodes.create({
      code: token,
      author: account.gallery_id,
    });

    if (!create_code)
      throw new Error(
        "Something went wrong with this request, Please contact support."
      );

    await sendPasswordConfirmationCodeMail({
      username: account.admin,
      token: token,
      email: account.email,
      gallery_name: account.name,
    });

    return NextResponse.json(
      { message: "Confirmation code sent to email address" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}