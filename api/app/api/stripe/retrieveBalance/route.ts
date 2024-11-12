import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { stripe } from "@shared/lib/payments/stripe/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { account } = await request.json();

    const balance = await stripe.balance.retrieve({
      stripeAccount: account,
    });

    return NextResponse.json({
      data: balance,
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
