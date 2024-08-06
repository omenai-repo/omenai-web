"use client";
import ArtworkCard from "@/components/artworks/ArtworkCard";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchCuratedArtworks } from "@/services/artworks/fetchedCuratedArtworks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CuratedArtworksLayout({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const session = useSession();
  const { data: userCuratedArtworks, isLoading } = useQuery({
    queryKey: ["curated"],
    queryFn: async () => {
      const data = await fetchCuratedArtworks(session, 1);
      if (data?.isOk) return data.data;
      else throw new Error("Something went wrong");
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
        <div className="py-4 md:p-4 relative">
          <div className="flex items-end relative overflow-x-scroll w-full space-x-4">
            {userCuratedArtworks.map((artwork: any, index: number) => {
              return (
                <ArtworkCard
                  image={artwork.url}
                  key={artwork.art_id}
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
            {userCuratedArtworks.length >= 20 && (
              <div className="h-[400px] w-[250px] grid place-items-center mx-16">
                <Link href={""}>
                  <button className="whitespace-nowrap border border-dark rounded-full bg-transparent text-xs disabled:bg-[#E0E0E0] disabled:text-[#858585]  w-full text-dark disabled:cursor-not-allowed h-[35px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark hover:text-white duration-300">
                    View more
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
