"use client";
import NoSubscriptionTheme from "./features/NoSubscriptionTheme";
import SubscriptionActiveTheme from "./features/SubscriptionActiveTheme";
import PageTitle from "../components/PageTitle";

import { getApiUrl } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Load from "@/components/loader/Load";
export default function Subscription() {
  const { data: session } = useSession();
  const router = useRouter();
  const url = getApiUrl();

  if (!session) router.replace("/auth/login");
  const { data: subscription_data, isLoading } = useQuery({
    queryKey: ["get_sub_data"],
    queryFn: async () => {
      const res = await fetch(`${url}/api/subscriptions/retrieveSubData`, {
        method: "POST",
        body: JSON.stringify({ gallery_id: session!.user.id }),
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
    <div className="w-full h-full relative">
      <PageTitle title="Subscriptions & Billing" />
      {subscription_data !== null ? (
        <SubscriptionActiveTheme subscription_data={subscription_data} />
      ) : (
        <NoSubscriptionTheme />
      )}
    </div>
  );
}
