"use client";

import { LoadSmall } from "@shared/components/loader/Load";
import { deleteAccount } from "@shared/services/requests/deleteGalleryAccount";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { toast } from "sonner";

export default function DeleteAccountConfirmationModalForm() {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDeleteGalleryAccount() {
    setLoading(true);
    const response = await deleteAccount("individual");

    if (response?.isOk) {
      toast.success("Operation successful", {
        description: response.message,
        style: {
          background: "green",
          color: "white",
        },
        className: "class",
      });
      await signOut({ callbackUrl: "/auth/login/" });
    } else {
      toast.error("Error notification", {
        description: response?.message,
        style: {
          background: "red",
          color: "white",
        },
        className: "class",
      });
    }
    setLoading(false);
  }
  return (
    <div>
      <h1 className="text-sm font-normal mb-4 text-dark">
        Confirm Account Deletion
      </h1>
      <div className="flex flex-col gap-4 font-normal text-base">
        <h2 className="text-red-600 text-x font-bold">
          You are about to delete your Omenai account!
        </h2>

        <div className="bg-[#FDF7EF] p-5 flex flex-col gap-3">
          <p className="font-bold flex items-center gap-x-2">
            <IoWarning className="text-md text-[#FFA500]" />
            <span className="text-[#FFA500] text-[14px]">Warning</span>
          </p>

          <p className="text-xs">
            Deleting your account will permanently erase all your data on the
            platform and prevent you from using any of the platform&apos;s
            features. <br />
            Please be advised that all artworks you have ordered and paid for
            prior to confirming this action will still be delivered to your
            address. <br />
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
          className="h-[40px] px-4 w-full text-xs text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-red-500 bg-red-600 duration-300 grid place-items-center"
        >
          {loading ? <LoadSmall /> : "I understand, delete this account"}
        </button>
      </div>
    </div>
  );
}
