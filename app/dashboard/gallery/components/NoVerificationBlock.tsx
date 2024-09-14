"use client";
import { LoadSmall } from "@/components/loader/Load";
import { verifyGalleryRequest } from "@/services/verification/verifyGalleryRequest";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsShieldLock } from "react-icons/bs";
export default function NoVerificationBlock({
  gallery_name,
}: {
  gallery_name: string;
}) {
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
    <div
      className={`w-full h-[78vh] grid place-items-center bg-dark mt-10 rounded-lg`}
    >
      <div className="flex flex-col gap-4 items-center text-xs">
        <BsShieldLock className="text-2xl text-white" />
        <div className="text-center">
          <p className=" text-white">
            Your account is being verified, an agent will reach out to you
            within 24 hours.
          </p>
          <p className=" text-white">
            To expedite this process, please click the{" "}
            <b>&apos; Request gallery verification &apos;</b> button below{" "}
          </p>
        </div>
        <div className="mt-3" id="gallery-verification">
          <button
            disabled={loading}
            onClick={handleRequestGalleryVerification}
            className=" w-full text-xs disabled:cursor-not-allowed whitespace-nowrap disabled:bg-[#E0E0E0] bg-white rounded-sm text-dark h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-[#e0e0e0]"
          >
            {loading ? <LoadSmall /> : "Request gallery verification"}
          </button>
        </div>
      </div>
    </div>
  );
}
