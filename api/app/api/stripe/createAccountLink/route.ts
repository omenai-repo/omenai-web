import { getApiUrl } from "@shared/config";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { stripe } from "@shared/lib/payments/stripe/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const url = getApiUrl();
    const { account } = await request.json();

    const accountLink = await stripe.accountLinks.create({
      account: account,
      refresh_url: `${url}/dashboard/gallery/payouts/refresh?id=${account}`,
      return_url: `${url}/dashboard/gallery/payouts`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      url: accountLink.url,
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
