"use client";

import ArtworkCanvas from "@shared/components/artworks/ArtworkCanvas";
import { ArtworksListingSkeletonLoader } from "@shared/components/loader/ArtworksListingSkeletonLoader";
import NotFoundData from "@shared/components/notFound/NotFoundData";
import { catalogChunk } from "@shared/utils/createCatalogChunks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
// import Pagination from "./Pagination";
import { collectionsStore } from "@shared/store/collections/collectionsStore";
import { collectionsFilterStore } from "@shared/store/collections/collectionsFilterStore";
import { fetchPaginatedArtworks } from "@shared/services/artworks/fetchPaginatedArtworks";
import Pagination from "./Pagination";
import { fetchArtworksByCriteria } from "@shared/services/artworks/fetchArtworksByCriteria";

export function ArtworksListing({
  medium,
  sessionId,
}: {
  medium: string;
  sessionId: string | undefined;
}) {
  const { isLoading, setArtworks, artworks, paginationCount, setPageCount } =
    collectionsStore();
  const { filterOptions } = collectionsFilterStore();
  const { width } = useWindowSize();

  const { data: artworksArray, isLoading: loading } = useQuery({
    queryKey: ["get_artworks_by_collection"],
    queryFn: async () => {
      const response = await fetchArtworksByCriteria(
        medium,
        paginationCount,
        filterOptions
      );

      if (response?.data) {
        setPageCount(response.pageCount);
        setArtworks(response.data);
        return response.data;
      } else throw new Error("Failed to fetch artworks");
    },
    refetchOnWindowFocus: false,
  });

  if (loading || isLoading) {
    return <ArtworksListingSkeletonLoader />;
  }

  if (!artworksArray || artworksArray.length === 0 || artworks.length === 0) {
    return (
      <div className="w-full h-full grid place-items-center">
        <NotFoundData />
      </div>
    );
  }

  const arts = catalogChunk(
    artworks,
    width < 400 ? 1 : width < 768 ? 2 : width < 1280 ? 3 : width < 1440 ? 4 : 5
  );

  return (
    <div className="w-full mb-5 px-5 mt-3">
      {/* <p className="text-xs font-normal mb-4">{artwork_total} artworks:</p> */}

      <div className="flex flex-wrap gap-x-4 justify-center">
        {arts.map((artworks: any[], index) => {
          return (
            <div className="flex-1 gap-2 space-y-6" key={index}>
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

      <Pagination medium={medium} />
    </div>
  );
}