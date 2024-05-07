import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.flutterwave.com/v3/bulk-tokenized-charges/1571/transactions",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FLW_TEST_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  return NextResponse.json({ message: "successful", data: result });
}
