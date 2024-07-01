"use client";
import { validate } from "@/lib/validations/upload_artwork_input_validator/validator";
import { galleryArtworkUploadStore } from "@/store/gallery/gallery_artwork_upload/GalleryArtworkUpload";
import { trimWhiteSpace } from "@/utils/trimWhitePace";
import { ChangeEvent, useState } from "react";

type ArtworkTextInputProps = {
  label: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required: boolean;
  type?: string;
};
export default function ArtworkTextInput({
  label,
  placeholder,
  name,
  required,
  type = "text",
}: ArtworkTextInputProps) {
  const [updateArtworkUploadData, updateErrorField] = galleryArtworkUploadStore(
    (state) => [state.updateArtworkUploadData, state.updateErrorField]
  );

  const [errorList, setErrorList] = useState<string[]>([]);

  const handleChange = (value: string, label: string) => {
    const trimmedValue = trimWhiteSpace(value);
    setErrorList([]);
    const { success, errors }: { success: boolean; errors: string[] | [] } =
      validate(label, trimmedValue);
    if (!success) {
      setErrorList(errors);
      updateErrorField(label, trimmedValue);
    } else {
      updateArtworkUploadData(label, trimmedValue);
      updateErrorField(label, "");
    }
  };

  return (
    <div
      className={`flex flex-col gap-1 ${
        type === "textarea" && "lg:last:col-span-4 md:last:col-span-2"
      } `}
    >
      <label htmlFor={name} className="text-[#858585] font-normal text-xs">
        {label}
      </label>
      {type === "text" && (
        <input
          name={name}
          required={required}
          type="text"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value, name)}
          className="border px-2 ring-0 text-xs text-[#858585] border-[#E0E0E0] w-full py-2 focus:border-none focus:ring-dark placeholder:font-light placeholder:text-xs placeholder:text-[#858585] "
        />
      )}
      {type === "textarea" && (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={2}
          onChange={(e) => handleChange(e.target.value, name)}
          className="border px-2 ring-0 text-xs text-[#858585] border-[#E0E0E0] w-full py-2 focus:border-none focus:ring-dark placeholder:font-light placeholder:text-xs placeholder:text-[#858585] "
        />
      )}
      {errorList.length > 0 &&
        errorList.map((error, index) => {
          return (
            <p key={index} className="text-red-600 text-xs">
              {error}
            </p>
          );
        })}
    </div>
  );
}
