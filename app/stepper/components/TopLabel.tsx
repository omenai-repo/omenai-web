"use client";

import { useStepperStore } from "@/store/stepper/stepperStore";

function TopLabel() {
  const { index } = useStepperStore();

  return (
    <div className="py-2 px-[20px] mx-auto w-full md:w-[700px] mt-10">
      <div className="flex items-center px-[10px]">
        <div
          className={`h-[35px] w-[40px] rounded-full ${
            index >= 0 ? "bg-dark text-white" : "bg-[#f5f5f5] text-black"
          } flex items-center justify-center font-medium`}
        >
          1
        </div>
        <div
          className={`h-[5px] flex-1 ${
            index >= 1 ? "bg-dark" : "bg-[#f5f5f5]"
          }`}
        />
        <div
          className={`h-[35px] w-[40px] rounded-full ${
            index >= 1 ? "bg-dark text-white" : "bg-[#f5f5f5] text-black"
          } flex items-center justify-center font-medium`}
        >
          2
        </div>
        <div
          className={`h-[5px] flex-1 ${
            index >= 2 ? "bg-dark" : "bg-[#f5f5f5]"
          }`}
        />
        <div
          className={`h-[35px] w-[40px] rounded-full ${
            index >= 2 ? "bg-dark text-white" : "bg-[#f5f5f5] text-black"
          } flex items-center justify-center font-medium`}
        >
          3
        </div>
      </div>
      <div className="w-full flex items-center gap-1 mt-2 font-normal">
        <p className="flex-1">Card Info</p>
        <p className="flex-1 text-center">Card Pin</p>
        <p className="flex-1 text-right">OTP Code</p>
      </div>
    </div>
  );
}

export default TopLabel;
