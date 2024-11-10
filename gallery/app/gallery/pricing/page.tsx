"use client";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { getApiUrl } from "@/config";
import Load from "@/components/loader/Load";
import PlanWrapper from "./PlanWrapper";
import { useSession } from "next-auth/react";
import { getAllPlanData } from "@/services/subscriptions/getAllPlanData";
import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";

export default function Plans() {
  const { data: session } = useSession();
  const router = useRouter();
  const url = getApiUrl();
  // if (session === null || session === undefined) router.replace("/auth/login");
  const { data, isLoading } = useQuery({
    queryKey: ["get_all_plan_details"],
    queryFn: async () => {
      const plans = await getAllPlanData();

      if (!plans?.isOk) throw new Error("Something went wrong");
      else return { plans: plans.data };
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {isLoading ? (
        <div className="h-[75vh] w-full grid place-items-center">
          <Load />
        </div>
      ) : (
        <>
          <DesktopNavbar />
          <div className="mt-10 text-center">
            <h1
              role="heading"
              className="text-xl font-bold leading-10 mt-3 text-dark"
            >
              Our pricing plans
            </h1>
          </div>
          <PlanWrapper plans={data?.plans} />
        </>
      )}
    </div>
  );
}
