"use client";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";
import { MdDomainVerification } from "react-icons/md";

import { useState } from "react";
import {
  Button,
  Step,
  Stepper,
} from "@/app/material_tailwind/MaterialTailwindExports";
import CardInput from "./CardInput";
import OtpInput from "./OtpInput";
import VerifyTransaction from "./VerifyTransaction";

export function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full py-4 px-8 mt-4 container">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        placeholder={""}
        className="relative"
      >
        <Step
          onClick={() => setActiveStep(0)}
          placeholder={undefined}
          className="cursor-pointer"
        >
          <BsFillCreditCardFill />
        </Step>

        <Step
          onClick={() => setActiveStep(1)}
          placeholder={undefined}
          className="cursor-pointer"
        >
          <MdOutlinePassword />
        </Step>
        <Step
          onClick={() => setActiveStep(2)}
          placeholder={undefined}
          className="cursor-pointer"
        >
          <MdDomainVerification />
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <div className="my-10">
          <CardInput handleClick={handleNext} isFirstStep={isFirstStep} />
        </div>
      )}
      {activeStep === 1 && (
        <div className="my-10">
          <OtpInput handleClick={handleNext} isFirstStep={isFirstStep} />
        </div>
      )}
      {activeStep === 2 && (
        <div className="my-10">
          <VerifyTransaction
            handleClick={() => setActiveStep(0)}
            isFirstStep={isFirstStep}
          />
        </div>
      )}
    </div>
  );
}
