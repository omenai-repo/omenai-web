"use client";

import Link from "next/link";
import { GoHome } from "react-icons/go";

export default function NavbarActionButtons() {
  return (
    <div className="flex flex-row sm:space-x-4 space-x-2 w-fit text-[0.9rem] sm:text-[14px] ml-2">
      <Link
        href={"/auth/login/"}
        className="px-2 py-2 sm:px-5 flex items-center gap-x-2 rounded-sm font-normal hover:border-dark bg-white border border-dark/10 text-dark duration-200"
      >
        Login
        <GoHome className="text-dark" />
      </Link>

      <Link
        href={"/auth/register/individual"}
        className="px-2 py-2 sm:px-5 rounded-sm font-normal bg-dark hover:bg-dark/80 text-white ring-1 ring-dark/10 duration-200"
      >
        Create an account
      </Link>
    </div>
  );
}
