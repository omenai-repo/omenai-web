"use client";
import { useQuery } from "@tanstack/react-query";
import BillingCard from "./components/BillingCard";
import BillingInfo from "./components/BillingInfo";
import CancelSubscriptionModal from "./components/CancelSubscriptionModal";
import SubscriptionStatus from "./components/SubscriptionStatus";
import { useSession } from "next-auth/react";
import Load from "@/components/loader/Load";
import { retrieveSubscriptionData } from "@/services/subscriptions/retrieveSubscriptionData";
import { getApiUrl } from "@/config";
import { useRouter } from "next/navigation";
import TransactionTable from "./components/TransactionTable";
import SubDetail from "./components/SubscriptionStatus";
import UpcomingSub from "./components/UpcomingSub";
import { fetchSubscriptionTransactions } from "@/services/transactions/fetchSubscriptionTransactions";

export default function SubscriptionActiveTheme() {
  const session = useSession();
  const router = useRouter();
  if (session.data === null) router.replace("/auth/login");
  const url = getApiUrl();

  const { data: subscription_data, isLoading } = useQuery({
    queryKey: ["get_sub_data"],
    queryFn: async () => {
      const res = await fetch(`${url}/api/subscriptions/retrieveSubData`, {
        method: "POST",
        body: JSON.stringify({ gallery_id: session.data!.user.id }),
      });

      const result = await res.json();

      if (res?.ok) {
        return result.data;
      } else {
        throw new Error("Something went wrong");
      }
    },
  });

  if (isLoading) {
    return (
      <div className="h-[85vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }

  return (
    <div className="w-full h-full grid grid-cols-2 gap-x-4 my-5">
      {/* Card */}
      <div className="flex flex-col gap-4 items-start">
        <div className="grid grid-cols-2 items-center gap-x-3 w-full">
          <div className="flex flex-col gap-y-2">
            <BillingCard
              expiry={subscription_data.card.expiry}
              first_6digits={subscription_data.card.first_6digits}
              last_4digits={subscription_data.card.last_4digits}
              type={subscription_data.card.type}
            />
          </div>

          <SubDetail
            sub_status={subscription_data.status}
            plan_details={subscription_data.plan_details}
            end_date={subscription_data.expiry_date}
            payment={subscription_data.payment}
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-x-3 w-full">
          <UpcomingSub
            start_date={subscription_data.start_date}
            sub_status={subscription_data.status}
            plan_details={subscription_data.plan_details}
            end_date={subscription_data.expiry_date}
            payment={subscription_data.payment}
          />

          <BillingInfo
            sub_start={subscription_data.start_date}
            sub_end={subscription_data.expiry_date}
          />
        </div>

        <CancelSubscriptionModal
          sub_end={subscription_data.expiry_date}
          id={subscription_data.customer}
        />
      </div>
      <TransactionTable />
    </div>
  );
}
