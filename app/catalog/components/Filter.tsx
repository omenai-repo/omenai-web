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
import { toast } from "sonner";
import FilterPill from "./FilterPill";
import { ImBin2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { MdClear } from "react-icons/md";

export default function Filter() {
  const [showFilterBlock, setShowFilterBlock] = useState(false);
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
    const response = await fetchPaginatedArtworks(paginationCount, {
      price: [],
      year: [],
      medium: [],
      rarity: [],
    });
    if (response?.isOk) {
      setArtworks(response.data);
      setPageCount(response.count);
    }
  };

  return (
    <div className="sticky top-[63px] px-0 lg:px-4 z-20 bg-white border-b border-b-dark/10">
      <div className="w-full flex justify-between items-center py-4 px-4">
        <button
          className={`${
            showFilterBlock
              ? "bg-dark text-white rounded-sm"
              : "border-dark/10 border rounded-sm bg-white text-dark"
          } duration-200 h-[40px] px-4  flex space-x-2 items-center w-fit cursor-pointer`}
          onClick={() => setShowFilterBlock(!showFilterBlock)}
        >
          <span className="text-xs font-normal">Filters</span>
          {showFilterBlock ? (
            <MdClear />
          ) : (
            <GiSettingsKnobs className="rotate-90" />
          )}
        </button>
        <div />
        <button
          disabled={isEmptyFilter(filterOptions)}
          className=" disabled:bg-dark/30 disabled:cursor-not-allowed rounded-sm h-[40px] px-4 bg-dark flex space-x-2 items-center w-fit cursor-pointer"
          onClick={handleSubmitFilter}
        >
          <span className="text-xs font-normal text-white">Apply filters</span>
        </button>
      </div>
      {selectedFilters.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 items-center p-4 cursor-pointer">
            {selectedFilters.map((filter) => {
              return <FilterPill key={filter.name} filter={filter.name} />;
            })}
            <div
              onClick={handleClearAll}
              className="px-3 py-1 border border-dark/10 rounded-full flex gap-x-2 items-center text-xs font-normal"
            >
              <span>Clear all </span>
              <ImBin2 />
            </div>
          </div>
        </>
      )}

      <div
        className={`${
          showFilterBlock ? "grid" : "hidden"
        } duration-200 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 items-center px-2`}
      >
        <PriceFilter />
        <YearFilter />
        <MediumFilter />
        <RarityFilter />
      </div>
    </div>
  );
}
