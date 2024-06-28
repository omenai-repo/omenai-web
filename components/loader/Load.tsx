"use client";
import animationData from "@/json/load_big.json";
import Lottie from "lottie-react";
import { PulseLoader } from "react-spinners";
export default function Load() {
  return (
    <div className="max-w-[100px] max-h-[100px]">
      <Lottie animationData={animationData} loop autoPlay />
    </div>
  );
}

export const LoadSmall = () => {
  return (
    <div className="w-fit">
      <PulseLoader size={5} />
    </div>
  );
};
