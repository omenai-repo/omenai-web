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
  medium,
  rarity,
}: {
  image: string;
  artist: string;
  name: string;
  impressions: number;
  likeIds: string[];
  sessionId: string | undefined;
  art_id: string;
  medium: string;
  rarity: string;
  pricing?: {
    price: string;
    shouldShowPrice: "Yes" | "No" | string;
  };
}) {
  const image_href = getImageFileView(image, 300);
  return (
    <div>
      <div className="flex flex-col w-auto h-full max-h-[500px] justify-end">
        <div className="relative">
          <Link href={`/artwork/${name}`}>
            <Image
              src={image_href}
              alt={name + " image"}
              height={500}
              width={220}
              className="min-w-[220px] aspect-auto object-top object-cover cursor-pointer"
            />
          </Link>
          <div className="absolute top-3 right-3 p-1 rounded-full bg-white border-dark/10 grid place-items-center">
            <LikeComponent
              impressions={impressions}
              likeIds={likeIds}
              sessionId={sessionId}
              art_id={art_id}
            />
          </div>
        </div>

        <div className="mb-[3rem] bg-[#FAFAFA] py-2 px-3">
          <div className="flex justify-between items-center my-2">
            <p className="font-medium text-[14px] text-dark ">
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
              <p className="font-semibold text-xs text-dark">
                {formatPrice(pricing.price)}
              </p>
            ) : (
              <p className="font-normal underline text-xs">Request</p>
            )}
          </div>
          <hr className="border-dark/10 my-5" />
          <div className="flex gap-x-2 mb-2 items-center">
            <ArtworkCardTags tag={medium} />
            <ArtworkCardTags tag={rarity} />
          </div>
        </div>
      </div>
    </div>
  );
}

// components/ImageGallery.js
