"use client";

import { fetchPaginatedArtworks } from "@/services/artworks/fetchPaginatedArtworks";
import { artworkActionStore } from "@/store/artworks/ArtworkActionStore";
import { artworkStore } from "@/store/artworks/ArtworkStore";
import { filterStore } from "@/store/artworks/FilterStore";
import { toast } from "sonner";

export default function Pagination() {
  const { setArtworks, setIsLoading, pageCount, setPageCount } = artworkStore();

  const { updatePaginationCount, paginationCount } = artworkActionStore();

  const { filterOptions } = filterStore();

  async function handlePaginationArtworkFetch(type: "dec" | "inc") {
    setIsLoading(true);
    if (type === "dec") {
      const response = await fetchPaginatedArtworks(
        paginationCount - 1,
        filterOptions
      );
      if (response?.isOk) {
        setArtworks(response.data);
        updatePaginationCount(type);
        setPageCount(response.count);
      } else {
        toast.error(response?.message);
      }
    } else {
      const response = await fetchPaginatedArtworks(
        paginationCount + 1,
        filterOptions
      );
      if (response?.isOk) {
        setArtworks(response.data);
        updatePaginationCount(type);
        setPageCount(response.count);
      } else {
        toast.error(response?.message);
      }
    }
    setIsLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="w-full grid place-items-center mt-12">
      <p className="text-xs font-normal mb-4">
        Showing page {paginationCount} of {pageCount}
      </p>
      <div className="flex gap-x-8">
        <button
          disabled={paginationCount === 1}
          onClick={() => handlePaginationArtworkFetch("dec")}
          className="bg-dark text-xs rounded-sm text-white px-5 py-1.5 disabled:bg-dark/30 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          disabled={paginationCount === pageCount}
          onClick={() => handlePaginationArtworkFetch("inc")}
          className="bg-dark text-xs rounded-sm text-white px-5 py-1.5 disabled:bg-dark/30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
