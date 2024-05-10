import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FilterOptionBox from "./FilterOptionBox";
const yearFilterOptions = [
  { option: "2020s", value: { min: 2020, max: 2029 } },
  { option: "2010s", value: { min: 2010, max: 2019 } },
  { option: "2000s", value: { min: 2000, max: 2009 } },
  { option: "1990s", value: { min: 1990, max: 1999 } },
  { option: "1980s", value: { min: 1980, max: 1989 } },
  { option: "1970s", value: { min: 1970, max: 1979 } },
  { option: "1960s", value: { min: 1960, max: 1969 } },
  { option: "1950s", value: { min: 1950, max: 1959 } },
  { option: "1940s", value: { min: 1940, max: 1949 } },
  { option: "1930s", value: { min: 1930, max: 1939 } },
  { option: "1920s", value: { min: 1920, max: 1929 } },
  { option: "1910s", value: { min: 1910, max: 1919 } },
  { option: "1900s", value: { min: 1900, max: 1909 } },
  { option: "19th century", value: { min: 1800, max: 1899 } },
  { option: "18th century & Earlier", value: { min: 0, max: 1799 } },
];
export default function YearFilter() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="p-2 relative w-full">
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="border border-dark/10 font-normal text-xs text-dark flex justify-between items-center p-3 hover:bg-[#FAFAFA] hover:border-dark"
      >
        <p>Filter by Year</p>
        <MdOutlineKeyboardArrowDown />
      </div>
      <FilterOptionBox
        filters={yearFilterOptions}
        label={"rarity"}
        open={openDropdown}
      />
    </div>
  );
}
