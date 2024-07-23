import ArtworkCard from "@/components/artworks/ArtworkCard";
import NotFoundData from "@/components/notFound/NotFoundData";

export default function SimilarArtworks({
  title,
  artworksByCriteria,
  sessionId,
}: {
  title: string;
  artworksByCriteria: any;
  sessionId: string | undefined;
}) {
  const artworks = artworksByCriteria.data.filter((artwork: any) => {
    return artwork.title !== title;
  });
  return (
    <div className="w-full h-full p-4 my-12">
      <h1 className="text-dark/70 font-normal text-sm mb-8">
        You may also like
      </h1>
      {artworks.length === 0 ? (
        <div className="w-full h-full grid place-items-center">
          <NotFoundData />
        </div>
      ) : (
        <div className="flex relative gap-x-4 items-end overflow-x-scroll w-full">
          {artworks.map(
            (
              art: {
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
              },
              index: any
            ) => {
              return (
                <ArtworkCard
                  key={art.art_id}
                  image={art.url}
                  name={art.title}
                  artist={art.artist}
                  pricing={art.pricing}
                  impressions={art.impressions}
                  likeIds={art.like_IDs}
                  sessionId={sessionId}
                  art_id={art.art_id}
                  availability={art.availability}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
