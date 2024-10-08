import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  theme?: "light" | "dark";
};
export const GalleryLogo = ({ className, theme = "dark" }: LogoProps) => {
  return (
    <>
      <Link
        href={"/"}
        className="flex flex-col xxs:flex-row xxs:gap-1 items-end relative"
      >
        <Image
          src={"/omenai_logo.png"}
          alt="omenai logo"
          width={130}
          height={50}
          priority={true}
        />
        <span
          className={`font-normal text-xs relative xxs:top-1 ${
            theme === "light" ? "text-white" : "text-black"
          } ${className}`}
        >
          For Galleries
        </span>
      </Link>
    </>
  );
};
export const AdminLogo = ({ className, theme = "dark" }: LogoProps) => {
  return (
    <>
      <Link
        href={"/"}
        className="flex flex-col xxs:flex-row xxs:gap-1 items-end relative"
      >
        <Image
          src={"/omenai_logo.png"}
          alt="omenai logo"
          width={130}
          height={50}
          priority={true}
        />
        <span
          className={`font-normal text-xs relative xxs:top-1 ${
            theme === "light" ? "text-white" : "text-black"
          } ${className}`}
        >
          Admin
        </span>
      </Link>
    </>
  );
};

export const IndividualLogo = ({ className }: LogoProps) => {
  return (
    <>
      <Link href={"/"} className={`flex gap-1 items-end ${className}`}>
        <Image
          src={"/omenai_logo.png"}
          alt="omenai logo"
          width={130}
          height={50}
          priority={true}
        />
      </Link>
    </>
  );
};
