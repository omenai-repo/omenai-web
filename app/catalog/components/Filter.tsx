"use client";
import { actionStore } from "@/store/actions/ActionStore";
import { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import PriceFilter from "./PriceFilter";
import FilterActions from "./FilterActions";
import CancelFilter from "./CancelFilter";
import YearFilter from "./YearFilter";
import MediumFilter from "./MediumFilter";
import RarityFilter from "./RarityFilter";
import ArtworkSlides from "@/app/features/artworkSlides/ArtworkSlides";
import { TabsDropdown } from "@/app/features/feature_tabs/TabsDropdown";
import Tabs from "@/app/features/feature_tabs/Tabs";

export default function Filter() {
  const [toggleFilterModal] = actionStore((state) => [state.toggleFilterModal]);

  return (
    <>
      <div className="w-full mt-12 flex justify-between items-center p-8">
        <div className="my-5 flex flex-col gap-y-2">
          <div className="hidden md:block">
            <Tabs catalogue={true} />
          </div>
          <div className="md:hidden block">
            <TabsDropdown catalogue={true} />
          </div>
        </div>
        <div className=" px-4 py-3 bg-dark flex space-x-2 items-center w-fit cursor-pointer">
          <span className="text-xs font-medium text-white">Filters</span>
          <GiSettingsKnobs className="rotate-90 text-white" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-2 items-center px-4">
        <PriceFilter />
        <YearFilter />
        <MediumFilter />
        <RarityFilter />
      </div>
    </>
  );
}
