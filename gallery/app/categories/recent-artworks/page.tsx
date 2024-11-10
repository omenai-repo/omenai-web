import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { ArtworkListing } from "./components/ArtworksListing";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Filter from "../components/filters/Filter";
// import Filter from "./components/Filter";

export default async function RecentArtworks() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <main className="relative">
      <DesktopNavbar />
      <div className="p-4">
        <div className="space-y-1 my-5 px-4">
          <h1 className="text-sm md:text-md font-normal">Latest artworks</h1>
          <p className="text-base md:text-sm text-[#858585] font-light italic">
            Fresh Off the Easel: Explore the Newest Masterpieces, Just for You
          </p>
        </div>
        <Filter page_type="recent" />
        <ArtworkListing
          sessionId={
            session?.user.role === "user" ? session?.user.id : undefined
          }
        />
      </div>
    </main>
  );
}
