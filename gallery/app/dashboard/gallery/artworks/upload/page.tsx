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
import { retrieveSubscriptionData } from "@/services/subscriptions/retrieveSubscriptionData";
import { handleError } from "@/utils/handleQueryError";

export default function UploadArtwork() {
  const session = useSession();
  const router = useRouter();
  if (!session.data?.user) router.replace("/auth/login");

  const { data: isConfirmed, isLoading } = useQuery({
    queryKey: ["upload_precheck"],
    queryFn: async () => {
      try {
        if (!session.data?.user) throw new Error("User not authenticated");

        // Fetch account ID first, as it's required for the next call
        const acc = await getAccountId(session.data.user.email);
        if (!acc?.isOk)
          throw new Error("Something went wrong, Please refresh the page");

        // Start retrieving subscription data while fetching Stripe onboarding status
        const [response, sub_check] = await Promise.all([
          checkIsStripeOnboarded(acc.data.connected_account_id), // Dependent on account ID
          retrieveSubscriptionData(session.data.user.id), // Independent
        ]);

        if (!response?.isOk || !sub_check?.isOk) {
          throw new Error("Something went wrong, Please refresh the page");
        }

        return {
          isSubmitted: response.details_submitted,
          id: acc.data.connected_account_id,
          isSubActive: sub_check?.data?.status === "active",
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
      {!session?.data?.user.gallery_verified && !isConfirmed?.isSubActive && (
        <NoVerificationBlock gallery_name={session.data!.user.name} />
      )}
      {session?.data?.user.gallery_verified && !isConfirmed?.isSubActive && (
        <NoSubscriptionBlock />
      )}
      {!session?.data?.user.gallery_verified && isConfirmed?.isSubActive && (
        <NoVerificationBlock gallery_name={session.data!.user.name} />
      )}
      {session?.data?.user.gallery_verified && isConfirmed?.isSubActive && (
        <div className="">
          <UploadArtworkDetails />
        </div>
      )}
    </div>
  );
}
