"use client";
import Load from "@/components/loader/Load";
import { fetchCuratedArtworks } from "@/services/artworks/fetchedCuratedArtworks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import CuratedArtworksLayout from "./CuratedArtworksLayout";
import NotFoundData from "@/components/notFound/NotFoundData";
import { SectionLoaderContainers } from "../loaders/SectionLoaderContainers";

export default function CuratedArtworkClientWrapper({
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
      <SectionLoaderContainers title="Based on your preferences" />
    );
  return (
    <>
      {userCuratedArtworks!.length === 0 && (
        <div className="h-[500px] w-full place-items-center grid">
          <NotFoundData />
        </div>
      )}
      <div className="bg-[#fafafa] relative">
        <div className="relative z-20 py-8">
          <CuratedArtworksLayout
            sessionId={sessionId}
            userCuratedArtworks={userCuratedArtworks}
          />
        </div>
      </div>
    </>
  );
}
