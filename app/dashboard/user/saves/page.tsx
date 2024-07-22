"use client";
import ArtworkCard from "@/components/artworks/ArtworkCard";
import Load from "@/components/loader/Load";
import { fetchUserSaveArtworks } from "@/services/artworks/fetchUserSavedArtworks";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Saves() {
  const session = useSession();
  const router = useRouter();

  if (session.data === null) router.replace("/auth/login");

  const { data: artworks, isLoading } = useQuery({
    queryKey: ["fetch_saved_artworks"],
    queryFn: async () => {
      const artworks = await fetchUserSaveArtworks();
      if (!artworks) throw new Error("Something went wrong");
      else return artworks.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[50vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }

  return (
    <div className="p-4">
      {artworks.length === 0 ? (
        <div className="w-full h-[50vh] grid place-items-center">
          <p>Like an artwork to add it here.</p>
        </div>
      ) : (
        <div className="flex flex-wrap items-end relative gap-x-2 overflow-x-scroll w-full">
          {artworks.map((art: ArtworkResultTypes, index: number) => {
            return (
              <div key={index}>
                <ArtworkCard
                  key={index}
                  image={art.url}
                  name={art.title}
                  artist={art.artist}
                  art_id={art.art_id}
                  pricing={art.pricing}
                  impressions={art.impressions as number}
                  likeIds={art.like_IDs as string[]}
                  availability={art.availability}
                  sessionId={
                    session?.data?.user.role === "user"
                      ? session?.data?.user.id
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

{
  /* <div className="grid grid-row-auto xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-12 w-full items-end ">
  {artworks.map((art: ArtworkResultTypes, index: number) => {
    return (
      <div key={index}>
        <ArtworkCard
          key={index}
          image={art.url}
          name={art.title}
          artist={art.artist}
          art_id={art.art_id}
          pricing={art.pricing}
          impressions={art.impressions as number}
          likeIds={art.like_IDs as string[]}
          sessionId={sessionId}
          availability={art.availability}
        />
      </div>
    );
  })}
</div>; */
}
