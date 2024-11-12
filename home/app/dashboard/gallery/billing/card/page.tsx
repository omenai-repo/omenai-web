"use client";
import React from "react";

import { notFound, useSearchParams, useRouter } from "next/navigation";
import Load from "@shared/components/loader/Load";
import { useSession } from "next-auth/react";
import PageTitle from "../../components/PageTitle";
import CardChangeCheckoutItem from "../plans/checkout/components/CardChangeCheckoutItem";
import { CheckoutStepper } from "../plans/checkout/components/CheckoutStepper";

export default function SubscriptionCheckout() {
  const searchParams = useSearchParams();

  const charge_type = searchParams.get("charge_type");
  const router = useRouter();
  const session = useSession();

  if (session.data === undefined || session.data === null)
    router.replace("/auth/login");

  if (charge_type === null || charge_type === undefined) return notFound();

  //   const { data, isLoading } = useQuery({
  //     queryKey: ["get_plan_and_sub_details"],
  //     queryFn: async () => {
  //       const plans = await getSinglePlanData(plan_id);

  //       if (!plans?.isOk) throw new Error("Something went wrong");
  //       else return { plans: plans.data };
  //     },
  //   });

  return (
    <div>
      <PageTitle title="Change card" />

      {false ? (
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
              <CardChangeCheckoutItem />

              <CheckoutStepper />
            </div>

            <div className="col-span-2" />
          </div>
        </>
      )}
    </div>
  );
}
