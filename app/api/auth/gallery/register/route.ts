import {
  ConflictError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { sendGalleryMail } from "@/emails/models/gallery/sendGalleryMail";
import { parseRegisterData } from "@/lib/auth/parseRegisterData";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { RejectedGallery } from "@/models/auth/RejectedGalleryScema";
import { VerificationCodes } from "@/models/auth/verification/codeTimeoutSchema";
import { generateDigit } from "@/utils/generateToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data = await request.json();

    const isAccountRegistered = await AccountGallery.findOne({
      email: data.email,
    }).exec();

    if (isAccountRegistered)
      throw new ConflictError("Account already exists, please login");

    const isAccountRejected = await RejectedGallery.findOne({
      email: data.email,
    }).exec();

    if (isAccountRejected)
      throw new ConflictError(
        "Unfortunately, you cannot create an account with us at this time. Please contact support."
      );

    const parsedData = await parseRegisterData(data);

    const email_token = generateDigit(7);

    const saveData = await AccountGallery.create({
      ...parsedData,
    });

    const { gallery_id, email, name } = saveData;

    if (!saveData)
      throw new ServerError("A server error has occured, please try again");

    const storeVerificationCode = await VerificationCodes.create({
      code: email_token,
      author: saveData.gallery_id,
    });

    if (!storeVerificationCode)
      throw new ServerError("A server error has occured, please try again");

    await sendGalleryMail({
      name: name,
      email: email,
      token: email_token,
    });

    return NextResponse.json(
      {
        message: "Account successfully registered",
        data: gallery_id,
      },
      { status: 201 }
    );
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
