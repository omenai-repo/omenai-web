"use client";
import ArtworkCard from "@/components/artworks/ArtworkCard";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchCuratedArtworks } from "@/services/artworks/fetchedCuratedArtworks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function CuratedArtworksLayout({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const session = useSession();
  const { data: userCuratedArtworks, isLoading } = useQuery({
    queryKey: ["curated"],
    queryFn: async () => {
      const data = await fetchCuratedArtworks(session);
      if (data?.isOk) return data.data;
      else return [];
    },
  });

  if (isLoading)
    return (
      <div className="h-[500px] w-full place-items-center grid">
        <Load />
      </div>
    );

  return (
    <>
      {userCuratedArtworks!.length === 0 && (
        <div className="h-[500px] w-full place-items-center grid">
          <NotFoundData />
        </div>
      )}
      {userCuratedArtworks !== undefined && userCuratedArtworks.length > 0 && (
        <div className="py-4 md:p-4 relative mt-5">
          <div className="flex items-end relative overflow-x-scroll w-full space-x-2">
            {userCuratedArtworks.map((artwork: any, index: number) => {
              return (
                <ArtworkCard
                  image={artwork.url}
                  key={index}
                  artist={artwork.artist}
                  name={artwork.title}
                  pricing={artwork.pricing}
                  impressions={artwork.impressions}
                  likeIds={artwork.like_IDs}
                  sessionId={sessionId}
                  art_id={artwork.art_id}
                  availability={artwork.availability}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
