"use client";
/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "@/utils/priceFormatter";

import Link from "next/link";
import LikeComponent from "../likes/LikeComponent";

import { getImageFileView } from "@/lib/storage/getImageFileView";

export default function ArtworkCanvas({
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
  const image_href = getImageFileView(image, 500);
  return (
    <div className="my-2 w-fit p-0 max-h-full">
      <div className="flex flex-col w-full h-full justify-end">
        <div className="relative w-full">
          <Link href={`/artwork/${name}`} className="relative">
            <img
              src={image_href}
              alt={name + " image"}
              className="w-full h-full aspect-auto object-cover object-center cursor-pointer"
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

        <div className=" bg-transparent pr-3 py-1 w-full">
          <div className="flex flex-col my-2">
            <p className="font-semibold text-xs text-dark text-ellipsis overflow-hidden whitespace-nowrap">
              {name}
            </p>

            <div className="flex justify-between items-center">
              <p className="font-normal text-[#707070] italic text-xs text-ellipsis overflow-hidden whitespace-nowrap">
                {artist}
              </p>
              {/* <HiPencil /> */}
              {isDashboard && (
                <Link href={`/dashboard/gallery/artworks/edit?id=${name}`}>
                  <button
                    className={`disabled:cursor-not-allowed disabled:text-dark/20 text-xs font-medium underline cursor-pointer`}
                  >
                    Edit artwork
                  </button>
                </Link>
              )}
            </div>

            {pricing?.price && pricing.shouldShowPrice === "Yes" ? (
              !availability ? (
                <p className="font-bold text-xs text-dark">Sold</p>
              ) : (
                <p className="font-bold text-xs text-dark">
                  USD {formatPrice(pricing.usd_price)}
                </p>
              )
            ) : !availability ? (
              <p className="font-bold text-xs text-dark">Sold</p>
            ) : (
              <p className="font-bold text-xs">Price on request</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// components/ImageGallery.js
