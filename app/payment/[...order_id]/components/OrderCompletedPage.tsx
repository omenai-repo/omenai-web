import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function OrderCompletedPage() {
  return (
    <div className="w-full h-[95vh] grid place-items-center">
      <div className="p-6 grid place-items-center space-y-4">
        <p className="text-base">This order has been completed successfuly</p>
        <Image
          height={100}
          width={100}
          src={"/images/done.png"}
          alt="success-icon"
        />

        <Link
          href={"/"}
          className="grid place-items-center h-[50px] px-4 w-full bg-black text-white cursor-pointer mt-[50px]"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
