"use client";
import { useQuery } from "@tanstack/react-query";
import ComponentWrapper from "./components/ComponentWrapper";
import { getSingleOrder } from "@/services/orders/getSingleOrder";
import Load from "@/components/loader/Load";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { checkLockStatus } from "@/services/orders/checkLockStatus";

export default function OrderPayment({
  params,
}: {
  params: { order_id: string };
}) {
  const session = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["load_order_purchase_data"],
    queryFn: async () => {
      const data = await getSingleOrder(params.order_id);

      if (data?.isOk) {
        const lock_status = await checkLockStatus(
          data.data.artwork_data.art_id,
          session.data!.user.id
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
  if (data!.order === null) throw new Error("Something went wrong");
  if (
    data!.order.payment_information.status === "completed" ||
    data!.order.order_accepted.status === "" ||
    data!.order.order_accepted.status === "declined"
  )
    notFound();
  return <ComponentWrapper order={data!.order} lock_status={data!.locked} />;
}
