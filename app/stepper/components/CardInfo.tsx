"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStepperStore } from "@/store/stepper/stepperStore";
import { FormEvent, useState } from "react";
import { initiateDirectCharge } from "@/services/subscriptions/subscribeUser/initiateDirectCharge";
import { toast } from "sonner";

type CardInputTypes = {
  // value: ChangeEvent<HTMLInputElement>,
  value: any;
  label: string;
};

function CardInfo() {
  const { cardInput, setCardInput, updateIndex, setStoreCardInputResponse } =
    useStepperStore();
  const [cardInputLoading, setCardInputLoading] = useState(false);

  function handleCardInputChange({ label, value }: CardInputTypes) {
    setCardInput(label, (value = value.target.value));
  }

  async function handleCardInputSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCardInputLoading(true);
    // const ref = await generateDigit(8);
    const response = await initiateDirectCharge({
      ...cardInput,
      tx_ref: "hello",
    });
    if (response?.isOk) {
      if (response.data.status === "error") {
        console.log(response.data);
        toast.error(response.data.message);
      } else {
        toast.success("Successful");
        console.log(response.data);
        setStoreCardInputResponse(response.data.meta.authorization);
        updateIndex();
      }
    } else {
      toast.error("Something went wrong");
    }
    setCardInputLoading(false);

    // should be moved to the success response
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.33 }}
      >
        <form onSubmit={handleCardInputSubmit} className="flex flex-col mb-4">
          <div className="flex flex-col gap-y-1">
            <label
              className="text-dark text-xs font-bold"
              htmlFor="card number"
            >
              Card number
            </label>
            <input
              type="text"
              className="px-3 py-2 border border-dark/50 w-[500px]"
              name="card"
              onChange={(e) =>
                handleCardInputChange({ label: "card", value: e })
              }
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-dark text-xs font-bold" htmlFor="month">
              Month
            </label>
            <input
              type="text"
              className="px-3 py-2 border border-dark/50 w-[500px]"
              name="month"
              onChange={(e) =>
                handleCardInputChange({ label: "month", value: e })
              }
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-dark text-xs font-bold" htmlFor="year">
              Year
            </label>
            <input
              type="text"
              className="px-3 py-2 border border-dark/50 w-[500px]"
              name="year"
              onChange={(e) =>
                handleCardInputChange({ label: "year", value: e })
              }
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-dark text-xs font-bold" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              className="px-3 py-2 border border-dark/50 w-[500px]"
              name="cvv"
              onChange={(e) =>
                handleCardInputChange({ label: "cvv", value: e })
              }
            />
          </div>

          <button
            disabled={cardInputLoading}
            type="submit"
            className="px-4 py-2 mt-3 bg-dark text-white disabled:bg-dark/20 disabled:cursor-not-allowed"
          >
            {cardInputLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

export default CardInfo;
