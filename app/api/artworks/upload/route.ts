import { plan_details } from "./../../../dashboard/gallery/billing/plans/plan_details";
import {
  ForbiddenError,
  ServerError,
} from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const data = await request.json();

    const doc_count = await Artworkuploads.countDocuments({
      gallery_id: data.gallery_id,
    });

    const active_subscription = await Subscriptions.findOne(
      { "customer.gallery_id": data.gallery_id },
      "plan_details status"
    );

    if (!active_subscription || active_subscription.status !== "active")
      throw new ForbiddenError("No active subscription for this user");

    if (active_subscription.plan_details.type === "basic" && doc_count >= 25)
      throw new ForbiddenError(
        "Plan usage limit exceeded, please upgrade plan"
      );
    else {
      const uploadArt = await Artworkuploads.create({ ...data });

      if (!uploadArt)
        throw new ServerError("A server error has occured, please try again");

      return NextResponse.json(
        {
          message: "Artwork uploaded",
          data: doc_count,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    const error_response = handleErrorEdgeCases(error);

    return NextResponse.json(
      { message: error_response?.message },
      { status: error_response?.status }
    );
  }
}
