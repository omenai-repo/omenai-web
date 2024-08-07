"use client";
import React from "react";
import PageTitle from "../../../components/PageTitle";
import { CheckoutStepper } from "./components/CheckoutStepper";
import CheckoutItem from "./components/CheckoutItem";
import { getSinglePlanData } from "@/services/subscriptions/getSinglePlanData";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import Load from "@/components/loader/Load";
import { useSession } from "next-auth/react";

export default function SubscriptionCheckout() {
  const searchParams = useSearchParams();
  const plan_id = searchParams.get("plan_id");
  const interval = searchParams.get("interval");
  const router = useRouter();
  const session = useSession();

  if (session.data === undefined || session.data === null)
    router.replace("/auth/login");

  if (
    plan_id === null ||
    plan_id === undefined ||
    interval === null ||
    interval === undefined
  )
    return notFound();

  const { data: plan, isLoading } = useQuery({
    queryKey: ["get_single_plan_details"],
    queryFn: async () => {
      const plans = await getSinglePlanData(plan_id);

      if (!plans?.isOk) throw new Error("Something went wrong");
      else return plans.data;
    },
  });

  return (
    <div>
      <PageTitle title="Checkout" />

      {isLoading ? (
        <div className="h-[75vh] w-full grid place-items-center">
          <Load />
        </div>
      ) : (
        <>
          <div className="my-8 space-y-1">
            {/* <p className="text-[#858585] text-xs">
              Please fill in all information below to fully activate your
              subscription
            </p> */}
          </div>
          <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3 items-baseline">
            <div className="col-span-1">
              <CheckoutItem plan={plan} interval={interval} />
              <CheckoutStepper plan={plan} />
            </div>
            <div className="col-span-2" />
          </div>
        </>
      )}
    </div>
  );
}
