"use client";

import { useStepperStore } from "@/store/stepper/stepperStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type VerifyTransactionProps = {
    showSection: boolean
}

function VerifyTransaction({showSection} : VerifyTransactionProps) {
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
            {showSection && (
                <motion.div className="w-[500px]">
                    <button
                        disabled={verify}
                        onClick={verify_transaction}
                        type="submit"
                        className="px-4 py-2 w-full bg-dark text-white disabled:bg-dark/20 disabled:cursor-not-allowed"
                    >
                        {verify ? "Loading..." : "Verify transaction"}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default VerifyTransaction