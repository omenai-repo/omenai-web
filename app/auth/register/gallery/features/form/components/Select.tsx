"use client";
import { useGalleryAuthStore } from "@/store/auth/register/GalleryAuthStore";
import { ChangeEvent, useState } from "react";
import { MdError, MdOutlineArrowForward } from "react-icons/md";

type SelectInputProps = {
  label: string;
  labelText: string;
  items: string[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  required: boolean;
};

export default function SelectInput({
  label,
  labelText,
  items,
  name,
  required,
}: SelectInputProps) {
  const [
    gallerySignupData,
    currentGallerySignupFormIndex,
    incrementCurrentGallerySignupFormIndex,
    decrementCurrentGallerySignupFormIndex,
    updateGallerySignupData,
  ] = useGalleryAuthStore((state) => [
    state.gallerySignupData,
    state.currentGallerySignupFormIndex,
    state.incrementCurrentGallerySignupFormIndex,
    state.decrementCurrentGallerySignupFormIndex,
    state.updateGallerySignupData,
  ]);

  const [errorList, setErrorList] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateGallerySignupData(labelText, value);
  };

  const handleClickPrev = () => {
    setErrorList([]);
    decrementCurrentGallerySignupFormIndex();
  };

  const handleClick = () => {
    if ((gallerySignupData as Record<string, string>)[labelText] === "")
      setErrorList(["Please select an option from the dropdown"]);
    else incrementCurrentGallerySignupFormIndex();
  };
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-dark/80 font-normal text-xs">
        {label}
      </label>
      <select
        onChange={handleChange}
        required={required}
        className="border px-2 ring-0 text-[14px] text-dark border-[#E0E0E0] w-full py-2 focus:border-none focus:ring-dark placeholder:font-light placeholder:text-xs placeholder:text-[#858585] "
      >
        <option value="">Select</option>
        <>
          {items.map((item: any) => {
            return (
              <option
                key={item.code}
                value={item.name}
                className="px-3 py-5 my-5 font-normal text-[14px] text-dark"
              >
                {item.name}
              </option>
            );
          })}
        </>
      </select>

      {errorList.length > 0 &&
        errorList.map((error, index) => {
          return (
            <div
              key={`${index}-error_list`}
              className="flex items-center gap-x-2"
            >
              <MdError className="text-red-600" />
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          );
        })}

      <div className="self-end flex gap-4">
        <button
          className={`${
            currentGallerySignupFormIndex > 0 ? "block" : "hidden"
          }   h-[40px] px-4 mt-[1rem] bg-dark text-white text-xs font-medium hover:bg-dark/80 transition-all ease-linear duration-200`}
          type={"button"}
          onClick={handleClickPrev}
        >
          Back
        </button>
        <button
          className=" h-[40px] px-4 mt-[1rem] text-xs font-medium bg-dark text-white flex justify-center items-center gap-x-2 hover:bg-dark/80 transition-all ease-linear duration-200"
          type={"button"}
          onClick={handleClick}
        >
          <span>Next</span>
          <MdOutlineArrowForward />
        </button>
      </div>
    </div>
  );
}
