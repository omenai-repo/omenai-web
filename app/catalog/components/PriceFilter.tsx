"use client";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilterOptionBox from "./FilterOptionBox";
import { useState } from "react";
const priceFilterOptions = [
  { option: "$0 to $1000", value: { min: 0, max: 1000 } },
  { option: "$1001 to $10000", value: { min: 1001, max: 10000 } },
  { option: "$10001 to $50000", value: { min: 10001, max: 50000 } },
  { option: "$50000+", value: { min: 500001, max: 1000000000 } },
];
export default function PriceFilter() {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="p-2 relative w-full">
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="border border-dark/10 font-normal text-xs text-dark flex justify-between items-center p-3 hover:bg-[#FAFAFA] hover:border-dark"
      >
        <p>Filter by Price</p>
        <MdOutlineKeyboardArrowDown />
      </div>
      {/* Filter options */}
      <FilterOptionBox
        filters={priceFilterOptions}
        label={"price"}
        open={openDropdown}
      />
    </div>
  );
}
