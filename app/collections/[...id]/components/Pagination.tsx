"use client";

import { fetchArtworksByCriteria } from "@/services/artworks/fetchArtworksByCriteria";
import { collectionsFilterStore } from "@/store/collections/collectionsFilterStore";
import { collectionsStore } from "@/store/collections/collectionsStore";
import { toast } from "sonner";

export default function Pagination({medium}: {medium: string}) {
  const { setArtworks, setPaginationLoading, paginationLoading, paginationCount, setPaginationCount, pageCount } = collectionsStore();

  const { filterOptions } = collectionsFilterStore();

  async function handlePaginationArtworkFetch(type: "dec" | "inc") {
    setPaginationLoading(true);
    if (type === "dec") {
      const response = await fetchArtworksByCriteria(
        medium,
        paginationCount - 1,
        filterOptions
      );
      if (response?.isOk) {
        setArtworks(response.data);
        // updatePaginationCount(type);
        setPaginationCount(paginationCount - 1);
      } else {
        toast.error(response?.message);
      }
    } else {
      const response = await fetchArtworksByCriteria(
        medium,
        paginationCount + 1,
        filterOptions
      );
      if (response?.isOk) {
        setArtworks(response.data);
        // updatePaginationCount(type);
        setPaginationCount(paginationCount + 1);
      } else {
        toast.error(response?.message);
      }
    }
    setPaginationLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="w-full grid place-items-center mt-12">
      <p className="text-[14px] font-normal my-5">
        Showing page {paginationCount} of {pageCount}
      </p>
      <div className="flex gap-x-4 w-full">
        <button
          disabled={(paginationCount === 1) || paginationLoading}
          onClick={() => handlePaginationArtworkFetch("dec")}
          className="bg-dark text-xs rounded-sm w-full text-white h-[50px] px-4 disabled:bg-dark/30 disabled:cursor-not-allowed"
        >
          Previous page
        </button>
        <button
          disabled={(paginationCount === pageCount) || paginationLoading}
          onClick={() => handlePaginationArtworkFetch("inc")}
          className="bg-dark text-xs rounded-sm w-full text-white h-[50px] px-4 disabled:bg-dark/30 disabled:cursor-not-allowed"
        >
          Next page
        </button>
      </div>
    </div>
  );
}