import React from "react";
import GalleryListItem from "./GalleryListItem";
type GalleryItemTypes = {
  galleries: AdminGalleryListItemTypes[];
};
export default function GalleryList({ galleries }: GalleryItemTypes) {
  return (
    <div className="flex flex-col gap-y-4">
      {galleries.map((gallery, index) => {
        return (
          <GalleryListItem
            key={index}
            name={gallery.name}
            location={gallery.location}
            description={gallery.description}
            _id={gallery._id}
            email={gallery.email}
            admin={gallery.admin}
            logo={gallery.logo}
          />
        );
      })}
    </div>
  );
}
