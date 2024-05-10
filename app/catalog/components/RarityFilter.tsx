import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilterOptionBox from "./FilterOptionBox";

const rarityFilterOptions = [
  { option: "Unique", value: "Unique" },
  { option: "Limited edition", value: "Limited edition" },
  { option: "Open edition", value: "Open edition" },
  { option: "Unknown edition", value: "Unknown edition" },
];
export default function RarityFilter() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="p-2 relative w-full">
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="border border-dark/10 font-normal text-xs text-dark flex justify-between items-center p-3 hover:bg-[#FAFAFA] hover:border-dark"
      >
        <p>Filter by Rarity</p>
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
