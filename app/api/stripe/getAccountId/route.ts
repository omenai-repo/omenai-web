import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { stripe } from "@/lib/payments/stripe/stripe";
import { AccountGallery } from "@/models/auth/GallerySchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const account = await AccountGallery.findOne(
      { email },
      "connected_account_id gallery_verified"
    );

    return NextResponse.json({
      data: account,
    });
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}