"use client";
import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { getAllPlanData } from "@/services/subscriptions/getAllPlanData";
import Load from "@/components/loader/Load";
import PlanWrapper from "./PlanWrapper";

export default function Plans() {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["get_all_plan_details"],
    queryFn: async () => {
      const plans = await getAllPlanData();
      if (!plans?.isOk) throw new Error("Something went wrong");
      else return plans.data;
    },
  });

  return (
    <div>
      <PageTitle title="Pricing plans" />
      {isLoading ? (
        <div className="h-[75vh] w-full grid place-items-center">
          <Load />
        </div>
      ) : (
        <>
          <div className="mt-10 text-center">
            <p className="text-base leading-4 text-[#858585] ">
              Choose your plan
            </p>
            <h1
              role="heading"
              className="text-xl font-bold leading-10 mt-3 text-dark"
            >
              Our pricing plans
            </h1>
          </div>
          <PlanWrapper plans={plans} />
        </>
      )}
    </div>
  );
}
