import {
  ConflictError,
  RateLimitExceededError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { getIp } from "@shared/lib/auth/getIp";
import { limiter } from "@shared/lib/auth/limiter";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountAdmin } from "@shared/models/auth/AccountAdmin";
import bcrypt from "bcrypt";

import { NextResponse, NextResponse as res } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { email, password } = data;

    const ip = await getIp();

    const { success } = await limiter.limit(ip);

    if (!success)
      throw new RateLimitExceededError("Too many requests, try again later.");

    await connectMongoDB();

    const user = await AccountAdmin.findOne<AccountAdminSchemaTypes>({
      email,
    }).exec();

    if (!user) throw new ConflictError("Invalid credentials");

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) throw new ConflictError("Invalid credentials");

    const { admin_id, name, role } = user;

    return res.json(
      {
        message: "Login successfull",
        id: admin_id,
        email,
        name,
        role,
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
