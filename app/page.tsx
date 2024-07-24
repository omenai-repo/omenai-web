"use client";
import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import LatestArtworks from "./features/latest/LatestArtworks";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Editorials from "./features/editorials/Editorials";
import TrendingArtworks from "./features/trending/TrendingArtworks";
import CuratedArtworkClientWrapper from "./features/curated/CuratedArtworkClientWrapper";
import Footer from "@/components/footer/Footer";
import ArtworkSlides from "./features/artworkSlides/ArtworkSlides";
import Collections from "./features/collections/Collections";
import { getPromotionalData } from "@/services/promotionals/getPromotionalContent";
import Hero from "./features/hero/Hero";
import { useQuery } from "@tanstack/react-query";
import Load from "@/components/loader/Load";
import { IndividualLogo } from "@/components/logo/Logo";
import { ObjectId } from "mongoose";
import HomeLoader from "@/components/loader/HomeLoader";
export default function Home() {
  const { data: promotionals, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const promotionals = await getPromotionalData();
      if (!promotionals?.isOk) throw new Error("Something went wrong");
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

  const promotional_Array: PromotionalSchemaTypes = promotionals as any;

  return (
    <main>
      <DesktopNavbar />
      <Hero promotionals={promotional_Array} />
      <ArtworkSlides />
      <Collections />
      <Editorials />
      <Footer />
    </main>
  );
}
