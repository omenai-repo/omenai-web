"use client";
import NextTopLoader from "nextjs-toploader";
import PageLayout from "./features/PageLayout";
import Appbar from "./components/Appbar";
import { useWindowSize } from "usehooks-ts";
import NoMobileView from "./components/NoMobileView";
import { OrderActionModal } from "./modals/OrderActionModal";
import { UploadTrackingIDModal } from "./modals/ProvideTrackingIDModal";
import { UploadOrderRejectionReason } from "./modals/ProvideOrderRejectionReason";
import { DeleteAccountConfirmationModal } from "./modals/DeleteAccountConfirmationMdal";
import { UpdatePasswordModal } from "./modals/UpdatePasswordModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GetStartedWithStripe from "./modals/GetStartedWithStripe";
import { useQuery } from "@tanstack/react-query";
import { getAccountId } from "@/services/stripe/getAccountId";
import { toast } from "sonner";
import Load from "@/components/loader/Load";
export default function GalleryDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const { width } = useWindowSize();
  const { data: account, isLoading } = useQuery({
    queryKey: ["get_account_info"],
    queryFn: async () => {
      const acc = await getAccountId(session.data!.user.email);
      if (!acc?.isOk) {
        toast.error("Something went wrong, Please refresh the page");
      } else return acc.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-[85vh] w-full grid place-items-center">
        <Load />
      </div>
    );
  }

  const isNotStripeConnected = account.connected_account_id === null;
  const isGalleryVerified = account.gallery_verified;
  const val = isNotStripeConnected && isGalleryVerified;

  return (
    <>
      {width < 991 ? (
        <NoMobileView />
      ) : (
        <div className=" w-full h-full">
          <NextTopLoader color="#1A1A1A" height={6} />
          <main className="flex h-full">
            <PageLayout />

            <div
              className={`w-full xl:ml-[19rem] md:ml-[15rem]  rounded-xl relative duration-200`}
            >
              <Appbar />
              <div className="h-auto rounded-lg relative my-5 px-5">
                {val ? (
                  <GetStartedWithStripe />
                ) : (
                  <>
                    <OrderActionModal />
                    <UploadTrackingIDModal />
                    <UploadOrderRejectionReason />
                    <UpdatePasswordModal />
                    <DeleteAccountConfirmationModal />

                    {children}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
