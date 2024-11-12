"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NoVerificationBlock from "../../components/NoVerificationBlock";
import { useQuery } from "@tanstack/react-query";
import { checkIsStripeOnboarded } from "@shared/services/stripe/checkIsStripeOnboarded";
import Load from "@shared/components/loader/Load";
import { useRouter } from "next/navigation";
export default function NoSubscriptionTheme() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["get_account_info"],
    queryFn: async () => {
      const response = await checkIsStripeOnboarded(
        session?.user.connected_account_id!
      );

      if (!response?.isOk) {
        throw new Error("Something went wrong");
      } else {
        return response.details_submitted;
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

  if (data === undefined) router.replace("/auth/login");
  if (!data) router.replace("/dashboard/gallery/payout/refresh");

  return (
    <div className=" w-full h-[78vh] grid place-items-center">
      {!session?.user.gallery_verified ? (
        <NoVerificationBlock
          gallery_name={session !== null ? session.user.name : ""}
        />
      ) : (
        <div className="flex justify-center items-center flex-col gap-3">
          <h5>No subscriptions plans are active</h5>
          <Link href={"/dashboard/gallery/billing/plans"} className="">
            <button className=" h-[40px] px-4 rounded-sm w-fit text-xs bg-dark flex gap-2 items-center">
              <span className="text-white">Create a subscription</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
