import ArtworkCard from "@/components/artworks/ArtworkCard";
import Load from "@/components/loader/Load";

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
        | "availability"
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
          <Load />
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
          <div className="p-2">
            <div className="grid xxm:grid-cols-2 md:grid-cols-3 2lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-7 justify-center md:space-y-4 md:gap-x-4 gap-x-2 items-end">
              {data.map((artwork, index) => {
                return (
                  <ArtworkCard
                    key={artwork.art_id}
                    image={artwork.url}
                    name={artwork.title}
                    artist={artwork.artist}
                    art_id={artwork.art_id}
                    pricing={artwork.pricing}
                    impressions={artwork.impressions as number}
                    likeIds={artwork.like_IDs as string[]}
                    sessionId={sessionId}
                    availability={artwork.availability}
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
