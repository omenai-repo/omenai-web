"use client";

import { useStepperStore } from "@/store/stepper/stepperStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function VerifyTransaction() {
    const { storeOtpInputResponse } = useStepperStore();
  
    const [verify, setVerify] = useState(false);

    async function verify_transaction() {
        setVerify(true);
        console.log(storeOtpInputResponse);
        const response = await fetch("/api/transactions/verify_FLW_transaction", {
          method: "POST",
          body: JSON.stringify({ transaction_id: storeOtpInputResponse.id }),
        });
    
        const result = await response.json();
        console.log(result);
    
        setVerify(false);
    }

    return (
        <AnimatePresence>
            <motion.div 
                className="w-[500px]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ y: -100 }}
                transition={{ duration: 0.33 }}
            >
                <button
                    disabled={verify}
                    onClick={verify_transaction}
                    type="submit"
                    className="px-4 py-2 w-full bg-dark text-white disabled:bg-dark/20 disabled:cursor-not-allowed"
                >
                    {verify ? "Loading..." : "Verify transaction"}
                </button>
            </motion.div>
        </AnimatePresence>
    )
}

export default VerifyTransaction