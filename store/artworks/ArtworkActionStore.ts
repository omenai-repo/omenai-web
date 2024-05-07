import { create } from "zustand";

type ArtworkActionStoreTypes = {
  selectedTab: { title: string; tag: string };
  setSelectedTab: (tab: { title: string; tag: string }) => void;
};
export const artworkActionStore = create<ArtworkActionStoreTypes>(
  (set, get) => ({
    selectedTab: { title: "Recently uploaded", tag: "recent" },
    setSelectedTab: (tab: { title: string; tag: string }) => {
      set({ selectedTab: tab });
    },
  })
);
