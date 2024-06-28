"use client";
import { Suspense, useState } from "react";
import Loader from "../../components/Loader";
import OrderHistory from "./ProcessingOrders";
import PendingOrders from "./PendingOrders";
import OrdersTab from "./OrdersTab";
import { ObjectId } from "mongoose";
import { useQuery } from "@tanstack/react-query";
import { getOverviewOrders } from "@/services/orders/getOverviewOrders";
import { LoadSmall } from "@/components/loader/Load";
import ProcessingOrders from "./ProcessingOrders";
import CompletedOrders from "./CompletedOrders";
import Load from "@/components/loader/Load";

export default function OrdersGroup() {
  const [tab, setTab] = useState("pending");
  const { data: orders, isLoading } = useQuery({
    queryKey: ["fetch_orders_by_category"],
    queryFn: async () => {
      const orders = await getOverviewOrders();
      if (orders!.isOk) {
        return orders!.data;
      } else {
        return [];
      }
    },
  });

  if (isLoading)
    return (
      <div className="h-[75vh] grid place-items-center">
        <Load />
      </div>
    );

  const pending_orders = orders.filter(
    (
      order: CreateOrderModelTypes & {
        createdAt: string;
        updatedAt: string;
        _id: ObjectId;
      }
    ) => order.order_accepted.status === ""
  );
  const processing_orders = orders.filter(
    (
      order: CreateOrderModelTypes & {
        createdAt: string;
        updatedAt: string;
        _id: ObjectId;
      }
    ) => order.order_accepted.status === "accepted" && !order.delivery_confirmed
  );

  const completed_orders = orders.filter(
    (
      order: CreateOrderModelTypes & {
        createdAt: string;
        updatedAt: string;
        _id: ObjectId;
      }
    ) => order.status === "completed"
  );
  return (
    <>
      <div className="w-full my-5">
        <OrdersTab tab={tab} setTab={setTab} />
      </div>
      <div className="w-full h-full grid place-items-center ">
        {tab === "pending" && (
          <Suspense fallback={<Load />}>
            <PendingOrders orders={pending_orders} />
          </Suspense>
        )}
        {tab === "processing" && (
          <Suspense fallback={<Load />}>
            <ProcessingOrders orders={processing_orders} />
          </Suspense>
        )}
        {tab === "completed" && (
          <Suspense fallback={<Load />}>
            <CompletedOrders orders={completed_orders} />
          </Suspense>
        )}
      </div>
    </>
  );
}
