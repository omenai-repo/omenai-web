import ArtworkCard from "@/components/artworks/ArtworkCard";
import Loader from "@/components/loader/Loader";

type SearchResultDetailsProps = {
  data:
    | (Pick<
        ArtworkSchemaTypes,
        | "art_id"
        | "artist"
        | "pricing"
        | "title"
        | "url"
        | "impressions"
        | "like_IDs"
        | "medium"
        | "rarity"
      > & { _id: string })[]
    | "pending";
  searchTerm: string;
  sessionId: string | undefined;
};
export default function SearchResultDetails({
  data,
  searchTerm,
  sessionId,
}: SearchResultDetailsProps) {
  return (
    <div>
      {data === "pending" ? (
        <div className="h-[80vh] w-full grid place-items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="px-5 py-8">
            <h1 className="text-base font-normal text-dark">
              {data.length} result(s) found for term{" "}
              <span className="text-blue-600">&apos;{searchTerm}&apos;</span>
            </h1>
          </div>
          <hr className=" border-dark/10" />
          <div className="p-4">
            <div className="grid grid-row-auto xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-12 w-full items-end ">
              {data.map((artwork, index) => {
                return (
                  <ArtworkCard
                    key={index}
                    image={artwork.url}
                    name={artwork.title}
                    artist={artwork.artist}
                    art_id={artwork.art_id}
                    pricing={artwork.pricing}
                    impressions={artwork.impressions as number}
                    likeIds={artwork.like_IDs as string[]}
                    sessionId={sessionId}
                    medium={artwork.medium}
                    rarity={artwork.rarity}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
