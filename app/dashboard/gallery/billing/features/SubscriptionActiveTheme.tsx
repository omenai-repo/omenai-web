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
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

export default function SubscriptionActiveTheme({
  subscription_data,
}: {
  subscription_data: any;
}) {
  const session = useSession();
  const router = useRouter();

  if (session.data === null) router.replace("/auth/login");
  const url = getApiUrl();

  const [trans_id, set_trans_id] = useLocalStorage("flw_trans_id", "");

  useEffect(() => {
    set_trans_id("");
  }, []);

  return (
    <div className="w-full h-full grid 2xl:grid-cols-3 grid-cols-2 gap-4 my-5">
      {/* Card */}
      <div className="flex flex-col gap-4 items-start col-span-1 2xl:col-span-2">
        <div className="grid 2xl:grid-cols-2 items-center gap-3 w-full">
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

        <div className="grid 2xl:grid-cols-2 items-center gap-3 w-full">
          <UpcomingSub
            start_date={subscription_data.start_date}
            sub_status={subscription_data.status}
            plan_details={subscription_data.plan_details}
            end_date={subscription_data.expiry_date}
            payment={subscription_data.payment}
          />

          <BillingInfo />
        </div>

        <CancelSubscriptionModal
          sub_end={subscription_data.expiry_date}
          id={subscription_data.customer}
        />
      </div>

      <div className="col-span-1">
        <TransactionTable />
      </div>
    </div>
  );
}
