"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ArtCollectionCard from "./ArtCollectionCard";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import useEmblaCarousel from "embla-carousel-react";

const collections = [
  { title: "Ankara", url: "ankara_art" },
  { title: "Ink", url: "ink_art" },
  { title: "Mixed media", url: "mixed-media_art" },
  { title: "Canvas", url: "canvas_art" },
  { title: "Acrylic", url: "acrylic_art" },
  { title: "Charcoal", url: "charcoal_art" },
  { title: "Fabric", url: "fabric_art" },
  { title: "Oil", url: "oil_art" },
  { title: "Photography", url: "photography_art" },
];
export default function Collections() {
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
    <div className="p-4">
      <div className="space-y-1 my-5">
        <h1 className="text-md font-normal">Art Collections</h1>
        <p className="text-sm text-[#858585] font-normal italic">
          Dive Into Diverse Art Collections, Thoughtfully Curated for Your
          Exploration
        </p>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {/* <div className="embla__slide">
          <DefaultHeroSlides />
        </div> */}
          {collections.map((collection, index) => {
            return (
              <div key={collection.title} className="mx-2">
                <ArtCollectionCard
                  title={collection.title}
                  url={collection.url}
                />
              </div>
            );
          })}
        </div>

        <div className="w-full flex gap-x-4 items-center my-3 mt-8">
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

        {/* <div className="flex relative gap-x-4 overflow-x-scroll w-full"></div> */}
      </div>
    </div>
  );
}
