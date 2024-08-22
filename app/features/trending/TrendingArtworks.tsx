"use client";
import { useQuery } from "@tanstack/react-query";
import TrendingArtworkCard from "./TrendingArtCard";
import { fetchAllArtworkImpressions } from "@/services/artworks/fetchArtworkImpressions";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import Link from "next/link";

export default function TrendingArtworks({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const { data: artworks, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const data = await fetchAllArtworkImpressions(1);

      if (!data?.isOk) throw new Error("Something went wrong");
      return data.data;
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
      {artworks.length === 0 && (
        <div className="h-[500px] w-full place-items-center grid">
          <NotFoundData />
        </div>
      )}
      {artworks.length > 0 && (
        <div className="py-4 md:p-4 relative">
          <div className="space-y-1 my-10">
            <h1 className="text-md font-normal">Trending artworks</h1>
            <p className="text-sm text-[#858585] font-medium italic">
              On the Rise: Discover the Art Everyone's Talking About
            </p>
          </div>
          <div className=" flex relative overflow-x-scroll w-full space-x-4">
            {artworks.map((artwork: any, index: number) => {
              if (artwork.impressions === 0) return null;
              return (
                <TrendingArtworkCard
                  key={artwork.art_id}
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
            {artworks.length >= 20 && (
              <div className="h-[400px] w-[250px] grid place-items-center mx-10">
                <Link href={""}>
                  <button className="whitespace-nowrap border border-dark rounded-full bg-transparent text-xs disabled:bg-[#E0E0E0] disabled:text-[#858585]  w-full text-dark disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark hover:text-white duration-300">
                    View all trending artworks
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
