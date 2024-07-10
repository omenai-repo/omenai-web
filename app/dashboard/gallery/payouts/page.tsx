"use client";
import { useSession } from "next-auth/react";
import PageTitle from "../components/PageTitle";
import PayoutDashboard from "./components/PayoutDashboard";
import NoVerificationBlock from "../components/NoVerificationBlock";

export default function Payouts() {
  const session = useSession();
  return (
    <div>
      <PageTitle title="Payout with Stripe" />
      {!session?.data?.user.gallery_verified ? (
        <NoVerificationBlock />
      ) : (
        <PayoutDashboard />
      )}
    </div>
  );
}
