import DesktopNavbar from "@shared/components/navbar/desktop/DesktopNavbar";
import AllArtworks from "./components/AllArtworks";
import { nextAuthOptions } from "@shared/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Filter from "./components/Filter";
import Collections from "../features/collections/Collections";

export default async function page() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <main className="relative">
      <DesktopNavbar />
      <div className="px-0 md:px-4">
        <Collections />
      </div>

      {/* <Hero /> */}
      <div className="px-4 md:px-8">
        <Filter />
        <AllArtworks
          sessionId={
            session?.user.role === "user" ? session?.user.id : undefined
          }
        />
      </div>
    </main>
  );
}
