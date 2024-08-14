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
import { retrieveSubscriptionData } from "@/services/subscriptions/retrieveSubscriptionData";
import MigrationUpgradeCheckoutItem from "./components/MigrationUpgradeCheckoutItem";
import CheckoutBillingCard from "./components/CheckoutBillingCard";

export default function SubscriptionCheckout() {
  const searchParams = useSearchParams();
  const plan_id = searchParams.get("plan_id");
  const interval = searchParams.get("interval");
  const id = searchParams.get("id");
  const action = searchParams.get("action");
  const router = useRouter();
  const session = useSession();

  if (session.data === undefined || session.data === null)
    router.replace("/auth/login");

  if (
    plan_id === null ||
    plan_id === undefined ||
    interval === null ||
    interval === undefined ||
    id === null ||
    id === undefined
  )
    return notFound();

  const { data, isLoading } = useQuery({
    queryKey: ["get_plan_and_sub_details"],
    queryFn: async () => {
      const plans = await getSinglePlanData(plan_id);
      const sub_data = await retrieveSubscriptionData(session.data!.user.id);

      if (!plans?.isOk || !sub_data?.isOk)
        throw new Error("Something went wrong");
      else return { plans: plans.data, sub_data: sub_data.data };
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
            {action === null && (
              <div className="col-span-1">
                <CheckoutItem plan={data?.plans} interval={interval} />
                <CheckoutStepper plan={data?.plans} />
              </div>
            )}
            <div className="col-span-2" />
          </div>
          <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-3 items-baseline">
            {action === "upgrade" ? (
              <div>
                <MigrationUpgradeCheckoutItem
                  plan={data?.plans}
                  interval={interval}
                  sub_data={data?.sub_data}
                />
                <CheckoutBillingCard
                  sub_data={data?.sub_data}
                  interval={interval}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="col-span-2" />
          </div>
        </>
      )}
    </div>
  );
}
