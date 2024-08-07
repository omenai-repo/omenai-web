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
import { useWindowSize } from "usehooks-ts";
import { catalogChunk } from "@/utils/createCatalogChunks";
import ArtworkCanvas from "@/components/artworks/ArtworkCanvas";

export default function AllArtworks({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const { paginationCount } = artworkActionStore();
  const { isLoading, setPageCount, setArtworks, artworks } = artworkStore();
  const { filterOptions } = filterStore();
  const { width } = useWindowSize();

  const { data: artworksArray, isLoading: loading } = useQuery({
    queryKey: ["get_paginated_artworks"],
    queryFn: async () => {
      const response = await fetchPaginatedArtworks(
        paginationCount,
        filterOptions
      );
      if (response?.isOk) {
        setPageCount(response.count);
        setArtworks(response.data);
        return response.data;
      } else throw new Error("Failed to fetch artworks");
    },
    refetchOnWindowFocus: false,
  });

  if (loading || isLoading) {
    return (
      <div className="h-[75vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }

  if (!artworksArray || artworksArray.length === 0) {
    return (
      <div className="w-full h-full grid place-items-center">
        <NotFoundData />
      </div>
    );
  }

  const arts = catalogChunk(
    artworks,
    width < 400 ? 1 : width < 768 ? 2 : width < 1280 ? 3 : 4
  );

  return (
    <div className="w-full mb-5 px-5 mt-3">
      <div className="flex flex-wrap gap-x-4 justify-center">
        {arts.map((artworks: any[], index) => {
          return (
            <div className="flex-1 gap-4 space-y-12" key={index}>
              {artworks.map((art: any) => {
                return (
                  <ArtworkCanvas
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
          );
        })}
        {/* first */}
      </div>

      <Pagination />
    </div>
  );
}
// grid xxm:grid-cols-2 md:grid-cols-3 2lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-7 justify-center md:space-y-4 space-x-2 items-end
