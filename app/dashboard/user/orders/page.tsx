"use client";
import { useQuery } from "@tanstack/react-query";
import OrdersGroup from "./components/OrdersGroup";
import { getOrdersForUser } from "@/services/orders/getOrdersForUser";
import Load from "@/components/loader/Load";

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["user_orders_pafe"],
    queryFn: async () => {
      const orders = await getOrdersForUser();

      if (!orders?.isOk) throw new Error("Something went wrong");
      else return orders.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[50vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }
  return (
    <>
      <OrdersGroup orders={orders} />
    </>
  );
}
