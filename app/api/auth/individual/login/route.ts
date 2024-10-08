import {
  ConflictError,
  RateLimitExceededError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { getIp } from "@/lib/auth/getIp";
import { limiter } from "@/lib/auth/limiter";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { AccountIndividual } from "@/models/auth/IndividualSchema";
import bcrypt from "bcrypt";
import { NextResponse, NextResponse as res } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { email, password } = data;

    const ip = await getIp();

    const { success } = await limiter.limit(ip);

    if (!success)
      throw new RateLimitExceededError(
        "Too many login attempts, try again after 1 hour."
      );

    await connectMongoDB();

    const user = await AccountIndividual.findOne<IndividualSchemaTypes>({
      email,
    }).exec();

    if (!user) throw new ConflictError("Invalid credentials");

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) throw new ConflictError("Invalid credentials");

    const { user_id, verified, name, preferences, role } = user;

    return res.json(
      {
        message: "Login successfull",
        id: user_id,
        verified,
        email,
        name,
        preferences,
        role,
      },
      { status: 201 }
    );
  } catch (error: any) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
