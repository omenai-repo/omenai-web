import {
  ForbiddenError,
  NotFoundError,
  RateLimitExceededError,
  ServerError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendPasswordRecoveryMail } from "@shared/emails/models/recovery/sendPasswordRecoveryMail";
import { getIp } from "@shared/lib/auth/getIp";
import { limiter } from "@shared/lib/auth/limiter";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountIndividual } from "@shared/models/auth/IndividualSchema";
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

    const { recoveryEmail } = await request.json();

    const data = await AccountIndividual.findOne(
      { email: recoveryEmail },
      "email user_id name verified"
    ).exec();

    if (!data)
      throw new NotFoundError("Email is not associated to any account");

    const { email, user_id, name, verified } = data;

    if (!verified)
      throw new ForbiddenError("Please verify your account first.");

    const email_token = await generateDigit(7);

    const isVerificationTokenActive = await VerificationCodes.findOne({
      author: user_id,
    });

    if (isVerificationTokenActive)
      throw new ForbiddenError(
        "Token link active. Please visit link to continue"
      );

    const storeVerificationCode = await VerificationCodes.create({
      code: email_token,
      author: user_id,
    });

    if (!storeVerificationCode)
      throw new ServerError("A server error has occured, please try again");

    await sendPasswordRecoveryMail({
      name: name,
      email: email,
      token: email_token,
      route: "individual",
    });

    return NextResponse.json(
      { message: "Verification link sent" },
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
