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
export default function GalleryDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useWindowSize();

  return (
    <>
      {width < 991 ? (
        <NoMobileView />
      ) : (
        <div className=" w-full h-full">
          <NextTopLoader color="#6246EA" height={6} />
          <main className="flex h-full">
            <PageLayout />

            <div
              className={`w-full xl:ml-[19rem] md:ml-[15rem] bg-[#FAFAFA] rounded-xl relative duration-200`}
            >
              <Appbar />
              <div className="h-auto rounded-lg relative my-5 px-5">
                <OrderActionModal />
                <UploadTrackingIDModal />
                <UploadOrderRejectionReason />
                <UpdatePasswordModal />
                <DeleteAccountConfirmationModal />

                {children}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
