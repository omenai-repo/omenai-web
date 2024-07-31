"use client";
import ArtworkCard from "@/components/artworks/ArtworkCard";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchPaginatedArtworks } from "@/services/artworks/fetchPaginatedArtworks";
import { artworkActionStore } from "@/store/artworks/ArtworkActionStore";
import { artworkStore } from "@/store/artworks/ArtworkStore";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { filterStore } from "@/store/artworks/FilterStore";
import Load from "@/components/loader/Load";

export default function AllArtworks({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const { paginationCount } = artworkActionStore();
  const { setArtworks, artworks, isLoading, setPageCount } = artworkStore();
  const { filterOptions } = filterStore();
  const { isLoading: loading } = useQuery({
    queryKey: ["get_paginated_artworks"],
    queryFn: async () => {
      const response = await fetchPaginatedArtworks(
        paginationCount,
        filterOptions
      );
      if (response?.isOk) {
        setArtworks(response.data);
        setPageCount(response.count);
      }
    },
  });

  if (loading || isLoading) {
    return (
      <div className="h-[75vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }

  return (
    <div className="p-2 my-4 w-full">
      {artworks.length === 0 ? (
        <div className="w-full h-full grid place-items-center">
          <NotFoundData />
        </div>
      ) : (
        <div className="w-full mb-12">
          <div className="grid xxm:grid-cols-2 md:grid-cols-3 2lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-7 justify-center md:space-y-4 space-x-2 items-end">
            {artworks.map((art: ArtworkResultTypes) => {
              return (
                <ArtworkCard
                  key={art.art_id}
                  image={art.url}
                  name={art.title}
                  artist={art.artist}
                  art_id={art.art_id}
                  pricing={art.pricing}
                  impressions={art.impressions as number}
                  likeIds={art.like_IDs as string[]}
                  sessionId={sessionId}
                  availability={art.availability}
                />
              );
            })}
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
}
