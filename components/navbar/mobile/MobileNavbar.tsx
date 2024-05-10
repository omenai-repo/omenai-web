"use client";

import { actionStore } from "@/store/actions/ActionStore";
import NavbarActionButtons from "../ui/NavbarActionButtons";
import NavbarLink from "../ui/NavbarLink";
import { IndividualLogo } from "@/components/logo/Logo";
import { TfiClose } from "react-icons/tfi";
import { useSession } from "next-auth/react";
import LoggedInUser from "../ui/LoggedInUser";
export default function MobileNavbar() {
  const [openSideNav, updateOpenSideNav] = actionStore((state) => [
    state.openSideNav,
    state.updateOpenSideNav,
  ]);
  const session = useSession();

  return (
    <div
      className={`h-screen w-full fixed z-[100] bg-white top-0 ${
        openSideNav ? "left-0" : "left-[-100%]"
      } duration-300`}
    >
      <div className="flex justify-between items-center py-6 px-4">
        <IndividualLogo />
        <div className="lg:hidden block">
          <TfiClose onClick={() => updateOpenSideNav(false)} />
        </div>
      </div>
      <div className="my-4">
        <ul className="flex flex-col space-y-4 px-4">
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
          <NavbarLink disabled={false} text={"Editorials"} link={"/articles"} />
        </ul>
        <hr className="border-dark/20 my-4" />
        {session.status === "authenticated" &&
          session.data.user.role === "user" && (
            <div className="block sm:hidden">
              <LoggedInUser user={session.data!.user.name} />
            </div>
          )}
        {session.status === "unauthenticated" && (
          <div className=" block">
            <NavbarActionButtons />
          </div>
        )}
      </div>
    </div>
  );
}
