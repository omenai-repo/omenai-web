"use client";
import Load from "@/components/loader/Load";
import ArtworkCard from "../../../components/artworks/ArtworkCard";
import { fetchAllArtworks } from "@/services/artworks/fetchAllArtworks";
import { useQuery } from "@tanstack/react-query";
import NotFoundData from "@/components/notFound/NotFoundData";
import Link from "next/link";

export default function LatestArtworks({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const { data: artworks, isLoading } = useQuery({
    queryKey: ["latest"],
    queryFn: async () => {
      const data = await fetchAllArtworks(1);
      if (!data?.isOk) throw new Error("Something went wrong");
      else return data.data;
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
            <h1 className="text-md font-normal">Latest artworks</h1>
            <p className="text-sm text-[#858585] font-medium italic">
              Fresh Off the Easel: Explore the Newest Masterpieces, Just for You
            </p>
          </div>

          <div className="flex items-end relative space-x-4 overflow-x-scroll w-full">
            {artworks.map((artwork: any, index: number) => {
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
            {artworks.length >= 20 && (
              <div className="h-[400px] w-[250px] grid place-items-center mx-10">
                <Link href={""}>
                  <button className="whitespace-nowrap border border-dark rounded-full bg-transparent text-xs disabled:bg-[#E0E0E0] disabled:text-[#858585]  w-full text-dark disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark hover:text-white duration-300">
                    View all recent artworks
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
