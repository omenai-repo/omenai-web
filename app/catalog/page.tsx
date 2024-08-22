import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import AllArtworks from "./components/AllArtworks";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Filter from "./components/Filter";
import Collections from "../features/collections/Collections";

export default async function page() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <main className="relative">
      <DesktopNavbar />
      <div className="p-4 md:p-8">
        <Collections />

        {/* <Hero /> */}
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
