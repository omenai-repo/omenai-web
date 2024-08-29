"use client";

import { fetchCuratedArtworks } from "@/services/artworks/fetchedCuratedArtworks";
import { categoriesFilterStore } from "@/store/categories/categoriesFilterStore";
import { categoriesStore } from "@/store/categories/categoriesStore";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function Pagination() {
  const session = useSession()
  const { setArtworks, setPaginationLoading, paginationLoading, paginationCount, setPaginationCount, pageCount } = categoriesStore();

  const { filterOptions } = categoriesFilterStore();

  async function handlePaginationArtworkFetch(type: "dec" | "inc") {
    setPaginationLoading(true);
    if (type === "dec") {
      const response = await fetchCuratedArtworks(
        session,
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
      const response = await fetchCuratedArtworks(
        session,
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
