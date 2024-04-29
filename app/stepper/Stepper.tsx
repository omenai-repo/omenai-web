"use client";

import { useState } from "react";

import TopLabel from "./components/TopLabel";
import CardInfo from "./components/CardInfo";
import { useStepperStore } from "@/store/stepper/stepperStore" 
import Pin from "./components/Pin";
import OTPSection from "./components/OTPSection";
import VerifyTransaction from "./components/VerifyTransaction";

export default function Stepper() {
  const { index } = useStepperStore();
  
  return (
    <div className="w-full h-screen">
      <TopLabel />
      <div className="max-w-[500px] mx-auto mt-10">
        {/* Card info goes here */}
        {index === 0 && <CardInfo showSection={index === 0} />}
        {/* Pin form goes here */}
        {index === 1 && <Pin showSection={index === 1} />}
        {/* OTP goes here */}
        {index === 2 && <OTPSection showSection={index === 2} />}

        {/* verify transaction button */}
        {index === 3 && <VerifyTransaction showSection={index === 3} />}
      </div>
    </div>
  );
}
