import { NotFoundError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { sendPriceEmail } from "@shared/emails/models/orders/requestPriceEmail";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountIndividual } from "@shared/models/auth/IndividualSchema";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { accountId } = await request.json();

    const user = await AccountIndividual.findOne(
      { user_id: accountId },
      "address"
    );

    if (!user) throw new NotFoundError("User account does not exist");

    return NextResponse.json(
      {
        message: "Successful",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
