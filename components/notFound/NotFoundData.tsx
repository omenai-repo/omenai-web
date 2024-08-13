"use client";
import Lottie from "lottie-react";
import animationData from "../../json/not-found.json";
export default function NotFoundData() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Lottie
        animationData={animationData}
        className="w-[150px] h-[150px] text-dark"
      />
      <p className="text-dark text-xs font-light">No available data</p>
    </div>
  );
}
