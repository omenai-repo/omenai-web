"use client";
import { artworkActionStore } from "@/store/artworks/ArtworkActionStore";
import Tabs from "../feature_tabs/Tabs";
import LatestArtworks from "../latest/LatestArtworks";
import { useSession } from "next-auth/react";
import TrendingArtworks from "../trending/TrendingArtworks";
import CuratedArtworkClientWrapper from "../curated/CuratedArtworkClientWrapper";
import { TabsDropdown } from "../feature_tabs/TabsDropdown";

export default function ArtworkSlides() {
  const { selectedTab } = artworkActionStore();
  const session = useSession();

  return (
    <div className="mt-8 p-5">
      <div className="hidden md:block">
        <Tabs />
      </div>
      <div className="md:hidden block">
        <TabsDropdown />
      </div>

      <div className="my-5">
        {selectedTab.tag === "recent" && (
          <LatestArtworks
            sessionId={
              session?.data?.user.role === "user"
                ? session?.data.user.id
                : undefined
            }
          />
        )}
        {selectedTab.tag === "tailored" && (
          <CuratedArtworkClientWrapper
            sessionId={
              session?.data?.user.role === "user"
                ? session?.data.user.id
                : undefined
            }
          />
        )}
        {selectedTab.tag === "trending" && (
          <TrendingArtworks
            sessionId={
              session?.data?.user.role === "user"
                ? session?.data.user.id
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
