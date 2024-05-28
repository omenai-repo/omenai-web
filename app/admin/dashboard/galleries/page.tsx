import { fetchUnverifiedGalleries } from "@/services/admin/fetch_unverified_galleries";
import React from "react";
import GalleryList from "./components/GalleryList";
import GalleryDetailPopupModal from "./components/GalleryDetailPopupModal";

export default async function page() {
  const galleries = await fetchUnverifiedGalleries();
  return (
    <div className="relative">
      <GalleryList galleries={galleries?.data} />
      <GalleryDetailPopupModal />
    </div>
  );
}
