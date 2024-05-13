"use client";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilterOptionBox from "./FilterOptionBox";
import { filterStore } from "@/store/artworks/FilterStore";

const rarityFilterOptions = [
  { option: "Unique", value: "Unique" },
  { option: "Limited edition", value: "Limited edition" },
  { option: "Open edition", value: "Open edition" },
  { option: "Unknown edition", value: "Unknown edition" },
];
export default function RarityFilter() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { filterOptions } = filterStore();

  return (
    <div className="p-2 relative w-full">
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="border border-dark/10 font-normal text-xs text-dark flex justify-between items-center p-3 hover:bg-[#FAFAFA] hover:border-dark"
      >
        <p className="flex gap-x-2 items-center">
          <span>Filter by Rarity</span>
          {filterOptions.rarity.length > 0 && (
            <span className="relative h-2 w-2 p-2.5 grid place-items-center rounded-md bg-dark/10">
              <span className="absolute translate-x-[0%] translate-y-[0%]">
                {filterOptions.rarity.length}
              </span>
            </span>
          )}
        </p>
        <MdOutlineKeyboardArrowDown />
      </div>
      <FilterOptionBox
        filters={rarityFilterOptions}
        label={"rarity"}
        open={openDropdown}
      />
    </div>
  );
}
