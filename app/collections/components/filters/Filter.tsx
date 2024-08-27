"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import { useEffect, useState } from "react";
import { isEmptyFilter } from "@/utils/isFilterEmpty";
import toast from "react-hot-toast";
import FilterPill from "./FilterPill";
import { ImBin2 } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { useWindowSize } from "usehooks-ts";
import { MdClear } from "react-icons/md";
import { fetchTrendingArtworks } from "@/services/artworks/fetchTrendingArtworks";
import PriceFilter from "./PriceFilter";
import YearFilter from "./YearFilter";
import MediumFilter from "./MediumFilter";
import RarityFilter from "./RarityFilter";
import { collectionsFilterStore } from "@/store/collections/collectionsFilterStore";
import { collectionsStore } from "@/store/collections/collectionsStore";
import { fetchCuratedArtworks } from "@/services/artworks/fetchedCuratedArtworks";
import { useSession } from "next-auth/react";
import { fetchPaginatedArtworks } from "@/services/artworks/fetchPaginatedArtworks";

export default function Filter({page_type}: {page_type: artworkCollectionTypes}) {
  const session = useSession();
  const [showFilterBlock, setShowFilterBlock] = useState(true);
  const { width } = useWindowSize();

  const { filterOptions, selectedFilters, clearAllFilters } = collectionsFilterStore();
  const { setArtworks, setIsLoading, paginationCount, setPaginationCount, pageCount, setPageCount } = collectionsStore();

  async function handleSubmitFilter() {
    setPaginationCount(1);
    setIsLoading(true);
    let response;

    if(page_type === "trending"){
      response = await fetchTrendingArtworks(
        paginationCount,
        filterOptions
      );
    }else if(page_type === "curated"){
      //update to curated
      response = await fetchCuratedArtworks(
        session,
        paginationCount,
        filterOptions
      );
    }else if(page_type === "recent"){
      //update to recent
      response = await fetchPaginatedArtworks(
        paginationCount,
        filterOptions
      );
    }
    
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
    //visis the clear section
    const response = await fetchTrendingArtworks(paginationCount, {
      price: [],
      year: [],
      medium: [],
      rarity: [],
    });
    if (response?.isOk) {
      setArtworks(response.data);
      setPaginationCount(1);
    }
  };

  return (
    <div className="sticky top-[38px] sm:top-[50px] lg:top-[73px] px-0 lg:px-4 z-20 py-3 bg-white">
      <div
        className={`w-full ${
          width > 960 ? "hidden" : "flex"
        } justify-between items-center py-4 px-4`}
      >
        <button
          className={`${
            showFilterBlock
              ? "bg-dark text-white"
              : "border-dark/10 border bg-white text-dark"
          } duration-200 border px-3 py-1 border-dark/10 rounded-full  flex gap-x-2 items-center text-[13px] font-normal w-fit cursor-pointer`}
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
          <div className="flex flex-wrap gap-2 items-center py-4 px-2 cursor-pointer">
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
        } flex flex-wrap gap-x-2`}
      >
        <PriceFilter filterOptions={filterOptions} />
        <YearFilter filterOptions={filterOptions} />
        <MediumFilter filterOptions={filterOptions} />
        <RarityFilter filterOptions={filterOptions} />
      </div>
    </div>
  );
}
