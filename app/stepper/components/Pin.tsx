"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStepperStore } from "@/store/stepper/stepperStore" 
import { FormEvent, useState } from "react";
import { validateChargeAuthorization } from "@/services/subscriptions/subscribeUser/validateChargeAuthorization";
import { toast } from "sonner";

function Pin() {
    const { cardInput, pinInput, setPinInput, updateIndex, storeCardInputResponse, setStorePinInputResponse } = useStepperStore();

    const [pinInputLoading, setPinInputLoading] = useState(false);

    async function handlePinInputSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(cardInput);
        setPinInputLoading(true);
        const response = await validateChargeAuthorization({
            ...cardInput,
            authorization: { mode: storeCardInputResponse.mode, pin: pinInput },
            tx_ref: "hello",
        });
        if (response?.isOk) {
            if (response.data.status === "error") {
            toast.error(response.data.message);
            } else {
            toast.success("Successful");
            console.log(response.data);
            setStorePinInputResponse({ flw_ref: response.data.data.flw_ref });
            }
        } else {
            toast.error("Something went wrong");
        }
        setPinInputLoading(false);

        // should be moved to the success response
        updateIndex()
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ y: -100 }}
                transition={{ duration: 0.33 }}
            >
                <form
                    onSubmit={handlePinInputSubmit}
                    className="flex flex-col gap-y-2 mb-4"
                >
                    <div className="flex flex-col gap-y-1">
                        <label className="text-dark text-xs font-bold" htmlFor="pin">
                        Pin
                        </label>
                        <input
                        type="text"
                        className="px-3 py-2 border border-dark/50 w-[500px]"
                        onChange={(e) => setPinInput(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={pinInputLoading}
                        type="submit"
                        className="px-4 py-2 bg-dark text-white disabled:bg-dark/20 disabled:cursor-not-allowed"
                    >
                        {pinInputLoading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </motion.div>
        </AnimatePresence>
    )
}

export default Pin