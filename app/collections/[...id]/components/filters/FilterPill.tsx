"use client";

import { fetchTrendingArtworks } from "@/services/artworks/fetchTrendingArtworks";
import { collectionsFilterStore } from "@/store/collections/collectionsFilterStore";
import { collectionsStore } from "@/store/collections/collectionsStore";
import { MdClear } from "react-icons/md";

export default function FilterPill({ filter }: { filter: string }) {
  const { removeSingleFilterSelection, selectedFilters } = collectionsFilterStore();
  // const { paginationCount, updatePaginationCount } = artworkActionStore();
  const { setArtworks, setIsLoading, setPageCount, paginationCount } = collectionsStore();

  async function handleRemoveSingleFilter() {
    if (selectedFilters.length === 1) {
      removeSingleFilterSelection(filter);
      const response = await fetchTrendingArtworks(paginationCount, {
        price: [],
        year: [],
        medium: [],
        rarity: [],
      });
      if (response?.isOk) {
        setArtworks(response.data);
        setPageCount(response.count);
      }
    } else {
      removeSingleFilterSelection(filter);
    }
  }

  return (
    <div
      onClick={handleRemoveSingleFilter}
      className="px-3 py-1.5 bg-[#f7f7f7] text-[13px] font-normal text-dark flex items-center gap-x-2 rounded-full"
    >
      <span className="text-xs">{filter}</span>
      <MdClear className="cursor-pointer" />
    </div>
  );
}