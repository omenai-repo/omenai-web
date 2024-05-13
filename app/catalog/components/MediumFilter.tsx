"use client";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilterOptionBox from "./FilterOptionBox";
import { useState } from "react";
import { filterStore } from "@/store/artworks/FilterStore";

const options = [
  "Acrylic",
  "Oil",
  "Fabric",
  "Mixed media",
  "Ink",
  "Collage or other works on paper",
  "Ankara",
  "Photography",
  "Charcoal",
  "Canvas",
  "Paper",
  "Other",
];
const mediumFilterOptions = options.map((option) => ({
  option: option,
  value: option,
}));

export default function MediumFilter() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { filterOptions } = filterStore();

  return (
    <div className="p-2 relative w-full">
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="border border-dark/10 font-normal text-xs text-dark flex justify-between items-center p-3 hover:bg-[#FAFAFA] hover:border-dark"
      >
        <p className="flex gap-x-2 items-center">
          <span>Filter by Medium</span>
          {filterOptions.medium.length > 0 && (
            <span className="relative h-2 w-2 p-2.5 grid place-items-center rounded-md bg-dark/10">
              <span className="absolute translate-x-[0%] translate-y-[0%]">
                {filterOptions.medium.length}
              </span>
            </span>
          )}
        </p>
        <MdOutlineKeyboardArrowDown />
      </div>
      <FilterOptionBox
        filters={mediumFilterOptions}
        label={"medium"}
        open={openDropdown}
      />
    </div>
  );
}
