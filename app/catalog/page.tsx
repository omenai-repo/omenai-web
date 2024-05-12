import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import AllArtworks from "./components/AllArtworks";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Filter from "./components/Filter";

export default async function page() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <main className="relative">
      <DesktopNavbar />

      {/* <Hero /> */}
      <Filter />
      <AllArtworks
        sessionId={session?.user.role === "user" ? session?.user.id : undefined}
      />
    </main>
  );
}
