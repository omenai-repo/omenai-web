import React from "react";
import ArtCollectionCard from "./ArtCollectionCard";

const collections = [
  { title: "Acrylic", url: "acrylic_art" },
  { title: "Charcoal", url: "charcoal_art" },
  { title: "Fabric", url: "fabric_art" },
  { title: "Oil", url: "oil_art" },
  { title: "Photography", url: "photography_art" },
];
export default function Collections() {
  return (
    <div className="p-4 md:p-8 mb-[4rem]">
      <div className="my-5 flex flex-col gap-y-2">
        <h1 className="text-sm font-medium">Art collections</h1>
        <p className="text-[14px]">
          Discover artworks meticulously curated into various collections for
          your browsing pleasure.
        </p>
      </div>

      <div className="flex relative gap-x-4 overflow-x-scroll w-full">
        {collections.map((collection, index) => {
          return (
            <div key={collection.title}>
              <ArtCollectionCard
                title={collection.title}
                url={collection.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
