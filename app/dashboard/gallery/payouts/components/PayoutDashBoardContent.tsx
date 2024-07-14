"use client";
import { retrieveBalance } from "@/services/stripe/retrieveBalance";
import { useQuery } from "@tanstack/react-query";
import BalanceBox from "./BalanceBox";
import { TransactionTable } from "./TransactionTable";
import { useEffect, useState } from "react";

export default function PayoutDashBoardContent({
  account,
  balance,
}: {
  account: string;
  balance: any;
}) {
  return (
    <div>
      <BalanceBox account={account} balance={balance} />
    </div>
  );
}
