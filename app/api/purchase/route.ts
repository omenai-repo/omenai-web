import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { purchase_artwork } from "@/services/purchase_artwork/purchase_artwork";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await purchase_artwork(
      data.email,
      data.name,
      data.artwork,
      data.amount
    );
    const res = await response.json();
    console.log(res);

    if (!response.ok) throw new ServerError("Something went wrong");

    return NextResponse.json(
      { message: res.message, data: res.data },
      { status: 200 }
    );
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);
    console.log(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
