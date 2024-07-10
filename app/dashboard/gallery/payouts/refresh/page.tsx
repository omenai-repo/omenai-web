"use client";
import { useSession } from "next-auth/react";
import PageTitle from "../../components/PageTitle";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createAccountLink } from "@/services/stripe/createAccountLink";
import { toast } from "sonner";
import Load, { LoadSmall } from "@/components/loader/Load";
import { checkIsStripeOnboarded } from "@/services/stripe/checkIsStripeOnboarded";
import { useQuery } from "@tanstack/react-query";

export default function RefreshStripe() {
  const session = useSession();
  const searchParams = useSearchParams();
  const account_Id = searchParams.get("id");
  const router = useRouter();
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);

  const { data: isConfirmed, isLoading } = useQuery({
    queryKey: ["check_stripe_onboarded"],
    queryFn: async () => {
      const response = await checkIsStripeOnboarded(account_Id!);

      if (response?.isOk) {
        return {
          isSubmitted: response.details_submitted,
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

  if (isConfirmed!.isSubmitted) router.replace(`/dashboard/gallery/payouts`);

  async function handleAccountLink() {
    setAccountLinkCreatePending(true);
    const response = await createAccountLink(account_Id!);

    if (response?.isOk) {
      toast.success("Account link created successfully... Redirecting!");
      router.replace(response.url);
    } else {
      toast.error("Something went wrong, please try again or contact support");
    }
  }
  return (
    <div>
      <PageTitle title="Stripe Onboarding" />
      {isConfirmed?.isSubmitted ? (
        <div className="h-[85vh] w-full grid place-items-center">
          <div className="flex flex-col space-y-1">
            <Load />
            <p className="text-[14px] font-semibold">
              Redirecting...Please wait
            </p>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-[78vh]">
          <div className="bg-white border border-[#E0E0E0] text-dark p-6 rounded-lg w-full max-w-xl shadow-xl cursor-default relative">
            <h1 className="text-[14px] font-normal text-[#858585] mb-1">
              Looks like you didn&apos;t complete your Stripe Onboarding.
            </h1>
            <p className="font-bold text-sm">
              Create a connected account on{" "}
              <span className="text-[#5247ee]">Stripe</span>
            </p>
            <div className="flex flex-col space-y-2 mt-5">
              <div className="relative w-full">
                <label
                  className="text-[#858585] font-medium text-xs mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  disabled
                  type="text"
                  value={session.data?.user.name}
                  className="p-3 border border-[#E0E0E0] text-xs disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="text-[#858585] font-medium text-xs mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  disabled
                  type="text"
                  value={session.data?.user.email}
                  className="p-3 border border-[#E0E0E0] text-xs disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
                />
              </div>
            </div>
            <>
              <p className="text-[14px] font-normal mt-4">
                Your connected account ID is:{" "}
                <code className="font-bold">{account_Id}</code>{" "}
              </p>
            </>
            <button
              disabled={accountLinkCreatePending}
              className="h-[50px] text-[14px] font-medium disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] px-4 w-full bg-black text-white cursor-pointer mt-5 grid place-items-center"
              onClick={handleAccountLink}
            >
              {accountLinkCreatePending ? (
                <LoadSmall />
              ) : (
                "Complete Stripe Onboarding"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}