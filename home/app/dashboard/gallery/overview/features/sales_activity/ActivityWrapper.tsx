"use client";
import { SalesActivity } from "./components/SalesActivity";
import { getSalesActivityData } from "@shared/services/sales/getSalesActivityData";
import OverviewComponentCard from "../../components/OverviewComponentCard";
import { salesDataAlgorithm } from "@shared/utils/salesDataAlgorithm";
import { useQuery } from "@tanstack/react-query";
import Load from "@shared/components/loader/Load";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotFoundData from "@shared/components/notFound/NotFoundData";

export default function ActivityWrapper() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session || !session.user) router.replace("/auth/login");
  const { data: sales, isLoading } = useQuery({
    queryKey: ["get_overview_sales_activity"],
    queryFn: async () => {
      const data = await getSalesActivityData(session!.user.id);
      if (data?.isOk) {
        return data.data;
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="h-[40vh] grid place-items-center">
        <Load />
      </div>
    );

  const activityData = salesDataAlgorithm(sales);

  return (
    <>
      <OverviewComponentCard
        fullWidth={false}
        title={"Sales Revenue ($)"}
        id="tour-orders"
      >
        {sales.length === 0 ? (
          <div className="w-full h-full grid pb-10">
            <NotFoundData />
          </div>
        ) : (
          <SalesActivity activityData={activityData} />
        )}
      </OverviewComponentCard>
    </>
  );
}
