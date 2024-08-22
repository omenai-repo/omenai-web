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
    <div className="py-4 min-w-[300px]">
      <div className="flex flex-col ">
        <img
          src={`/images/${url}.jpg`}
          alt={title + " image"}
          className="min-w-[250px] w-auto min-h-[200px] h-[250px] object-cover object-top cursor-pointer"
        />
        <div className="bg-[#FAFAFA] flex flex-col p-4">
          <p className="text-[14px] font-light">{title}</p>
          {/* <span className="w-fit text-xs font-light text-[#858585] border-none">
            Omenai&apos;s best picks
          </span> */}
        </div>
      </div>
    </div>
  );
}
