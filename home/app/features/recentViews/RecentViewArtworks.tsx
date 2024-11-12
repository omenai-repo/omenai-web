"use client";
import Load from "@shared/components/loader/Load";
import ArtworkCard from "../../../components/artworks/ArtworkCard";
import { fetchAllArtworks } from "@shared/services/artworks/fetchAllArtworks";
import { useQuery } from "@tanstack/react-query";
import NotFoundData from "@shared/components/notFound/NotFoundData";
import Link from "next/link";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import RecentViewedCard from "@shared/components/artworks/RecentViewedCard";

export default function RecentViewArtworks({
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
      {artworks?.length > 0 && (
        <div className="p-4 relative">
          <div className="space-y-1 my-5">
            <h1 className="text-sm md:text-md font-normal">Recently viewed</h1>
            <p className="text-base md:text-sm text-[#858585] font-light italic">
              Back for a Second Look: Your Recently Viewed Pieces
            </p>
          </div>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {artworks.map((artwork: any, index: number) => {
                return (
                  <RecentViewedCard
                    image={artwork.url}
                    key={artwork.art_id}
                    artist={artwork.artist}
                    name={artwork.artwork}
                    art_id={artwork.art_id}
                  />
                );
              })}
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