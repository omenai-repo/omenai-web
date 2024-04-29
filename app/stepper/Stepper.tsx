"use client";

import TopLabel from "./components/TopLabel";
import CardInfo from "./components/CardInfo";
import { useStepperStore } from "@/store/stepper/stepperStore" 
import Pin from "./components/Pin";
import OTPSection from "./components/OTPSection";
import VerifyTransaction from "./components/VerifyTransaction";
import { displayStepperComponent } from "@/utils/stepper";

const steps = {
  cardInfoIndex: 0,
  pinIndex: 1,
  otpIndex: 2,
  verifyTransactionIndex: 3
}

export default function Stepper() {
  const { index } = useStepperStore();
  
  return (
    <div className="w-full h-screen">
      <TopLabel />
      <div className="max-w-[500px] mx-auto mt-10">
        {/* Card info goes here */}
        {displayStepperComponent(index, steps.cardInfoIndex) && <CardInfo />}
        {/* Pin form goes here */}
        {displayStepperComponent(index, steps.pinIndex) && <Pin />}
        {/* OTP goes here */}
        {displayStepperComponent(index, steps.otpIndex) && <OTPSection />}

        {/* verify transaction button */}
        {displayStepperComponent(index, steps.verifyTransactionIndex) && <VerifyTransaction />}
      </div>
    </div>
  );
}
