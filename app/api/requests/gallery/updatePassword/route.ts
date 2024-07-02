import bcrypt from "bcrypt";
import {
  ConflictError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { VerificationCodes } from "@/models/auth/verification/codeTimeoutSchema";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/hash/hashPassword";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { gallery_id, password, code } = await request.json();

    const account = await AccountGallery.findOne(
      {
        gallery_id,
      },
      "password"
    );

    if (!account) throw new ServerError("Something went wrong");

    const check_code_existence = await VerificationCodes.findOne({
      code,
    });

    if (!check_code_existence)
      throw new ConflictError("Code invalid, please try again");

    const isPasswordMatch = bcrypt.compareSync(password, account.password);

    if (isPasswordMatch)
      throw new ConflictError(
        "Your password cannot be identical to your previous password"
      );

    const hashedPassword = await hashPassword(password);

    const updatePassword = await AccountGallery.updateOne(
      { gallery_id },
      { $set: { password: hashedPassword } }
    );

    if (!updatePassword)
      throw new ServerError(
        "Something went wrong with this request, Please contact support."
      );

    const delete_code = await VerificationCodes.deleteOne({
      code,
    });

    if (!delete_code)
      throw new Error(
        "Something went wrong with this request, Please contact support."
      );

    return NextResponse.json(
      { message: "Password updated successfully" },
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
