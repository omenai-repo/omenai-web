"use client";
import { notFound, useSearchParams } from "next/navigation";
import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleArtwork } from "@shared/services/artworks/fetchSingleArtwork";
import Load from "@shared/components/loader/Load";
import EditArtworkWrapper from "./components/EditArtworkWrapper";

export default function EditArtwork() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id === null) return notFound();

  const title = decodeURIComponent(id);

  const { data: artwork, isLoading } = useQuery({
    queryKey: ["get_update_pricing_artwork_details"],
    queryFn: async () => {
      const data = await fetchSingleArtwork(title);
      if (!data?.isOk) throw new Error("Something went wrong");
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="h-[85vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }

  return (
    <div>
      <PageTitle title="Edit artwork Price" />
      <EditArtworkWrapper artwork={artwork} />
    </div>
  );
}
