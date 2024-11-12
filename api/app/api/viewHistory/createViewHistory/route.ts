import { handleErrorEdgeCases } from "@shared/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { RecentView } from "@shared/models/artworks/RecentlyViewed";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { artwork, user_id, art_id, artist, url } = await request.json();
    const checkIfViewed = await RecentView.findOne({
      art_id,
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
      url,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);
    console.log(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
