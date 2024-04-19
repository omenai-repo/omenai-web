"use client";
import LoaderAnimation from "@/components/loader/LoaderAnimation";
import { actionStore } from "@/store/actions/ActionStore";
import { galleryLoginStore } from "@/store/auth/login/GalleryLoginStore";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function FormActions() {
  const [updateRecoveryModal] = actionStore((state) => [
    state.updateRecoveryModal,
  ]);

  const [isLoading] = galleryLoginStore((state) => [state.isLoading]);

  return (
    <div className="flex flex-col mt-[1rem] gap-4 w-full">
      <p className="font-normal text-base text-[#616161] text-right">
        Forgot password?{" "}
        <span
          className="text-black cursor-pointer underline font-semibold"
          onClick={() => updateRecoveryModal("individual")}
        >
          Reset it
        </span>
      </p>
      <div className="flex flex-col w-full gap-2 mt-[50px]">
        <button
            disabled={isLoading}
            type="submit"
            className="h-[56px] w-full flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] bg-black text-white text-base"
        >
            {isLoading ? "Loading..." : "Login"} {!isLoading && <GoArrowRight className="text-md opacity-70" />}
        </button>
        <Link href={'/'} className="h-[50px] w-full text-center flex items-center justify-center bg-white">Go back home</Link>
      </div>
    </div>
  );
}
