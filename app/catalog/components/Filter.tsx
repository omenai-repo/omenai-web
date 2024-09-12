"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import PriceFilter from "./PriceFilter";
import YearFilter from "./YearFilter";
import MediumFilter from "./MediumFilter";
import RarityFilter from "./RarityFilter";
import { useState } from "react";
import { filterStore } from "@/store/artworks/FilterStore";
import { isEmptyFilter } from "@/utils/isFilterEmpty";
import { fetchPaginatedArtworks } from "@/services/artworks/fetchPaginatedArtworks";
import { artworkActionStore } from "@/store/artworks/ArtworkActionStore";
import { artworkStore } from "@/store/artworks/ArtworkStore";
import toast from "react-hot-toast";
import FilterPill from "./FilterPill";
import { ImBin2 } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { useWindowSize } from "usehooks-ts";
import { MdClear } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Filter() {
  const [showFilterBlock, setShowFilterBlock] = useState(false);
  const { width } = useWindowSize();

  const { filterOptions, selectedFilters, clearAllFilters } = filterStore();
  const { paginationCount, updatePaginationCount } = artworkActionStore();
  const { setArtworks, setIsLoading, setPageCount } = artworkStore();
  const router = useRouter();
  async function handleSubmitFilter() {
    updatePaginationCount("reset");
    setIsLoading(true);
    const response = await fetchPaginatedArtworks(
      paginationCount,
      filterOptions
    );
    if (response?.isOk) {
      setPageCount(response.count);
      setArtworks(response.data);
    } else {
      toast.error(response?.message);
    }
    setIsLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleClearAll = async () => {
    clearAllFilters();
    setIsLoading(true);
    const response = await fetchPaginatedArtworks(paginationCount, {
      price: [],
      year: [],
      medium: [],
      rarity: [],
    });
    if (response?.isOk) {
      setPageCount(response.count);
      setArtworks(response.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="sticky top-[38px] sm:top-[50px] lg:top-[73px] z-20 py-3 bg-white">
      <div
        className={`w-full ${
          width > 960 ? "hidden" : "flex"
        } justify-between items-center my-5`}
      >
        <button
          className={`${
            showFilterBlock
              ? "bg-dark text-white"
              : "border-dark/10 border bg-white text-dark"
          } duration-200 border px-3 py-1 border-dark/10 rounded-full h-[35px] flex gap-x-2 items-center text-[13px] font-normal w-fit cursor-pointer`}
          onClick={() => setShowFilterBlock(!showFilterBlock)}
        >
          <span className="text-[13px] font-normal">Filters</span>
          {showFilterBlock ? (
            <MdClear />
          ) : (
            <GiSettingsKnobs className="rotate-90" />
          )}
        </button>
        <div />
      </div>
      {selectedFilters.length > 0 && (
        <>
          <div className="flex flex-wrap gap-4 items-center py-4 px-2 cursor-pointer">
            {selectedFilters.map((filter) => {
              return <FilterPill key={filter.name} filter={filter.name} />;
            })}
            <div
              onClick={handleClearAll}
              className="px-3 py-1 border border-dark/10 rounded-full hover:bg-dark duration-200 hover:text-white flex gap-x-2 items-center text-[13px] font-normal"
            >
              <span>Clear all selections</span>
              <ImBin2 />
            </div>
            <button
              onClick={handleSubmitFilter}
              disabled={isEmptyFilter(filterOptions)}
              className="px-3 py-1 bg-dark hover:bg-dark duration-200 text-white rounded-full flex gap-x-2 items-center text-[13px] font-normal"
            >
              <span>Apply filters </span>
              <FaCheckCircle />
            </button>
          </div>
        </>
      )}

      <div
        className={`${
          width >= 960 || showFilterBlock ? "flex" : "hidden"
        } grid grid-cols-2 md:flex md:flex-wrap relative`}
      >
        <PriceFilter />
        <YearFilter />
        <MediumFilter />
        <RarityFilter />
      </div>
    </div>
  );
}
