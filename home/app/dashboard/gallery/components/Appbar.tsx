"use client";

import DashboardIndicator from "./DashboardIndicator";
import { useSession } from "next-auth/react";

export default function Appbar() {
  const session = useSession();
  return (
    <>
      <div className="flex justify-between items-center w-full p-5 sticky top-0 z-10 bg-white ">
        <DashboardIndicator
          admin_name={session.data?.user.admin}
          gallery_name={session.data?.user.name}
          gallery_verified={session.data?.user.gallery_verified}
        />
      </div>
    </>
  );
}
