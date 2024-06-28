"use client";
import { galleryNavigationActions } from "@/store/gallery/gallery_navigation/GalleryNavigation";
import IconWrapper from "./IconWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "flowbite-react";

type ItemProps = {
  title: string;
  icon: React.ReactNode;
  url: string;
  mobile: boolean;
  onClick?: () => void;
};
export default function NavigationItem({
  title,
  icon,
  url,
  mobile,
  onClick,
}: ItemProps) {
  const [open] = galleryNavigationActions((state) => [state.open]);

  const pathname = usePathname();
  return (
    <>
      {title === "Sign out" ? (
        <li
          onClick={onClick}
          className={`p-2 group flex items-center w-full hover:bg-dark hover:text-white rounded-sm`}
        >
          <IconWrapper>{icon}</IconWrapper>
          <p className={`text-xs p-2 font-normal`}>{title}</p>
        </li>
      ) : (
        <Link
          onClick={onClick}
          href={url}
          className={`p-2 ${
            pathname.startsWith(url)
              ? "bg-dark text-white"
              : "bg-white text-dark"
          } group flex items-center w-full hover:bg-dark rounded-sm`}
        >
          <IconWrapper
            className={` ${pathname.startsWith(url) && "bg-white text-white"}`}
          >
            {icon}
          </IconWrapper>
          <p className={`text-xs p-2 font-normal group-hover:text-white`}>
            {title}
          </p>
        </Link>
      )}
    </>
  );
}
