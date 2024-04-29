"use client";

import { initiateDirectCharge } from "@/services/subscriptions/subscribeUser/initiateDirectCharge";
import { validateCharge } from "@/services/subscriptions/subscribeUser/validateCharge";
import { validateChargeAuthorization } from "@/services/subscriptions/subscribeUser/validateChargeAuthorization";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Stepper() {
  const [cardInput, setCardInput] = useState({
    card: "",
    cvv: "",
    month: "",
    year: "",
  });
  const [otpInput, setOtpInput] = useState("");
  const [pinInput, setPinInput] = useState("");

  const [storeCardInputResponse, setStoreCardInputResponse] = useState<any>({});
  const [storePinInputResponse, setStorePinInputResponse] = useState<any>({});
  const [storeOtpInputResponse, setStoreOtpInputResponse] = useState<any>({});
  const [cardInputLoading, setCardInputLoading] = useState(false);
  const [pinInputLoading, setPinInputLoading] = useState(false);
  const [otpInputLoading, setOtpInputLoading] = useState(false);
  const [verify, setVerify] = useState(false);


  function handleCardInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCardInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
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
      }
    } else {
      toast.error("Something went wrong");
    }
    setCardInputLoading(false);
  }



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
  }



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
  }
  

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
    <div className="w-full h-screen grid place-items-center">
      <div className="flex flex-col gap-y-8">
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
              onChange={(e) => handleCardInputChange(e)}
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
              onChange={(e) => handleCardInputChange(e)}
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
              onChange={(e) => handleCardInputChange(e)}
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
              onChange={(e) => handleCardInputChange(e)}
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
        <button
          disabled={verify}
          onClick={verify_transaction}
          type="submit"
          className="px-4 py-2 bg-dark text-white disabled:bg-dark/20 disabled:cursor-not-allowed"
        >
          {verify ? "Loading..." : "Verify transaction"}
        </button>
      </div>
    </div>
  );
}
