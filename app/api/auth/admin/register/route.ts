import {
  ConflictError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { sendIndividualMail } from "@/emails/models/individuals/sendIndividualMail";
import { parseRegisterData } from "@/lib/auth/parseRegisterData";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountAdmin } from "@/models/auth/AccountAdmin";
import { VerificationCodes } from "@/models/auth/verification/codeTimeoutSchema";
import { generateDigit } from "@/utils/generateToken";
import { NextResponse, NextResponse as res } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data = await request.json();

    const isAccountRegistered = await AccountAdmin.findOne(
      { email: data.email },
      "email"
    ).exec();

    if (isAccountRegistered)
      throw new ConflictError("Account already exists, please login");

    const parsedData = await parseRegisterData(data);

    const email_token = generateDigit(7);

    const saveData = await AccountAdmin.create({
      ...parsedData,
    });

    const { admin_id } = saveData;

    if (!saveData)
      throw new ServerError("A server error has occured, please try again");

    const storeVerificationCode = await VerificationCodes.create({
      code: email_token,
      author: saveData.admin_id,
    });

    if (!storeVerificationCode)
      throw new ServerError("A server error has occured, please try again");

    await sendIndividualMail({
      name: saveData.name,
      email: saveData.email,
      token: email_token,
    });

    return res.json(
      {
        message: "Administrator successfully registered",
        data: admin_id,
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
