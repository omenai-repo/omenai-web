"use client";
/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "@/utils/priceFormatter";

import Link from "next/link";
import LikeComponent from "../likes/LikeComponent";
import Image from "next/image";
import { blurHash } from "@/utils/blurhash";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import ArtworkCardTags from "./ArtworkCardTags";
export default function ArtworkCard({
  image,
  artist,
  name,
  pricing,
  impressions,
  likeIds,
  sessionId,
  art_id,
  isDashboard = false,
  availability,
}: {
  image: string;
  artist: string;
  name: string;
  impressions: number;
  likeIds: string[];
  sessionId: string | undefined;
  art_id: string;
  pricing?: {
    price: number;
    usd_price: number;
    shouldShowPrice: "Yes" | "No" | string;
  };
  isDashboard?: boolean;
  availability: boolean;
}) {
  const image_href = getImageFileView(image, 300);
  return (
    <div className="my-2 md:my-4 w-fit p-4 xxm:p-0">
      <div className="flex flex-col min-w-[200px] max-w-full justify-end">
        <div className="relative w-full">
          <Link href={`/artwork/${name}`} className="relative">
            <img
              src={image_href}
              alt={name + " image"}
              // height={400}
              // width={400}
              className="min-w-[200px] max-h-[400px] w-full h-auto object-top cursor-pointer"
            />
          </Link>
          {isDashboard ? null : (
            <div className="absolute bottom-3 right-3 p-1 rounded-full bg-white border-dark/10 grid place-items-center">
              <LikeComponent
                impressions={impressions}
                likeIds={likeIds}
                sessionId={sessionId}
                art_id={art_id}
              />
            </div>
          )}
        </div>

        <div className=" bg-[#FAFAFA] border border-[#E0E0E0] p-3 w-full">
          <div className="flex justify-between items-center my-2">
            <p className="font-normal text-[14px] text-dark ">
              {name.substring(0, 20)}
              {name.length > 20 && "..."}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-normal text-dark text-xs">
              {artist.substring(0, 20)}
              {artist.length > 20 && "..."}
            </p>

            {pricing?.price && pricing.shouldShowPrice === "Yes" ? (
              !availability ? (
                <p className="font-medium text-xs text-dark">Sold</p>
              ) : (
                <p className="font-normal text-xs text-dark">
                  {formatPrice(pricing.usd_price)}
                </p>
              )
            ) : !availability ? (
              <p className="font-medium text-xs text-dark">Sold</p>
            ) : (
              <p className="font-normal underline text-xs">On request</p>
            )}
          </div>
          {/* <hr className="border-dark/10 my-5" /> */}
          {/* <div className="flex flex-wrap gap-2 mb-2 items-center">
            <ArtworkCardTags tag={medium} />
            <ArtworkCardTags tag={rarity} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

// components/ImageGallery.js
