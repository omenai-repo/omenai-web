"use client";
import { Suspense, useState } from "react";
import PendingOrders from "./PendingOrders";
import OrdersTab from "./OrdersTab";
import { ObjectId } from "mongoose";
import Load from "@/components/loader/Load";

export default function OrdersGroup({
  orders,
}: {
  orders: CreateOrderModelTypes[] & {
    createdAt: string;
    updatedAt: string;
    _id: ObjectId;
  };
}) {
  const [tab, setTab] = useState("pending");

  return (
    <>
      <div className="w-full p-10 grid place-items-center">
        {/* <OrdersTab tab={tab} setTab={setTab} />
      </div>
      <div className="w-full h-full grid place-items-center container">
        {tab === "pending" ? (
          <Suspense fallback={<Load />}>
            <PendingOrders orders={orders} />
          </Suspense>
        ) : (
          <Suspense fallback={<Load />}>
            <OrderHistory orders={orders} />
          </Suspense>
        )} */}
        <p>ello</p>
      </div>
    </>
  );
}
