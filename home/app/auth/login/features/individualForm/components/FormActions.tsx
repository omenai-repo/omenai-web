"use client";
import { LoadSmall } from "@shared/components/loader/Load";
import { actionStore } from "@shared/store/actions/ActionStore";
import { individualLoginStore } from "@shared/store/auth/login/IndividualLoginStore";
import { useLoginStore } from "@shared/store/auth/login/LoginStore";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function FormActions() {
  const { updateRecoveryModal } = actionStore();

  const { updateCurrent } = useLoginStore();

  const [isLoading] = individualLoginStore((state) => [state.isLoading]);

  return (
    <div className="flex flex-col mt-[1rem] gap-4 w-full">
      <div className="flex flex-col gap-y-2 justify-between items-center">
        <p className="font-normal text-xs text-dark/70 text-right">
          Need an account?{" "}
          <Link
            href={"/auth/register/individual"}
            className="text-dark underline"
          >
            Create one
          </Link>
        </p>

        <p className="font-normal text-xs text-dark/70 text-right">
          Forgot password?{" "}
          <span
            className="text-black cursor-pointer underline font-normal"
            onClick={() => updateRecoveryModal("individual")}
          >
            Reset it
          </span>
        </p>
      </div>

      <div className="flex flex-col w-full gap-2 mt-[30px]">
        <button
          disabled={isLoading}
          type="submit"
          className="h-[40px] px-4 w-full flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] bg-black text-white text-xs font-normal"
        >
          {isLoading ? <LoadSmall /> : "Login"}{" "}
          {!isLoading && <GoArrowRight className="text-md opacity-70" />}
        </button>
        <button
          onClick={() => updateCurrent(1)}
          className="h-[40px] px-4 w-full text-center text-xs flex items-center justify-center bg-white cursor-pointer"
        >
          Sign in to Gallery account
        </button>
      </div>
    </div>
  );
}
