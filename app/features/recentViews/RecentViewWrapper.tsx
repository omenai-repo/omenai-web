"use client";
import Load from "@/components/loader/Load";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import RecentViewArtworks from "./RecentViewArtworks";
import { fetchViewHistory } from "@/services/viewHistory/fetchViewHistory";
import HorizontalArtworkCardLoader from "@/components/loader/HorizontalArtworkCardsLoader";
import { SectionLoaderContainers } from "../loaders/SectionLoaderContainers";

export default function RecentViewWrapper({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  const { data: artworks, isLoading } = useQuery({
    queryKey: ["recent_views"],
    queryFn: async () => {
      const data = await fetchViewHistory(sessionId!);
      if (!data?.isOk) throw new Error("Something went wrong");
      else return data.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <SectionLoaderContainers title="Recently viewed" />;
  return (
    <>
      {artworks?.length === 0 ? null : (
        <RecentViewArtworks artworks={artworks} sessionId={sessionId} />
      )}
    </>
  );
}
