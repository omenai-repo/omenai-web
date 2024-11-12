import {
  ConflictError,
  RateLimitExceededError,
} from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { getIp } from "@shared/lib/auth/getIp";
import { limiter } from "@shared/lib/auth/limiter";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountGallery } from "@shared/models/auth/GallerySchema";
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

    const user = await AccountGallery.findOne<GallerySchemaTypes>({
      email,
    }).exec();

    if (!user) throw new ConflictError("Invalid credentials");

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) throw new ConflictError("Invalid credentials");

    const {
      gallery_id,
      verified,
      admin,
      description,
      location,
      gallery_verified,
      name,
      role,
      logo,
      subscription_active,
      connected_account_id,
    } = user;

    return res.json(
      {
        message: "Login successfu",
        gallery_id,
        verified,
        admin,
        description,
        location,
        gallery_verified,
        name,
        email,
        role,
        logo,
        subscription_active,
        connected_account_id,
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
