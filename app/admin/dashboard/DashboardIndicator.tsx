"use client";

import { usePathname } from "next/navigation";
export default function DashboardIndicator() {
  const pathname = usePathname().split("/");
  const lastPath = pathname.at(-1);
  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-xs">
        <p className="font-normal text-dark">Welcome, Admin</p>
        <p className="text-dark">
          <span className="font-light">Admin</span> /{" "}
          <span className="font-normal capitalize text-primary">
            {lastPath}
          </span>
        </p>
      </div>
    </div>
  );
}