"use client";

import { LoadSmall } from "@/components/loader/Load";
import { verifyGalleryRequest } from "@/services/verification/verifyGalleryRequest";
import { galleryDummyVerification } from "@/store/gallery/gallery_dummy_verification/GalleryDummyVerification";
import { getFormattedDateTime } from "@/utils/getCurrentDateTime";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiAdminLine } from "react-icons/ri";
type AppbarTypes = {
  admin_name?: string;
  gallery_name?: string;
  gallery_verified?: boolean;
};
export default function DashboardIndicator({
  admin_name,
  gallery_name,
  gallery_verified,
}: AppbarTypes) {
  // const [open] = galleryDummyVerification((state) => [
  //   state.open,
  //   state.updateOpen,
  // ]);
  // const pathname = usePathname().split("/");
  const [loading, setLoading] = useState(false);
  async function handleRequestGalleryVerification() {
    setLoading(true);
    try {
      const response = await verifyGalleryRequest(gallery_name!);
      if (!response?.isOk)
        toast.error("Something wwent wrong. Please try again");
      else toast.success(response.message);
    } catch (error) {
      toast.error("Something wwent wrong. Please try again");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-xs">
        <p className="font-normal text-dark">
          Welcome back, <strong>{gallery_name}</strong>
        </p>

        <p className="text-dark">
          <span className="font-normal capitalize text-dark">
            {getFormattedDateTime()}
          </span>
        </p>
      </div>
      {/* Request verification */}
      {!gallery_verified ? (
        <div className="" id="gallery-verification">
          <button
            disabled={loading}
            onClick={handleRequestGalleryVerification}
            className=" w-full text-xs disabled:cursor-not-allowed whitespace-nowrap disabled:bg-[#E0E0E0] bg-dark rounded-sm text-white h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
          >
            {loading ? <LoadSmall /> : "Request gallery verification"}
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <RiAdminLine className="text-sm font-light text-dark" />
          <div>
            <p className="text-dark text-xs font-bold">{admin_name}</p>
            {/* <p className="text-dark text-xs">{gallery_name}</p> */}
          </div>
        </div>
      )}
    </div>
  );
}
