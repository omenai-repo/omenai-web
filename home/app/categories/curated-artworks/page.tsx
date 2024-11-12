import DesktopNavbar from "@shared/components/navbar/desktop/DesktopNavbar";
import { useEffect } from "react";
import { ArtworkListing } from "./components/ArtworksListing";
import Filter from "../components/filters/Filter";
import { nextAuthOptions } from "@shared/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";

export default async function CuratedArtworks() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <main className="relative">
      <DesktopNavbar />
      <div className="p-4">
        <div className="space-y-1 px-4 my-5">
          <h1 className="text-sm md:text-md font-normal">
            Artworks based on your preference
          </h1>
          <p className="text-base md:text-sm text-[#858585] font-light italic">
            Your Art, Your Way: Explore Pieces That Resonate with You
          </p>
        </div>
        <Filter page_type="curated" />
        <ArtworkListing
          sessionId={
            session?.user.role === "user" ? session?.user.id : undefined
          }
        />
      </div>
    </main>
  );
}
