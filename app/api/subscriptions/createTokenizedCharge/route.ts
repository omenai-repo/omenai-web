import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { encryptPayload } from "@/lib/encryption/encrypt_payload";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    const payload = {
      currency: "USD",
      amount: data.amount,
      email: data.email,
      tx_ref: data.tx_ref,
      token: data.token,
      narration: `Payment for Omenai Inc. ${data.plan_interval} subscription`,
      meta: {
        gallery_id: data.gallery_id,
        type: "subscription",
        plan_id: data.plan_id,
        plan_interval: data.plan_interval,
      },
    };

    const encrypted_payload = encryptPayload(
      process.env.FLW_TEST_ENCRYPTION_KEY!,
      payload
    );

    const response = await fetch(
      "https://api.flutterwave.com/v3/tokenized-charges",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLW_TEST_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      }
    );

    const result = await response.json();

    return NextResponse.json({
      message: "Tokenized charge done",
      data: result,
    });
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    console.log(error);
    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
