"use client";
import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Plan from "./Plan";
import { plan_details } from "./plan_details";
import PlanDurationTab from "./PlanDurationTab";

export default function PlanWrapper() {
  const [tab, setTab] = useState<"monthly" | "yearly">("monthly");
  return (
    <div>
      <PageTitle title="Pricing plans" />
      <div className="mt-10 text-center">
        <p className="text-base leading-4 text-[#858585] ">Choose your plan</p>
        <h1
          role="heading"
          className="text-xl font-bold leading-10 mt-3 text-dark"
        >
          Our pricing plans
        </h1>
        {/* <p
          role="contentinfo"
          className="text-xs leading-5 mt-5 text-[#858585] w-1/3"
        >
          We’re working on a suit of tools to make managing complex systems
          easier, for everyone for free. we can’t wait to hear what you think
        </p> */}
      </div>
      <PlanDurationTab tab={tab} setTab={setTab} />
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-center items-center gap-x-4">
        {plan_details.map((plan, index) => {
          return (
            <Plan
              key={index}
              name={plan.name}
              monthly_price={plan.monthly_price}
              yearly_price={plan.yearly_price}
              benefits={plan.benefits}
              tab={tab}
            />
          );
        })}
      </div>
    </div>
  );
}
