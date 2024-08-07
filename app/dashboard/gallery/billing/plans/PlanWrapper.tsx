"use client";
import React, { useState } from "react";
import Plan from "./Plan";
import PlanDurationTab from "./PlanDurationTab";

export default function PlanWrapper({
  plans,
}: {
  plans: SubscriptionPlanDataTypes[];
}) {
  const [tab, setTab] = useState<"monthly" | "yearly">("monthly");

  return (
    <div>
      <PlanDurationTab tab={tab} setTab={setTab} />
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-center items-center gap-x-4">
        {plans.map((plan: SubscriptionPlanDataTypes) => {
          return (
            <Plan
              key={plan.name}
              name={plan.name}
              pricing={plan.pricing}
              benefits={plan.benefits}
              tab={tab}
              plan_id={plan.plan_id}
              currency={plan.currency}
            />
          );
        })}
      </div>
    </div>
  );
}
