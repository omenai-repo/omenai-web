"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import ArtworkCardTags from "@/components/artworks/ArtworkCardTags";
import LikeComponent from "@/components/likes/LikeComponent";
import Image from "next/image";
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
  availability,
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
  availability: boolean;
}) {
  const image_href = getImageFileView(image, 300);

  return (
    <div>
      <div className="flex flex-col w-auto h-full max-h-[500px] justify-end">
        <div className="relative">
          <Link href={`/artwork/${name}`} className="relative">
            <Image
              src={image_href}
              alt={name + " image"}
              height={500}
              width={220}
              className="min-w-[220px] aspect-auto object-top object-cover cursor-pointer"
            />
          </Link>
          <div className="absolute bottom-3 right-3 p-1 rounded-full bg-white border-dark/10 grid place-items-center">
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
            <span className="text-xs text-dark my-2">
              {impressions} like(s)
            </span>
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
