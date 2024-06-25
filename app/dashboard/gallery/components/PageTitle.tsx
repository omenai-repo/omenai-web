"use client";

import { usePathname } from "next/navigation";
import { IoMdArrowDropright } from "react-icons/io";

export default function PageTitle({ title }: { title: string }) {
  const navigation = usePathname();
  const pathnames = navigation.slice(1).split("/");

  const breadcrumbs = pathnames.map((pathSegment, index, pathSegments) => {
    // Capitalize the first letter of each path segment
    const capitalizedSegment =
      pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);

    // Construct the breadcrumb link (adjust href as needed)
    const link = `/${pathSegments.slice(0, index + 1).join("/")}`;

    // Render breadcrumb item - conditionally add separator (>)
    return (
      <p key={link} className="flex items-center gap-x-1 text-xs">
        {index !== 0 && index < pathSegments.length && (
          <IoMdArrowDropright className="ml-3" />
        )}
        {capitalizedSegment === "Dashboard" ||
        capitalizedSegment === "Gallery" ? (
          <p>{capitalizedSegment}</p>
        ) : (
          <a
            href={link}
            className={`${
              index === pathSegments.length - 1 && "text-green-600 font-bold"
            }`}
          >
            {capitalizedSegment}
          </a>
        )}
      </p>
    );
  });

  return (
    <div className="w-full flex flex-col gap-y-1 mt-5 mb-12">
      <h1 className="font-light text-md">{title}</h1>
      <p className="text-base flex">{breadcrumbs}</p>
    </div>
  );
}
