"use client";
/* eslint-disable @next/next/no-img-element */
import { formatPrice } from "@/utils/priceFormatter";

import Link from "next/link";
import LikeComponent from "../likes/LikeComponent";

import { getImageFileView } from "@/lib/storage/getImageFileView";

import { HiPencil } from "react-icons/hi";

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
  const image_href = getImageFileView(image, 200);
  return (
    <div className="my-2 md:my-4 w-fit p-4 xxm:p-0">
      <div className="flex flex-col w-[250px] xxm:w-fit xxm:min-w-[200px] md:min-w-[250px] max-w-[220px] md:max-w-full justify-end">
        <div className="relative w-full">
          <Link href={`/artwork/${name}`} className="relative">
            <img
              src={image_href}
              alt={name + " image"}
              // height={400}
              // width={400}
              className="min-w-[200px] w-[250px] md:min-w-[250px] max-h-[400px] xxm:w-fit h-auto object-top cursor-pointer"
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
          <div className="flex flex-col space--y-1 my-2">
            <p className="font-semibold text-[14px] text-dark ">
              {name}
              {/* {name.length > 20 && "..."} */}
            </p>

            <div className="flex justify-between items-center">
              <p className="font-normal text-dark text-xs">
                {artist.substring(0, 20)}
                {artist.length > 20 && "..."}
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
                <p className="font-semibold text-xs text-dark">Sold</p>
              ) : (
                <p className="font-semibold text-xs text-dark">
                  {formatPrice(pricing.usd_price)}
                </p>
              )
            ) : !availability ? (
              <p className="font-semibold text-xs text-dark">Sold</p>
            ) : (
              <p className="font-semibold text-xs">Price on request</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// components/ImageGallery.js
