"use client";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
export default function NoSubscriptionTheme() {
  return (
    <div className=" w-full h-[78vh] grid place-items-center">
      <div className="flex justify-center items-center flex-col gap-3">
        <h5>No subscriptions plans are active</h5>
        <Link href={"/dashboard/gallery/billing/plans"} className="">
          <button className=" h-[40px] px-4 rounded-sm w-fit text-xs bg-dark flex gap-2 items-center">
            <span className="text-white">Create a subscription</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
