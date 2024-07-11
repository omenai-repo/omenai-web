"use client";
import { useQuery } from "@tanstack/react-query";
import ComponentWrapper from "./components/ComponentWrapper";
import { getSingleOrder } from "@/services/orders/getSingleOrder";
import Load from "@/components/loader/Load";
import { notFound } from "next/navigation";

export default function OrderPayment({
  params,
}: {
  params: { order_id: string };
}) {
  const { data: order, isLoading } = useQuery({
    queryKey: ["load_order_purchase_data"],
    queryFn: async () => {
      const data = await getSingleOrder(params.order_id);
      if (data?.isOk) {
        return data.data;
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
  if (order === null) throw new Error("Something went wrong");
  if (
    order.payment_information.status === "completed" ||
    order.order_accepted.status === "" ||
    order.order_accepted.status === "declined"
  )
    notFound();
  return <ComponentWrapper order={order} />;
}
