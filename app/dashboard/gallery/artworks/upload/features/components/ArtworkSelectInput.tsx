"use client";
import { galleryArtworkUploadStore } from "@/store/gallery/gallery_artwork_upload/GalleryArtworkUpload";
import { ChangeEvent } from "react";

type ArtworkSelectInputProps = {
  label: string;
  items?: string[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  required: boolean;
};
export default function ArtworkSelectInput({
  label,
  items,
  name,
  required,
}: ArtworkSelectInputProps) {
  const [updateArtworkUploadData] = galleryArtworkUploadStore((state) => [
    state.updateArtworkUploadData,
  ]);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-dark/80 font-normal text-xs">
        {label}
      </label>
      <select
        onChange={(e) => updateArtworkUploadData(name, e.target.value)}
        required={required}
        className="border px-2 ring-0 text-xs text-[#858585] border-[#E0E0E0] w-full py-2 focus:border-none focus:ring-dark placeholder:font-light placeholder:text-xs placeholder:text-[#858585] "
      >
        <option value="">Select</option>
        {items!.map((item, index) => {
          return (
            <option
              key={index}
              value={item}
              className="p-3 font-light text-dark"
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
