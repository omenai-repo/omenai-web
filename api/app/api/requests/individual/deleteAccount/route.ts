import { ServerError } from "@shared/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { AccountIndividual } from "@shared/models/auth/IndividualSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const { id } = await request.json();

    const delete_account = await AccountIndividual.deleteOne({
      user_id: id,
    });
    if (!delete_account) throw new ServerError("Something went wrong");

    return NextResponse.json({ message: "Account deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
