import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { RecentView } from "@/models/artworks/RecentlyViewed";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { artwork, user_id, art_id, artist } = await request.json();
    const checkIfViewed = await RecentView.findOne({
      artwork,
      user: user_id,
    });

    if (checkIfViewed) {
      return NextResponse.json({ status: 200 });
    }
    await RecentView.create({
      artwork,
      user: user_id,
      art_id,
      artist,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
