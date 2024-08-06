"use client";
import { actionStore } from "@/store/actions/ActionStore";
import Link from "next/link";
import { CiLock } from "react-icons/ci";

type NavbarLinkProps = {
  disabled: boolean;
  text: string;
  link: string;
  onClick?: () => void;
};
export default function NavbarLink({
  disabled,
  text,
  link,
  onClick,
}: NavbarLinkProps) {
  const [updateOpenSideNav] = actionStore((state) => [state.updateOpenSideNav]);

  return (
    <>
      {disabled ? (
        <>
          <li className="relative text-xs text-dark/40 font-medium">
            <p className="cursor-not-allowed whitespace-nowrap" aria-disabled>
              {text}
            </p>
            <CiLock className="absolute right-[-15px] top-[-5px]" />
          </li>
        </>
      ) : (
        <li className="text-xs w-fit text-black whitespace-nowrap font-medium flex flex-col group">
          <Link href={link} onClick={() => updateOpenSideNav(false)}>
            {text}
          </Link>
          <div className="h-1 bg-dark w-0 group-hover:w-full duration-300" />
        </li>
      )}
    </>
  );
}
