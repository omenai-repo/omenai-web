"use client";
import Lottie from "lottie-react";
import animationData from "../../json/order-received.json";
import Link from "next/link";
import { actionStore } from "@/store/actions/ActionStore";
export default function OrderReceived() {
  const [toggleOrderReceivedModal] = actionStore((state) => [
    state.toggleOrderReceivedModal,
  ]);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <Lottie animationData={animationData} className="w-[200px] h-[200px]" />
      <p className="text-dark text-[14px] font-normal ">
        Your order has been successfully received, we&apos;ll be in touch within
        the next 48 hours with an accurate shipping quote and next steps.
      </p>
      <p className="text-dark text-[14px] font-normal my-5">
        Thank you for your patience
      </p>

      <Link
        onClick={() => toggleOrderReceivedModal(false)}
        href={"/"}
        className="h-[35px] px-4 w-full bg-black grid place-items-center text-white cursor-pointer mt-[50px]"
      >
        Continue shopping
      </Link>
    </div>
  );
}
