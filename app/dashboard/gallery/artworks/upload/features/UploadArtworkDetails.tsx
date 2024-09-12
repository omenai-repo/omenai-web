"use client";
import ArtworkDimensionsInputGroup from "./components/ArtworkDimensionsInputGroup";
import ArtworkInfoInputGroup from "./components/ArtworkInfoInputGroup";
import ArtworkPriceInputGroup from "./components/ArtworkPriceInputGroup";
import { BsArrowRight } from "react-icons/bs";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { galleryArtworkUploadStore } from "@/store/gallery/gallery_artwork_upload/GalleryArtworkUpload";
import { allKeysEmpty } from "@/utils/checkIfObjectEmpty";
import ArtistInfoInputGroup from "./components/ArtistInfoInputGroup";
export default function UploadArtworkDetails() {
  const router = useRouter();
  const [errorFields, artworkUploadData] = galleryArtworkUploadStore(
    (state) => [state.errorFields, state.artworkUploadData]
  );

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!allKeysEmpty(errorFields)) toast.error("Invalid field inputs...");
    else {
      toast.success("Processing...please wait");
      router.push("/dashboard/gallery/artworks/upload/image");
    }
  }
  return (
    <div className="">
      {/* Details inputs */}
      <form onSubmit={handleFormSubmit}>
        <ArtworkInfoInputGroup />
        <ArtistInfoInputGroup />
        <ArtworkDimensionsInputGroup />
        <ArtworkPriceInputGroup />
        <div className="w-full flex my-4 text-xs">
          <button
            type="submit"
            className="w-full bg-dark rounded-sm text-white h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
          >
            <>
              Proceed
              <BsArrowRight />
            </>
          </button>
        </div>
      </form>
    </div>
  );
}
