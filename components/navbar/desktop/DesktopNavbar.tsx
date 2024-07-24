"use client";
import { IndividualLogo } from "../../logo/Logo";
import NavbarLink from "../ui/NavbarLink";
import NavbarActionButtons from "../ui/NavbarActionButtons";
import { CiMenuFries } from "react-icons/ci";
import MobileNavbar from "../mobile/MobileNavbar";
import { actionStore } from "@/store/actions/ActionStore";
import { useSession } from "next-auth/react";
import LoggedInUser from "../ui/LoggedInUser";
import SearchInput from "../ui/SearchInput";
export default function DesktopNavbar() {
  const [updateOpenSideNav] = actionStore((state) => [state.updateOpenSideNav]);
  const session = useSession();

  return (
    <div className="sticky top-0 z-30 bg-white">
      <nav
        className="px-4 pt-5 pb-2 text-base text-black font-normal "
        id="navbar"
      >
        <MobileNavbar />
        <div className="w-full flex justify-between items-center">
          <IndividualLogo />
          <div className="md:hidden block">
            <CiMenuFries onClick={() => updateOpenSideNav(true)} />
          </div>

          <ul className="md:flex space-x-6 hidden">
            <NavbarLink disabled={false} text={"Catalogue"} link={"/catalog"} />
            <NavbarLink
              disabled={false}
              text={"Pricing"}
              link={"/gallery/pricing"}
            />
            <NavbarLink
              disabled={false}
              text={"Omenai shop"}
              link={"https://omenai.shop"}
            />
            <NavbarLink
              disabled={false}
              text={"Editorials"}
              link={"/articles"}
            />
          </ul>

          {session.status === "authenticated" &&
            session.data.user.role === "user" && (
              <div className="md:flex hidden">
                <LoggedInUser user={session.data?.user.name} />
              </div>
            )}

          {((session.data && session.data.user.role === "gallery") ||
            session.status === "unauthenticated") && (
            <div className="md:flex hidden">
              <NavbarActionButtons />
            </div>
          )}
        </div>
        {/* <div className="flex items-center justify-between my-2">
          <ul className="hidden lg:flex space-x-6 w-fit">
            <NavbarLink disabled={true} text={"Artists"} link={"/"} />
            <NavbarLink disabled={false} text={"Artworks"} link={"/catalog"} />
            <NavbarLink disabled={true} text={"Auctions"} link={"/"} />
            <NavbarLink disabled={true} text={"Fairs"} link={"/"} />
            <NavbarLink disabled={true} text={"Shows"} link={"/"} />
          </ul>
          <NavbarInput />
\        </div> */}
      </nav>
      <nav className="px-4 pt-2 pb-5 relative flex gap-x-2">
        <SearchInput />
      </nav>
      <hr className="border-dark/10 mx-4" />
    </div>
  );
}
