"use client";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";

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
import AuthPinInput from "./AuthPinInput";
import AvsNoauthInput from "./AvsNoauthInput";
import Load from "@/components/loader/Load";

export function CheckoutStepper({
  plan,
}: {
  plan: SubscriptionPlanDataTypes & { createdAt: string; updatedAt: string };
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [trans_id, set_trans_id] = useState<string>("");
  const [validateChargeAuthorization, setValidateChargeAuthorization] =
    useState<"redirect" | "pin" | "avs_noauth" | "">("");
  const [finalChargeAuthorization, setFinalChargeAuthorization] = useState<
    "redirect" | "otp" | ""
  >("");

  const handleNext = () => {
    !isLastStep &&
      setActiveStep((cur) =>
        cur + validateChargeAuthorization !== "redirect" ? 1 : 3
      );
  };

  const handlePinClick = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
  };

  return (
    <div className="w-full">
      {/* <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        placeholder={""}
        className="relative"
      >
        <Step placeholder={undefined} className="cursor-pointer h-4 w-4" />
        <Step placeholder={undefined} className={` cursor-pointer h-4 w-4`} />
        <Step placeholder={undefined} className={` cursor-pointer h-4 w-4`} />
        <Step placeholder={undefined} className="cursor-pointer h-4 w-4" />
      </Stepper> */}
      {activeStep === 0 && (
        <div className="my-10">
          <CardInput
            handleClick={handleNext}
            isFirstStep={isFirstStep}
            updateAuthorization={setValidateChargeAuthorization}
            plan={plan}
          />
        </div>
      )}
      <div className="my-10">
        {validateChargeAuthorization === "pin" && (
          <AuthPinInput
            handleClick={handlePinClick}
            updateFinalAuthorization={setFinalChargeAuthorization}
          />
        )}
        {validateChargeAuthorization === "avs_noauth" && (
          <AvsNoauthInput
            updateFinalAuthorization={setFinalChargeAuthorization}
            handleClick={handleNext}
          />
        )}
        {validateChargeAuthorization === "redirect" && (
          <>
            <div className="grid place-items-center">
              <div className="flex flex-col space-y-3 justify-center items-center">
                <Load />
                <p className="text-[13px] text-center font-medium">
                  Redirecting you to a secure authentication portal <br />{" "}
                  Please wait...
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="my-10">
        {finalChargeAuthorization === "otp" && (
          <OtpInput handleClick={handlePinClick} set_id={set_trans_id} />
        )}
        {finalChargeAuthorization === "redirect" && (
          <>
            <div className="grid place-items-center">
              <div className="flex flex-col space-y-3 justify-center items-center">
                <Load />
                <p className="text-[13px] text-center font-medium">
                  Redirecting you to a secure authentication portal <br />{" "}
                  Please wait...
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {activeStep === 3 && (
        <div className={` my-10`}>
          <VerifyTransaction transaction_id={trans_id} />
        </div>
      )}
    </div>
  );
}
