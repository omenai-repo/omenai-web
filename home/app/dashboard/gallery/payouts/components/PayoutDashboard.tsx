"use client";

import Load from "@shared/components/loader/Load";
import { checkIsStripeOnboarded } from "@shared/services/stripe/checkIsStripeOnboarded";
import { getAccountId } from "@shared/services/stripe/getAccountId";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PayoutDashBoardContent from "./PayoutDashBoardContent";
import { retrieveBalance } from "@shared/services/stripe/retrieveBalance";
import { TransactionTable } from "./TransactionTable";
import { fetchTransactions } from "@shared/services/transactions/fetchTransactions";

export default function PayoutDashboard() {
  const session = useSession();
  const router = useRouter();
  if (session.data === null || session.data === undefined)
    router.replace("/auth/login");

  const { data: isConfirmed, isLoading } = useQuery({
    queryKey: ["fetch_payout_dataset"],
    queryFn: async () => {
      try {
        // Ensure session data exists
        if (!session.data?.user) throw new Error("User not authenticated");

        const acc = await getAccountId(session.data.user.email);
        if (!acc?.isOk) throw new Error("Failed to fetch account ID");

        const connectedAccountId = acc.data.connected_account_id;

        // Run independent async calls concurrently
        const [balance, table, response] = await Promise.all([
          retrieveBalance(connectedAccountId),
          fetchTransactions(session.data.user.id),
          checkIsStripeOnboarded(connectedAccountId),
        ]);

        console.log(balance, table, response);

        // Check if all results are okay
        if (!balance?.isOk || !table?.isOk || !response?.isOk) {
          throw new Error("Something went wrong, Please refresh the page");
        }

        // Return final data if all checks passed
        return {
          isSubmitted: response.details_submitted,
          id: connectedAccountId,
          balance: balance.data,
          table_data: table.data,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Something went wrong, Please refresh the page");
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="h-[78vh] w-full grid place-items-center">
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
          <div className="mt-6">
            <TransactionTable table={isConfirmed.table_data} />
          </div>
        </div>
      )}
    </div>
  );
}
