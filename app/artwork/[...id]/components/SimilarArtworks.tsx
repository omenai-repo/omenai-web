"use client";
import ArtworkCanvas from "@/components/artworks/ArtworkCanvas";
import NotFoundData from "@/components/notFound/NotFoundData";
import { catalogChunk } from "@/utils/createCatalogChunks";
import { useWindowSize } from "usehooks-ts";

export default function SimilarArtworks({
  title,
  artworksByCriteria,
  sessionId,
}: {
  title: string;
  artworksByCriteria: any;
  sessionId: string | undefined;
}) {
  const { width } = useWindowSize();

  const artworks = artworksByCriteria.data.filter((artwork: any) => {
    return artwork.title !== title;
  });

  if (!artworks || artworks.length === 0) {
    return (
      <div className="w-full h-full grid place-items-center">
        <NotFoundData />
      </div>
    );
  }

  const arts = catalogChunk(
    artworks,
    width < 400 ? 1 : width < 768 ? 2 : width < 1280 ? 3 : 4
  );
  return (
    <div className="w-full h-full p-5">
      <h1 className="text-dark font-normal text-sm">You may also like</h1>

      <div className="w-full my-5">
        <div className="flex flex-wrap gap-x-4 justify-center">
          {arts.map((artworks: any[], index) => {
            return (
              <div className="flex-1 gap-4 space-y-12" key={index}>
                {artworks.map(
                  (art: {
                    url: string;
                    title: string;
                    artist: string;
                    _id: string;
                    pricing: {
                      price: number;
                      usd_price: number;
                      shouldShowPrice: "Yes" | "No" | string;
                    };
                    impressions: number;
                    like_IDs: string[];
                    art_id: string;
                    medium: string;
                    rarity: string;
                    availability: boolean;
                  }) => {
                    return (
                      <ArtworkCanvas
                        key={art.art_id}
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
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
