"use client";
import PageTitle from "../../components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { getAllPlanData } from "@/services/subscriptions/getAllPlanData";
import Load from "@/components/loader/Load";
import PlanWrapper from "./PlanWrapper";
import { useSession } from "next-auth/react";
import { retrieveSubscriptionData } from "@/services/subscriptions/retrieveSubscriptionData";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/config";

export default function Plans() {
  const { data: session } = useSession();
  const router = useRouter();
  const url = getApiUrl();
  if (session === null || session === undefined) router.replace("/auth/login");
  const { data, isLoading } = useQuery({
    queryKey: ["get_all_plan_details"],
    queryFn: async () => {
      const plans = await getAllPlanData();
      const res = await fetch(`${url}/api/subscriptions/retrieveSubData`, {
        method: "POST",
        body: JSON.stringify({ gallery_id: session!.user.id }),
      });

      const result = await res.json();
      if (!plans?.isOk || !res?.ok) throw new Error("Something went wrong");
      else return { plans: plans.data, sub: result.data };
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
          <PlanWrapper plans={data?.plans} sub_data={data?.sub} />
        </>
      )}
    </div>
  );
}
