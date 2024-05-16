"use client";

import { sendPasswordResetLink } from "@/services/password/sendPasswordResetLink";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import LoaderAnimation from "../loader/LoaderAnimation";

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
    <form
      className="flex sm:flex-row flex-col gap-4 w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-1 w-full border border-dark/10 focus:ring-0 focus:border-dark px-4 py-1 rounded-sm placeholder:text-xs"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className=" disabled:cursor-not-allowed grid disabled:bg-white disabled:border disabled:border-dark place-items-center w-full sm:w-fit px-4 py-2 bg-dark hover:bg-dark/10 hover:text-dark rounded-sm text-white text-xs "
      >
        {!loading ? "Send reset link" : <LoaderAnimation />}
      </button>
    </form>
  );
}
