"use client";

import { CiMenuFries } from "react-icons/ci";
import DashboardIndicator from "./DashboardIndicator";
import { editorialAdminStore } from "../store/EditorialAdminStore";
import IconWrapper from "home/app/admin/dashboard/IconWrapper";

export default function Appbar() {
  const [openMobileNav, setOpenMobileNav] = editorialAdminStore((state) => [
    state.openMobileNav,
    state.setOpenMobileNav,
  ]);
  return (
    <>
      <div className="flex justify-between items-center w-full px-5 rounded-md sticky top-0 z-10 bg-white py-5 border-b border-dark/10 ">
        <DashboardIndicator />
        <IconWrapper
          onClick={() => setOpenMobileNav()}
          className={`${openMobileNav ? "hidden" : "false"} block md:hidden`}
        >
          <CiMenuFries />
        </IconWrapper>
      </div>
    </>
  );
}
