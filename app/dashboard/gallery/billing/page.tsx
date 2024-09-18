"use client";
import NoSubscriptionTheme from "./features/NoSubscriptionTheme";
import SubscriptionActiveTheme from "./features/SubscriptionActiveTheme";
import PageTitle from "../components/PageTitle";

import { getApiUrl } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Load from "@/components/loader/Load";
import { checkIsStripeOnboarded } from "@/services/stripe/checkIsStripeOnboarded";
import { getAccountId } from "@/services/stripe/getAccountId";
import { retrieveSubscriptionData } from "@/services/subscriptions/retrieveSubscriptionData";
import { handleError } from "@/utils/handleQueryError";
import NoVerificationBlock from "../components/NoVerificationBlock";
export default function Subscription() {
  const router = useRouter();
  const url = getApiUrl();
  const { data: session } = useSession();
  if (session === null || !session?.user) router.replace("/auth/login");

  const { data: isConfirmed, isLoading } = useQuery({
    queryKey: ["subscription_precheck"],
    queryFn: async () => {
      try {
        if (!session?.user) throw new Error("User not authenticated");

        // Fetch account ID first, as it's required for the next call
        const acc = await getAccountId(session.user.email);
        if (!acc?.isOk)
          throw new Error("Something went wrong, Please refresh the page");

        // Start retrieving subscription data while fetching Stripe onboarding status
        const [response, sub_check] = await Promise.all([
          checkIsStripeOnboarded(acc.data.connected_account_id), // Dependent on account ID
          retrieveSubscriptionData(session.user.id), // Independent
        ]);

        if (!response?.isOk || !sub_check?.isOk) {
          throw new Error("Something went wrong, Please refresh the page");
        }

        return {
          isSubmitted: response.details_submitted,
          id: acc.data.connected_account_id,
          isSubActive:
            sub_check?.data?.status === "active" ||
            sub_check?.data?.status === "canceled",
          subscription_data: sub_check.data,
        };
      } catch (error) {
        console.error(error);
        handleError();
      }
    },
    refetchOnWindowFocus: false,
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

      {isConfirmed?.isSubActive ? (
        <SubscriptionActiveTheme
          subscription_data={isConfirmed.subscription_data}
        />
      ) : (
        <NoSubscriptionTheme />
      )}
    </div>
  );
}
