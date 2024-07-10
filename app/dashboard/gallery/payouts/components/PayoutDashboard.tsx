"use client";

import Load from "@/components/loader/Load";
import { checkIsStripeOnboarded } from "@/services/stripe/checkIsStripeOnboarded";
import { getAccountId } from "@/services/stripe/getAccountId";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PayoutDashBoardContent from "./PayoutDashBoardContent";
import { retrieveBalance } from "@/services/stripe/retrieveBalance";

export default function PayoutDashboard() {
  const session = useSession();
  const router = useRouter();
  const { data: isConfirmed, isLoading } = useQuery({
    queryKey: ["check_stripe_onboarded"],
    queryFn: async () => {
      const acc = await getAccountId(session.data!.user.email);
      if (!acc?.isOk) {
        toast.error("Something went wrong, Please refresh the page");
      }
      const balance = await retrieveBalance(acc!.data.connected_account_id);
      if (!balance?.isOk) {
        toast.error("Something went wrong, Please refresh the page");
      }
      const response = await checkIsStripeOnboarded(
        acc!.data.connected_account_id
      );

      if (response?.isOk) {
        return {
          isSubmitted: response.details_submitted,
          id: acc?.data.connected_account_id,
          balance: balance?.data,
        };
      } else {
        toast.error("Something went wrong. Please refresh the page");
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

  if (!isConfirmed!.isSubmitted)
    router.replace(`/dashboard/gallery/payouts/refresh?id=${isConfirmed!.id}`);
  return (
    <div>
      {!isConfirmed?.isSubmitted ? (
        <div className="h-[85vh] w-full grid place-items-center">
          <div className="flex flex-col space-y-1">
            <Load />
            <p className="text-[14px] font-semibold">
              Redirecting...Please wait
            </p>
          </div>
        </div>
      ) : (
        <div className="my-10">
          <PayoutDashBoardContent
            account={isConfirmed.id}
            balance={isConfirmed.balance}
          />
        </div>
      )}
    </div>
  );
}
