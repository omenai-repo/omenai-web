"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { getImageFileView } from "@/lib/storage/getImageFileView";

export default function RecentViewedCard({
  image,
  artist,
  name,

  art_id,
}: {
  image: string;
  artist: string;
  name: string;
  art_id: string;
}) {
  const image_href = getImageFileView(image, 200);
  return (
    <div className="m-2 w-fit p-4 xxm:p-0 max-h-[500px]">
      <div className="flex flex-col min-w-[180px] w-[180px] xxl:w-[200px] md:min-w-[250px] h-full md:w-[250px] justify-end">
        <div className="relative w-full">
          <Link href={`/artwork/${name}`} className="relative">
            <img
              src={image_href}
              alt={name + " image"}
              // height={400}
              // width={400}
              className="min-w-[180px] w-[180px] xxl:w-[200px] md:min-w-[250px] max-h-[400px] md:w-[250px] h-auto aspect-auto object-contain object-center cursor-pointer"
            />
          </Link>
        </div>

        <div className=" bg-[#FAFAFA] border border-[#E0E0E0] px-3 y-2 w-full">
          <div className="flex flex-col space-y-1 my-2">
            <p className="font-normal text-xs text-dark ">
              {name}
              {/* {name.length > 20 && "..."} */}
            </p>

            <div className="flex justify-between items-center">
              <p className="font-normal text-[#858585] italic text-xs">
                {artist.substring(0, 20)}
                {artist.length > 20 && "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// components/ImageGallery.js