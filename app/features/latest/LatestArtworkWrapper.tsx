"use client";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchAllArtworks } from "@/services/artworks/fetchAllArtworks";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LatestArtworks from "./LatestArtworks";
import HorizontalArtworkCardLoader from '@/components/loader/HorizontalArtworkCardsLoader';
import { SectionLoaderContainers } from "../loaders/SectionLoaderContainers";

export default function LatestArtworkWrapper({
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
    <SectionLoaderContainers title="Latest artworks" />
  );
  
  return (
    <>
      {artworks.length === 0 && (
        <div className="h-[500px] w-full place-items-center grid">
          <NotFoundData />
        </div>
      )}
      <LatestArtworks artworks={artworks} sessionId={sessionId} />
    </>
  );
}
