"use client";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchAllArtworks } from "@/services/artworks/fetchAllArtworks";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import TrendingArtworks from "./TrendingArtworks";
import { fetchAllArtworkImpressions } from "@/services/artworks/fetchArtworkImpressions";

export default function TrendingArtworkWrapper({
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
      <TrendingArtworks artworks={artworks} sessionId={sessionId} />
    </>
  );
}
