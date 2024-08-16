"use client";
import { useSession } from "next-auth/react";

export default function BillingInfo() {
  const session = useSession();
  return (
    <div className="p-8 border border-dark/20 rounded-lg w-full h-[250px]">
      <p className="text-dark text-xs font-semibold">Billing Info</p>

      <div className="flex flex-col gap-2 text-xs mt-5">
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
