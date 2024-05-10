"use client";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilterOptionBox from "./FilterOptionBox";
import { useState } from "react";

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

  return (
    <div className="p-2 relative w-full">
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="border border-dark/10 font-normal text-xs text-dark flex justify-between items-center p-3 hover:bg-[#FAFAFA] hover:border-dark"
      >
        <p>Filter by Medium</p>
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
