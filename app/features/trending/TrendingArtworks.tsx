"use client";
import { useQuery } from "@tanstack/react-query";
import TrendingArtworkCard from "./TrendingArtCard";
import { fetchAllArtworkImpressions } from "@/services/artworks/fetchArtworkImpressions";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";

export default function TrendingArtworks({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const { data: artworks, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const data = await fetchAllArtworkImpressions();
      return data.data;
    },
  });

  if (isLoading)
    return (
      <div className="h-[500px] w-full place-items-center grid">
        <Load />
      </div>
    );
  console.log(artworks);
  return (
    <>
      {artworks.length === 0 && (
        <div className="h-[500px] w-full place-items-center grid">
          <NotFoundData />
        </div>
      )}
      {artworks.length > 0 && (
        <div className="py-4 md:p-4 relative">
          <div className=" flex relative gap-x-4 overflow-x-scroll w-full">
            {artworks.map((artwork: any, index: number) => {
              if (artwork.impressions === 0) return null;
              return (
                <TrendingArtworkCard
                  key={index}
                  name={artwork.title}
                  image={artwork.url}
                  artist={artwork.artist}
                  impressions={artwork.impressions}
                  medium={artwork.medium}
                  rarity={artwork.rarity}
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
