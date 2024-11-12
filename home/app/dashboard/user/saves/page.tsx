"use client";
import ArtworkCanvas from "@shared/components/artworks/ArtworkCanvas";
import ArtworkCard from "@shared/components/artworks/ArtworkCard";
import Load from "@shared/components/loader/Load";
import { fetchUserSaveArtworks } from "@shared/services/artworks/fetchUserSavedArtworks";
import { catalogChunk } from "@shared/utils/createCatalogChunks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "usehooks-ts";

export default function Saves() {
  const session = useSession();
  const router = useRouter();
  const { width } = useWindowSize();

  if (session.data === null) router.replace("/auth/login");

  const { data: artworks, isLoading } = useQuery({
    queryKey: ["fetch_saved_artworks"],
    queryFn: async () => {
      const artworks = await fetchUserSaveArtworks();
      if (!artworks) throw new Error("Something went wrong");
      else return artworks.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="h-[50vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }
  const arts = catalogChunk(
    artworks,
    width < 400 ? 1 : width < 768 ? 2 : width < 1280 ? 3 : width < 1440 ? 4 : 5
  );

  return (
    <div className="p-2">
      {artworks.length === 0 ? (
        <div className="w-full h-[50vh] grid place-items-center">
          <p>Like an artwork to add it here.</p>
        </div>
      ) : (
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
                      sessionId={session.data?.user.id}
                      availability={art.availability}
                    />
                  );
                })}
              </div>
            );
          })}
          {/* first */}
        </div>
      )}
    </div>
  );
}
