import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { encryptPayload } from "@/lib/encryption/encrypt_payload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const payload_data = {
      card_number: payload.card,
      cvv: payload.cvv,
      expiry_month: payload.month,
      expiry_year: payload.year,
      currency: "USD",
      amount: "50",
      email: "annieumana1@gmail.com",
      fullname: "Aniebiet Umana",
      tx_ref: payload.tx_ref,
      redirect_url: "https://example_company.com/success",
      authorization: {
        mode: payload.authorization.mode,
        pin: payload.authorization.pin,
      },
      meta: {
        type: "subscription",
      },
    };
    const encrypted_payload = encryptPayload(
      process.env.FLW_TEST_ENCRYPTION_KEY!,
      payload_data
    );

    const response = await fetch(
      "https://api.flutterwave.com/v3/charges?type=card",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLW_TEST_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ client: encrypted_payload }),
      }
    );

    const result = await response.json();

    return NextResponse.json({
      message: "Done",
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
