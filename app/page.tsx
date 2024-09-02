"use client";
import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";

import Editorials from "./features/editorials/Editorials";
import TrendingArtworks from "./features/trending/TrendingArtworks";
import CuratedArtworkClientWrapper from "./features/curated/CuratedArtworkClientWrapper";
import Footer from "@/components/footer/Footer";
import Collections from "./features/collections/Collections";
import { getPromotionalData } from "@/services/promotionals/getPromotionalContent";
import Hero from "./features/hero/Hero";
import { useQuery } from "@tanstack/react-query";
import { IndividualLogo } from "@/components/logo/Logo";
import HomeLoader from "@/components/loader/HomeLoader";
import { useSession } from "next-auth/react";
import LatestArtworkWrapper from "./features/latest/LatestArtworkWrapper";
import TrendingArtworkWrapper from "./features/trending/TrendingrtworksWrapper";
import RecentViewWrapper from "./features/recentViews/RecentViewWrapper";
export default function Home() {
  const session = useSession();
  const { data: promotionals, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const promotionals = await getPromotionalData();
      if (!promotionals?.isOk) throw new Error("Something went wrong");
      // console.log(promotionals)
      return promotionals.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <div className="flex flex-col space-y-5 justify-center items-center">
          <HomeLoader />
          <IndividualLogo />
        </div>
      </div>
    );
  }

  return (
    <main>
      <DesktopNavbar />
      {promotionals && <Hero promotionals={promotionals.slice(0, 2)} />}
      <div className="px-4 lg:px-8">
        <LatestArtworkWrapper
          sessionId={
            session?.data?.user.role === "user"
              ? session?.data.user.id
              : undefined
          }
        />
        <Collections />
        <TrendingArtworkWrapper
          sessionId={
            session?.data?.user.role === "user"
              ? session?.data.user.id
              : undefined
          }
        />
        <Editorials />
        {session.data !== null && session.data.user.role === "user" && (
          <CuratedArtworkClientWrapper
            sessionId={
              session?.data?.user.role === "user"
                ? session?.data.user.id
                : undefined
            }
          />
        )}
        <RecentViewWrapper
          sessionId={
            session?.data?.user.role === "user"
              ? session?.data.user.id
              : undefined
          }
        />
        <Footer />
      </div>
    </main>
  );
}
