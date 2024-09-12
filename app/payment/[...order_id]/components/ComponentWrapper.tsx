"use client";
import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { useState } from "react";
import { useSearchParams, notFound } from "next/navigation";

import Load from "@/components/loader/Load";
import OrderDetails from "./OrderDetails";
import { checkLockStatus } from "@/services/orders/checkLockStatus";
import { getSingleOrder } from "@/services/orders/getSingleOrder";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
export default function ComponentWrapper({
  order_id,
  session,
  isLoggedIn,
}: {
  order_id: string;
  session: Session | null;
  isLoggedIn: boolean;
}) {
  const searchParams = useSearchParams();
  const user_id_key = searchParams.get("id_key");

  const { data, isLoading } = useQuery({
    queryKey: ["load_order_purchase_data"],
    queryFn: async () => {
      const data = await getSingleOrder(order_id);

      if (data?.isOk) {
        const lock_status = await checkLockStatus(
          data.data.artwork_data.art_id,
          session!.user.id
        );

        return { order: data.data, locked: lock_status?.data.locked };
      } else {
        throw new Error("Uh oh! Something went wrong!");
      }
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] grid place-items-center">
        <Load />
      </div>
    );
  }
  if (data!.order.buyer.user_id !== user_id_key) notFound();

  if (data!.order === null) throw new Error("Something went wrong");
  if (
    data!.order.payment_information.status === "completed" ||
    data!.order.order_accepted.status === "" ||
    data!.order.order_accepted.status === "declined"
  )
    notFound();
  if (!data!.order.availabiity) {
    return (
      <div className="w-full h-full grid place-items-center">
        <p className="text-xs font-semibold">
          Unfortunately, this artwork has been purchased by another customer
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      {isLoggedIn ? (
        <>
          <DesktopNavbar />
          <div className="">
            <OrderDetails order={data!.order} lock_status={data!.locked} />
          </div>
        </>
      ) : (
        <div className="w-full h-screen grid place-items-center">
          <Load />
        </div>
      )}
    </div>
  );
}
