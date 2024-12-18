import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { PurchaseTransactions } from "@shared/models/transactions/TransactionSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { gallery_id } = await request.json();

    const fetchTransactions = await PurchaseTransactions.find({
      trans_gallery_id: gallery_id,
      trans_type: "purchase_payout",
    });

    if (!fetchTransactions)
      throw new ServerError("An error was encountered. Please try again");

    return NextResponse.json(
      {
        message: "Transaction fetched",
        data: fetchTransactions,
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
