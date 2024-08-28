import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { ArtworkListing } from "./components/ArtworksListing";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Filter from "../components/filters/Filter";
// import Filter from "./components/Filter";

export default async function TrendingArtworks(){
    const session = await getServerSession(nextAuthOptions);

    return(
        <main className="relative">
            <DesktopNavbar />
            <div className="p-4 md:p-8">
                <div className="space-y-1 my-5">
                    <h1 className="text-md font-normal">Trending artworks</h1>
                    <p className="text-sm text-[#858585] font-normal italic">
                        On the Rise: Discover the Art Everyone's Talking About
                    </p>
                </div>
                <Filter page_type="trending" />
                <ArtworkListing
                    sessionId={
                        session?.user.role === "user" ? session?.user.id : undefined
                    }
                />
            </div>
        </main>
    )
}