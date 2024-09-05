"use client";
import ArtworkCard from "../../../components/artworks/ArtworkCard";

import Link from "next/link";

import {
  MdArrowRightAlt,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";

export default function LatestArtworks({
  artworks,
  sessionId,
}: {
  artworks: any;
  sessionId: string | undefined;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: true,
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const handleScroll = () => {
      requestAnimationFrame(updateScrollProgress);
    };

    emblaApi.on("scroll", handleScroll);
    emblaApi.on("resize", updateScrollProgress);
    updateScrollProgress(); // Initial progress update

    return () => {
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("resize", updateScrollProgress);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <>
      {artworks.length > 0 && (
        <div className="p-4 relative">
          <div className="flex gap-4 my-5">
            <div className="space-y-1 flex-1">
              <h1 className="text-md font-normal">Latest artworks</h1>
              <p className="text-sm text-[#858585] font-normal italic">
                Fresh Off the Easel: Explore the Newest Masterpieces, Just for You
              </p>
            </div>
            <Link
              href={"/categories/recent-artworks"}
              className="text-dark flex items-center gap-x-2 font-normal text-[14px] break-words"
            >
              View all
              <MdArrowRightAlt />
            </Link>
          </div>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {artworks.map((artwork: any, index: number) => {
                return (
                  <ArtworkCard
                    image={artwork.url}
                    key={artwork.art_id}
                    artist={artwork.artist}
                    name={artwork.title}
                    pricing={artwork.pricing}
                    impressions={artwork.impressions}
                    likeIds={artwork.like_IDs}
                    sessionId={sessionId}
                    art_id={artwork.art_id}
                    availability={artwork.availability}
                  />
                );
              })}
              {artworks.length >= 25 && (
                <div className="h-[400px] w-[250px] grid place-items-center mx-10">
                  <Link href={""}>
                    <button className="whitespace-nowrap border border-dark rounded-full bg-transparent text-xs disabled:bg-[#E0E0E0] disabled:text-[#858585]  w-full text-dark disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark hover:text-white duration-300">
                      View all recent artworks
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex gap-x-4 items-center my-3 mt-8 px-6">
        <div className=" w-full h-[1px] bg-[#fafafa]">
          <div
            className="h-full bg-dark "
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-center w-fit space-x-2">
          <button
            onClick={scrollPrev}
            className="h-[40px] w-[40px] rounded-full border border-[#e0e0e0] bg-transparent hover:border-dark duration-300 grid place-items-center"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button
            onClick={scrollNext}
            className="h-[40px] w-[40px] rounded-full border border-[#e0e0e0] bg-transparent hover:border-dark duration-300 grid place-items-center"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
