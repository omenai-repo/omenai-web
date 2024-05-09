import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { fetchAllArtworks } from "@/services/artworks/fetchAllArtworks";
import AllArtworks from "./components/AllArtworks";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Hero from "../features/hero/Hero";
import Filter from "./components/Filter";

export default async function page() {
  // const artworks: { message: string; data: ArtworkResultTypes[] } =
  //   await fetchAllArtworks();
  // const session = await getServerSession(nextAuthOptions);

  return (
    <main className="relative">
      <DesktopNavbar />
      <p>In progress</p>

      {/* <Hero />
      <Filter />
      <AllArtworks
        data={artworks.data}
        sessionId={session?.user.role === "user" ? session?.user.id : undefined}
      /> */}
    </main>
  );
}
