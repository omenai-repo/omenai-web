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

export default function SubscriptionActiveTheme() {
  const session = useSession();
  const router = useRouter();
  if (session.data === null) router.replace("/auth/login");
  const url = getApiUrl();

  const { data: subscription_data, isLoading } = useQuery({
    queryKey: ["get_sub_data"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/api/subscriptions/retrieveSubData`,
        {
          method: "POST",
          body: JSON.stringify({ gallery_id: session.data!.user.id }),
        }
      );

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
    <div className="w-full h-full">
      {/* Card */}
      <div className="flex lg:flex-row flex-col gap-4 items-start">
        <BillingCard
          expiry={subscription_data.card.expiry}
          first_6digits={subscription_data.card.first_6digits}
          last_4digits={subscription_data.card.last_4digits}
          type={subscription_data.card.type}
        />
        <BillingInfo
          sub_start={subscription_data.sub_start_date}
          sub_end={subscription_data.sub_expiry_date}
        />
      </div>
      <SubscriptionStatus sub_status={subscription_data.status} />
      <CancelSubscriptionModal
        sub_end={subscription_data.sub_expiry_date}
        id={subscription_data.customer}
      />
    </div>
  );
}
