"use client";

import { LoadSmall } from "@/components/loader/Load";
import { deleteGalleryAccount } from "@/services/requests/deleteGalleryAccount";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { toast } from "sonner";

export default function DeleteAccountConfirmationModalForm() {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDeleteGalleryAccount() {
    setLoading(true);
    const response = await deleteGalleryAccount();

    if (response?.isOk) {
      toast.success(response.message);
      await signOut({ callbackUrl: "/auth/login/" });
    } else {
      toast.error(response?.message);
    }
    setLoading(false);
  }
  return (
    <div>
      <h1 className="text-sm font-normal mb-4 text-dark">
        Confirm Account Deletion
      </h1>
      <div className="flex flex-col gap-4 font-normal text-base">
        <h2 className="text-red-600 text-base font-bold">
          You are about to delete your Gallery account!
        </h2>

        <div className="bg-[#FDF7EF] p-5 flex flex-col gap-3">
          <p className="font-bold flex items-center gap-x-2">
            <IoWarning className="text-md text-[#FFA500]" />
            <span className="text-[#FFA500] text-[14px]">Warning</span>
          </p>

          <p>
            Deleting your account will permanently erase all your uploaded
            artwork and prevent you from using any of the platform&apos;s
            features.{" "}
            <strong className="text-red-600">
              This action is not reversible!
            </strong>
          </p>
        </div>
      </div>

      <div className="w-full mt-5 flex items-center gap-x-2">
        <button
          disabled={loading}
          type="button"
          onClick={handleDeleteGalleryAccount}
          className="h-[50px] px-4 w-full text-base text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-red-500 bg-red-600 duration-300 grid place-items-center"
        >
          {loading ? <LoadSmall /> : "I understand, delete this account"}
        </button>
      </div>
    </div>
  );
}