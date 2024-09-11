"use client";

import { useQuery } from "@tanstack/react-query";
import NoSubscriptionBlock from "../../components/NoSubscriptionBlock";
import NoVerificationBlock from "../../components/NoVerificationBlock";
import PageTitle from "../../components/PageTitle";
import UploadArtworkDetails from "./features/UploadArtworkDetails";
import { useSession } from "next-auth/react";
import { checkIsStripeOnboarded } from "@/services/stripe/checkIsStripeOnboarded";
import { useRouter } from "next/navigation";
import { getAccountId } from "@/services/stripe/getAccountId";
import Load from "@/components/loader/Load";

export default function UploadArtwork() {
  const session = useSession();
  const router = useRouter();
  if (session.data === null || session.data === undefined)
    router.replace("/auth/login");

  const { data: isConfirmed, isLoading } = useQuery({
    queryKey: ["check_stripe_onboarded"],
    queryFn: async () => {
      const acc = await getAccountId(session.data!.user.email);
      console.log(acc);
      if (!acc?.isOk) {
        throw new Error("Something went wrong, Please refresh the page");
      }

      const response = await checkIsStripeOnboarded(
        acc!.data.connected_account_id
      );

      if (response?.isOk) {
        return {
          isSubmitted: response.details_submitted,
          id: acc.data.connected_account_id,
        };
      } else {
        throw new Error("Something went wrong, Please refresh the page");
      }
    },
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
    <div className="relative">
      <PageTitle title="Upload an artwork" />
      {!session?.data?.user.gallery_verified &&
        !session?.data?.user.subscription_active && <NoVerificationBlock />}
      {session?.data?.user.gallery_verified &&
        !session?.data?.user.subscription_active && <NoSubscriptionBlock />}
      {!session?.data?.user.gallery_verified &&
        session?.data?.user.subscription_active && <NoVerificationBlock />}
      {session?.data?.user.gallery_verified &&
        session.data.user.subscription_active && (
          <div className="">
            <UploadArtworkDetails />
          </div>
        )}
    </div>
  );
}
