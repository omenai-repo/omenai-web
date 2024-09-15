import { ServerError } from "@/custom/errors/dictionary/errorDictionary";
import { handleErrorEdgeCases } from "@/custom/errors/handler/errorHandler";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Artworkuploads } from "@/models/artworks/UploadArtworkSchema";
import { Subscriptions } from "@/models/subscriptions/SubscriptionSchema";
import { buildMongoQuery } from "@/utils/buildMongoFilterQuery";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const PAGE_SIZE = 30;
  const BASIC_LIMIT = 25;
  try {
    await connectMongoDB();
    const { page = 1, filters } = await request.json();
    const skip = (page - 1) * PAGE_SIZE;

    // Helper function to fetch gallery IDs based on subscription plan
    const getGalleryIdsByPlan = async (plan: string | string[]) => {
      const result = await Subscriptions.aggregate([
        {
          $match: {
            "plan_details.type": { $in: Array.isArray(plan) ? plan : [plan] },
            status: "active",
          },
        },
        {
          $group: {
            _id: null,
            galleryIds: { $addToSet: "$customer.gallery_id" },
          },
        },
      ]).exec();

      return result.length > 0 ? result[0].galleryIds : [];
    };

    // Fetch gallery IDs for basic and pro/premium plans
    const [basicGalleryIds, proPremiumGalleryIds] = await Promise.all([
      getGalleryIdsByPlan("Basic"),
      getGalleryIdsByPlan(["Pro", "Premium"]),
    ]);

    // Build filters for artworks
    const builtFilters = buildMongoQuery(filters);

    // Handle the case where builtFilters might be an empty object
    const filterCriteria =
      Object.keys(builtFilters).length > 0 ? builtFilters : {};

    // Fetch all filtered artworks, sorted by creation date
    const allArtworks = await Artworkuploads.find({
      ...filterCriteria,
      gallery_id: { $in: [...basicGalleryIds, ...proPremiumGalleryIds] },
      impressions: { $gt: 0 },
    })
      .sort({ impressions: -1 })
      .exec();

    // Fetch all artworks, no initial limit applied

    // Calculate how many basic artworks have already been returned in previous pages
    const basicArtworksAlreadyReturned = (page - 1) * PAGE_SIZE - skip;
    const remainingBasicLimit = Math.max(
      BASIC_LIMIT - basicArtworksAlreadyReturned,
      0
    );

    // Separate artworks into basic and pro/premium
    let selectedBasicArtworks = [];
    let selectedProPremiumArtworks = [];
    let skippedBasicArtworks = 0;

    for (let artwork of allArtworks) {
      if (basicGalleryIds.includes(artwork.gallery_id)) {
        if (skippedBasicArtworks < skip) {
          skippedBasicArtworks++;
          continue;
        }
        if (selectedBasicArtworks.length < remainingBasicLimit) {
          selectedBasicArtworks.push(artwork);
        }
      } else {
        if (skippedBasicArtworks + selectedProPremiumArtworks.length < skip) {
          skippedBasicArtworks++;
          continue;
        }
        selectedProPremiumArtworks.push(artwork);
      }

      // Stop if we have filled the page
      if (
        selectedBasicArtworks.length + selectedProPremiumArtworks.length >=
        PAGE_SIZE
      )
        break;
    }

    // Combine and slice the artworks for pagination
    const allTrendingPaginatedArtworks = [
      ...selectedBasicArtworks,
      ...selectedProPremiumArtworks,
    ].slice(0, PAGE_SIZE);

    const total = await Artworkuploads.countDocuments({
      ...builtFilters,
      gallery_id: { $in: [...basicGalleryIds, ...proPremiumGalleryIds] },
      impressions: { $gt: 0 },
    });

    return NextResponse.json(
      {
        message: "Successful",
        data: allTrendingPaginatedArtworks,
        page,
        pageCount: Math.ceil(total / 30),
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
// impressions: { $gt: 0 },
//       .sort({
//   impressions: -1,
// });
