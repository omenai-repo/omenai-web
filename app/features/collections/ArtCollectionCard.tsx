import ArtworkCardTags from "@/components/artworks/ArtworkCardTags";

type ArtCollectionCardTypes = {
  title: string;
  url: string;
};
export default function ArtCollectionCard({
  title,
  url,
}: ArtCollectionCardTypes) {
  return (
    <div className="py-4">
      <div className="flex flex-col">
        <img
          src={`/images/${url}.jpg`}
          alt={title + " image"}
          className="min-w-[250px] w-[500px] min-h-[200px] h-[250px] object-cover object-top cursor-pointer"
        />
        <div className="bg-[#FAFAFA] flex flex-col p-4">
          <p className="text-[14px] font-medium">{title}</p>
          <span className="w-fit text-[12px] font-light border-none">
            #Best picks
          </span>
        </div>
      </div>
    </div>
  );
}
