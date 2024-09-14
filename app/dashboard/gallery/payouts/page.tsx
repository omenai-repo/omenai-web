"use client";
import { useSession } from "next-auth/react";
import PageTitle from "../components/PageTitle";
import PayoutDashboard from "./components/PayoutDashboard";
import NoVerificationBlock from "../components/NoVerificationBlock";
import { useRouter } from "next/navigation";

export default function Payouts() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session === null || !session?.user) router.replace("/auth/login");
  return (
    <div>
      <PageTitle title="Payout with Stripe" />
      {!session?.user.gallery_verified ? (
        <NoVerificationBlock
          gallery_name={session !== null ? session.user.name : ""}
        />
      ) : (
        <PayoutDashboard />
      )}
    </div>
  );
}
