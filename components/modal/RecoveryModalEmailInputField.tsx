"use client";

import { sendPasswordResetLink } from "@/services/password/sendPasswordResetLink";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { LoadSmall } from "../loader/Load";

export default function RecoveryModalEmailInputField() {
  const [loading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    const data = await sendPasswordResetLink("individual", {
      email,
    });

    if (data.isOk) toast.success(data.body.message);
    else toast.error(data.body.message);
    setIsloading(false);
  };
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className=" disabled:cursor-not-allowed grid disabled:bg-white disabled:border disabled:border-dark place-items-center w-full h-[40px]  bg-dark hover:bg-dark/80 hover:text-white rounded-sm text-white text-xs "
      >
        {!loading ? "Send reset link" : <LoadSmall />}
      </button>
    </form>
  );
}
