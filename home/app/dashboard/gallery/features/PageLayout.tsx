"use client";
import { IndividualLogo } from "@shared/components/logo/Logo";
import { BsArrowLeftShort } from "react-icons/bs";
import { navMockData } from "../navigations/NavigationMockData";
import NavigationItem from "../components/NavigationItem";
import { galleryNavigationActions } from "@shared/store/gallery/gallery_navigation/GalleryNavigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function PageLayout() {
  function handleSignout() {
    signOut({ callbackUrl: "/auth/login/" });
    toast.success("Operation successful", {
      description: "Successfully signed out...redirecting",
      style: {
        background: "green",
        color: "white",
      },
      className: "class",
    });
  }

  return (
    <div
      className={` h-screen hidden fixed left-0 top-0 sm:block xl:w-72 md:w-56`}
      id="navigation-items"
    >
      <div className="flex flex-col p-5">
        <div className={` py-5 w-full`}>
          <IndividualLogo />
        </div>

        {/* Nav items */}
        <div className="flex flex-col mt-6 w-full gap-y-8">
          {/* General navigation */}
          <div className="w-full">
            <ul className="flex flex-col gap-y-1 w-full">
              {navMockData.general.map((item, index) => {
                return (
                  <NavigationItem
                    title={item.title}
                    icon={item.icon}
                    key={item.title}
                    url={item.url}
                    mobile={false}
                  />
                );
              })}
            </ul>
          </div>
          {/* Account pages */}
          <div>
            <ul className="flex flex-col gap-y-1">
              {navMockData.account.map((item, index) => {
                return (
                  <NavigationItem
                    title={item.title}
                    icon={item.icon}
                    key={item.title}
                    url={item.url}
                    mobile={false}
                    onClick={() => item.title === "Sign out" && handleSignout()}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        {/* Help box */}
      </div>

      {/* Nav logo */}
    </div>
  );
}
