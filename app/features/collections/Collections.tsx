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
      <div className="space-y-1 my-10">
        <h1 className="text-md font-normal">Art Collections</h1>
        <p className="text-sm text-[#858585] font-medium italic">
          Dive Into Diverse Art Collections, Thoughtfully Curated for Your
          Exploration
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
