import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Wallet } from "@shared/models/wallet/WalletSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const data = await request.json();

    const createWallet = await Wallet.create({ owner_id: data.gallery_id });

    if (!createWallet)
      throw new ServerError("An error was encountered. Please try again");

    return NextResponse.json(
      {
        message: "Wallet created",
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
