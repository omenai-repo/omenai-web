"use client";

import ArtworkCanvas from "@shared/components/artworks/ArtworkCanvas";
import ArtworkCard from "@shared/components/artworks/ArtworkCard";
import { ArtworksListingSkeletonLoader } from "@shared/components/loader/ArtworksListingSkeletonLoader";
import Load from "@shared/components/loader/Load";
import NotFoundData from "@shared/components/notFound/NotFoundData";
import { getAllArtworksById } from "@shared/services/artworks/fetchAllArtworksById";
import { catalogChunk } from "@shared/utils/createCatalogChunks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useWindowSize } from "usehooks-ts";

export default function ArtCatalog() {
  const session = useSession();
  const sessionId = session.data?.user.id;

  const { width } = useWindowSize();

  const { data: artworks, isLoading } = useQuery({
    queryKey: ["fetch_artworks_by_id"],
    queryFn: async () => {
      const artworks = await getAllArtworksById();
      if (artworks!.isOk) {
        return artworks!.data;
      } else {
        return [];
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <ArtworksListingSkeletonLoader />;
  }

  const reversedArtworks = [...artworks].reverse();

  const arts = catalogChunk(
    reversedArtworks,
    width < 400 ? 1 : width < 768 ? 2 : width < 1280 ? 3 : width < 1440 ? 4 : 5
  );
  return (
    <div className="py-4 mt-10 xxm:px-4 my-4 w-full">
      {artworks.length === 0 ? (
        <div className="w-full h-full grid place-items-center">
          <NotFoundData />
        </div>
      ) : (
        <div className="w-full mb-5 mt-3">
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
                        isDashboard
                      />
                    );
                  })}
                </div>
              );
            })}
            {/* first */}
          </div>
        </div>
      )}
    </div>
  );
}
