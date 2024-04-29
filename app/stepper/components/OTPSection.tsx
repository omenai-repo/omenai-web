"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStepperStore } from "@/store/stepper/stepperStore" 
import { FormEvent, useState } from "react";
import { validateCharge } from "@/services/subscriptions/subscribeUser/validateCharge";
import { toast } from "sonner";

type OTPSectionProps = {
    showSection: boolean
}

function OTPSection({showSection} : OTPSectionProps) {
    const { otpInput, setOtpInput, storePinInputResponse, updateIndex, setStoreOtpInputResponse } = useStepperStore();
    const [otpInputLoading, setOtpInputLoading] = useState(false);

    async function handleOtpInputSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(otpInput);
        console.log(storePinInputResponse);
    
        setOtpInputLoading(true);
        const response = await validateCharge({
          otp: otpInput,
          flw_ref: storePinInputResponse.flw_ref,
        });
        if (response?.isOk) {
          if (response.data.status === "error") {
            toast.error(response.data.message);
          } else {
            toast.success("Successful");
            console.log(response.data);
            setStoreOtpInputResponse(response.data.data);
          }
        } else {
          toast.error("Something went wrong");
        }
        setOtpInputLoading(false);

        // should be moved to the success response
        updateIndex()
    }

    return (
        <AnimatePresence>
            {showSection && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.33 }}
                >
                    <form
                        onSubmit={handleOtpInputSubmit}
                        className="flex flex-col gap-y-2 mb-4"
                        >
                        <div className="flex flex-col gap-y-1">
                            <label className="text-dark text-xs font-bold" htmlFor="otp">
                            OTP
                            </label>
                            <input
                            type="text"
                            className="px-3 py-2 border border-dark/50 w-[500px]"
                            onChange={(e) => setOtpInput(e.target.value)}
                            />
                        </div>
                        <button
                            disabled={otpInputLoading}
                            type="submit"
                            className="px-4 py-2 bg-dark text-white disabled:bg-dark/20 disabled:cursor-not-allowed"
                        >
                            {otpInputLoading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default OTPSection