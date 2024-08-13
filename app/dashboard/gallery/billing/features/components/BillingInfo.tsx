"use client";
import { useSession } from "next-auth/react";
import { formatISODate } from "@/utils/formatISODate";

export default function BillingInfo({
  sub_start,
  sub_end,
}: {
  sub_start: string;
  sub_end: string;
}) {
  const session = useSession();
  return (
    <div className="p-4 border border-dark/20 rounded-lg w-full h-[200px]">
      <h4 className="text-dark text-base font-medium mb-5">
        Billing information
      </h4>
      <div className="flex flex-col gap-2 text-xs">
        {/* <h4 className="text-sm">{session.data?.user.name}</h4> */}
        <p>
          Gallery name:{" "}
          <span className="font-medium">{session.data?.user.name}</span>{" "}
        </p>
        <p>
          Email address:{" "}
          <span className="font-medium">{session.data?.user.email}</span>{" "}
        </p>
      </div>
    </div>
  );
}
