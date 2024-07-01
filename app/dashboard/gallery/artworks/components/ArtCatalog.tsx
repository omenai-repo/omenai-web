"use client";

import ArtworkCard from "@/components/artworks/ArtworkCard";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import { getAllArtworksById } from "@/services/artworks/fetchAllArtworksById";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function ArtCatalog() {
  const session = useSession();
  const sessionId = session.data?.user.id;
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
  });

  if (isLoading)
    return (
      <div className="h-[75vh] grid place-items-center">
        <Load />
      </div>
    );
  const reversedArtworks = [...artworks].reverse();
  return (
    <div className="py-4 xxm:px-4 my-4 w-full">
      {artworks.length === 0 ? (
        <div className="w-full h-full grid place-items-center">
          <NotFoundData />
        </div>
      ) : (
        <div className="w-full mb-12">
          <div className="grid grid-row-auto xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-12 w-full items-end ">
            {reversedArtworks.map((art: ArtworkResultTypes, index: number) => {
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
                    isDashboard={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
