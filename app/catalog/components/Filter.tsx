"use client";
import { actionStore } from "@/store/actions/ActionStore";
import { GiSettingsKnobs } from "react-icons/gi";
import PriceFilter from "./PriceFilter";
import YearFilter from "./YearFilter";
import MediumFilter from "./MediumFilter";
import RarityFilter from "./RarityFilter";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Filter() {
  const [toggleFilterModal] = actionStore((state) => [state.toggleFilterModal]);
  const [showFilterBlock, setShowFilterBlock] = useState(false);

  const { width } = useWindowSize();

  return (
    <div className="sticky top-[63px] z-20 bg-white border-b border-b-dark/10 pt-4">
      <div className="w-full flex justify-between items-center py-4 px-4 md:px-8">
        {width < 769 && (
          <button
            className="py-2 px-5 bg-dark flex space-x-2 items-center w-fit cursor-pointer"
            onClick={() => setShowFilterBlock(!showFilterBlock)}
          >
            <span className="text-xs font-medium text-white">Filters</span>
            <GiSettingsKnobs className="rotate-90 text-white" />
          </button>
        )}
        <div />
        <button
          disabled
          className=" disabled:bg-dark/30 disabled:cursor-not-allowed py-2 px-5 bg-dark flex space-x-2 items-center w-fit cursor-pointer"
          onClick={() => setShowFilterBlock(!showFilterBlock)}
        >
          <span className="text-xs font-medium text-white">Apply filters</span>
        </button>
      </div>

      <div
        className={`${
          width > 768 ? "grid" : "hidden"
        } duration-200 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 items-center px-2`}
      >
        <PriceFilter />
        <YearFilter />
        <MediumFilter />
        <RarityFilter />
      </div>
      {width < 769 && showFilterBlock && (
        <div
          className={` grid duration-200 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 items-center px-2`}
        >
          <PriceFilter />
          <YearFilter />
          <MediumFilter />
          <RarityFilter />
        </div>
      )}
    </div>
  );
}
