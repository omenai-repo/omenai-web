"use client";

import { filterStore } from "@/store/artworks/FilterStore";
import { buildMongoQuery } from "@/utils/buildMongoFilterQuery";
import { hasFilterValue } from "@/utils/checkIfFilterExists";
import { isEmptyFilter } from "@/utils/isFilterEmpty";
import { ChangeEvent } from "react";

type FilterOptionBoxTypes = {
  filters: FilterValueType[];
  label: string;
  open: boolean;
};

type FilterValueType = {
  option: string;
  value: { min: number; max: number } | string;
};
export default function FilterOptionBox({
  filters,
  label,
  open,
}: FilterOptionBoxTypes) {
  const { updateFilter, removeFilter, filterOptions } = filterStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      updateFilter(label, e.target.value);
    } else {
      removeFilter(label, e.target.value);
    }
  };
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } w-full h-auto max-h-[300px] bg-white overflow-y-scroll absolute top-[100%] left-0 z-20 p-2`}
    >
      <div
        id="dropdownBgHover"
        className={`z-10 w-full bg-white border border-dark/10 dark:bg-gray-700`}
      >
        <ul
          className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownBgHoverButton"
        >
          {filters.map((filter, index) => {
            return (
              <li key={index}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={filter.option}
                    type="checkbox"
                    checked={hasFilterValue(filterOptions, label, filter.value)}
                    value={JSON.stringify(filter.value)}
                    onChange={handleChange}
                    className="w-4 h-4 text-dark bg-gray-100 border-dark/10 rounded focus:ring-dark dark:focus:ring-dark dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={filter.option}
                    className="w-full ms-2 text-xs font-normal text-dark rounded dark:text-white"
                  >
                    {filter.option}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
