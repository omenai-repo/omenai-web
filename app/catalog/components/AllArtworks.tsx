"use client";
import ArtworkCard from "@/components/artworks/ArtworkCard";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchPaginatedArtworks } from "@/services/artworks/fetchPaginatedArtworks";
import { artworkActionStore } from "@/store/artworks/ArtworkActionStore";
import { artworkStore } from "@/store/artworks/ArtworkStore";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import { filterStore } from "@/store/artworks/FilterStore";
import Loader from "@/components/loader/Loader";

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
      <div className="h-[85vh] w-full grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 my-16">
      {artworks.length === 0 ? (
        <div className="w-full h-full grid place-items-center">
          <NotFoundData />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-x-1 space-y-4 items-end justify-around w-fit">
            {artworks.map((art: ArtworkResultTypes, index: number) => {
              return (
                <div key={index}>
                  <ArtworkCard
                    key={index}
                    image={art.url}
                    name={art.title}
                    artist={art.artist}
                    art_id={art.art_id}
                    pricing={art.pricing}
                    impressions={art.impressions as number}
                    likeIds={art.like_IDs as string[]}
                    sessionId={sessionId}
                    medium={art.medium}
                    rarity={art.rarity}
                  />
                </div>
              );
            })}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
}
