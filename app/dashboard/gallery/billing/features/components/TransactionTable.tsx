"use client";
import Load from "@/components/loader/Load";
import NotFoundData from "@/components/notFound/NotFoundData";
import { fetchSubscriptionTransactions } from "@/services/transactions/fetchSubscriptionTransactions";
import { formatIntlDateTime } from "@/utils/formatIntlDateTime";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function TransactionTable() {
  const { data: session } = useSession();
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["fetch_sub_trans"],
    queryFn: async () => {
      const trans = await fetchSubscriptionTransactions(session!.user.id);
      if (trans?.isOk) return trans.data;
      else throw new Error("Something went wrong");
    },
  });
  return (
    <div className="flex flex-col gap-y-4 w-full rounded-md overflow-y-scroll overflow-x-hidden text-xs p-5 ring-1 ring-[#e0e0e0]">
      <div className="flex justify-center">
        <h2 className="text-base font-bold">Transaction History</h2>
      </div>
      {isLoading ? (
        <div className="w-full h-full grid place-items-center">
          <Load />
        </div>
      ) : transactions.length > 0 ? (
        <div className="flex flex-col gap-y-5 mt-5">
          {transactions?.map((transaction: any) => {
            return (
              <div
                className="flex justify-between items-start"
                key={transaction.trans_id}
              >
                <div className="flex gap-x-2">
                  <Image
                    src={"/omenai_logo_cut.png"}
                    width={30}
                    height={30}
                    alt="Omenai logo cut"
                    className="w-fit h-fit"
                  />

                  <div>
                    <h2 className="font-bold text-xs">
                      {transaction.trans_id}
                    </h2>
                    <p className="text-[13px]">
                      {formatIntlDateTime(transaction.date)}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold">{transaction.amount}.00</h1>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="w-full h-full grid place-items-center justify-center
        "
        >
          <div>
            <NotFoundData />
            <p className="text-xs font-semibold">No transactions found</p>
          </div>
        </div>
      )}
    </div>
  );
}
