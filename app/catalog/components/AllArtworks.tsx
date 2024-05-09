import ArtworkCard from "@/components/artworks/ArtworkCard";
import NotFoundData from "@/components/notFound/NotFoundData";

type AllArtworksTypes = {
  data: ArtworkResultTypes[];
};
export default function AllArtworks({
  data,
  sessionId,
}: AllArtworksTypes & { sessionId: string | undefined }) {
  return (
    <div className="p-4 my-16">
      {data.length === 0 ? (
        <div className="w-full h-full grid place-items-center">
          <NotFoundData />
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-1 space-y-4 items-end justify-around w-fit">
          {data.map((art: ArtworkResultTypes, index: number) => {
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
                  medium={art.medium}
                  rarity={art.rarity}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
