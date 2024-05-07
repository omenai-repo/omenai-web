"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import ArtworkCardTags from "@/components/artworks/ArtworkCardTags";
import LikeComponent from "@/components/likes/LikeComponent";
export default function TrendingArtworkCard({
  image,
  artist,
  name,
  impressions,
  medium,
  rarity,
  likeIds,
  sessionId,
  art_id,
}: {
  image: string;
  artist: string;
  name: string;
  impressions: number;
  medium: string;
  rarity: string;
  likeIds: string[];
  sessionId: string | undefined;
  art_id: string;
}) {
  const image_href = getImageFileView(image, 300);

  return (
    <div>
      <div className="flex flex-col w-auto h-full max-h-[500px] justify-end">
        <Link href={`/artwork/${name}`} className="relative">
          <img
            src={image_href}
            alt={name + " image"}
            className="w-auto max-w-[230px] max-h-[500px] h-fit aspect-auto object-top object-contain cursor-pointer"
          />
          <div className="absolute top-5 right-3 p-1 rounded-full bg-white border-dark/10 grid place-items-center">
            <LikeComponent
              impressions={impressions}
              likeIds={likeIds}
              sessionId={sessionId}
              art_id={art_id}
            />
          </div>
        </Link>

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
          </div>
          <span className="text-xs text-dark my-2">{impressions} like(s)</span>
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
