"use client";
import { actionStore } from "@/store/actions/ActionStore";
import { individualLoginStore } from "@/store/auth/login/IndividualLoginStore";
import { useLoginStore } from "@/store/auth/login/LoginStore";
import { GoArrowRight } from "react-icons/go";

export default function FormActions() {
  const [updateRecoveryModal] = actionStore((state) => [
    state.updateRecoveryModal,
  ]);

  const { updateCurrent } = useLoginStore();

  const [isLoading] = individualLoginStore((state) => [state.isLoading]);

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
      <div className="flex flex-col w-full gap-2 mt-[30px]">
        <button
            disabled={isLoading}
            type="submit"
            className="h-[56px] w-full flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] bg-black text-white text-base"
        >
            {isLoading ? "Loading..." : "Login"} {!isLoading && <GoArrowRight className="text-md opacity-70" />}
        </button>
        <button onClick={() => updateCurrent(1)} className="h-[50px] w-full text-center flex items-center justify-center bg-white cursor-pointer">Sign in to Gallery</button>
      </div>
    </div>
  );
}
