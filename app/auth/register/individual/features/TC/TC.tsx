"use client";
import { LoadSmall } from "@/components/loader/Load";
import { useIndividualAuthStore } from "@/store/auth/register/IndividualAuthStore";
import { Checkbox, Label } from "flowbite-react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function TC() {
  const [decrementCurrentSignupFormIndex, preferences, isLoading] =
    useIndividualAuthStore((state) => [
      state.decrementCurrentSignupFormIndex,
      state.preferences,
      state.isLoading,
    ]);
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: -100 }}
      transition={{ duration: 0.33 }}
    >
      <h1 className="text-md font-medium mb-4">Confirm account creation</h1>
      <p className="text-xs my-4 font-normal">
        Please read through and confirm that you understand and accept all the
        terms stated
      </p>

      <div className="bg-[#FAFAFA] p-5 my-5 flex flex-col gap-y-5">
        <div className="flex items-center gap-2">
          <Checkbox id="terms of use" required className="border-dark" />
          <Label htmlFor="terms of use" className="text-dark text-xs">
            By ticking this box, I accept the{" "}
            <Link href={"/"} className="underline font-medium">
              Terms of use
            </Link>{" "}
            and{" "}
            <Link href={"/"} className="underline font-medium">
              Privacy Policy
            </Link>{" "}
            of creating an account with Omenai Inc.
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="promotional emails" className="border-dark" />
          <Label htmlFor="promotional emails" className="text-dark text-xs">
            By ticking this box, I agree to subscribing to Omenai Inc&apos;s
            mailing list and receiving promotional emails.(optional)
          </Label>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className=" h-[40px] px-4 w-full flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] bg-dark text-white text-xs font-medium"
        >
          {isLoading ? <LoadSmall /> : "Create account"}
        </button>
        <button
          className={` rounded-full  h-[40px] px-4 mt-[1rem] text-dark underline transition-all ease-linear duration-200`}
          type={"button"}
          onClick={decrementCurrentSignupFormIndex}
        >
          Back
        </button>
      </div>
    </motion.div>
  );
}
