"use client";
import { LoadSmall } from "@/components/loader/Load";
import { sendPasswordResetLink } from "@/services/password/sendPasswordResetLink";
import { actionStore } from "@/store/actions/ActionStore";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function RecoveryEmailInputField() {
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [recoveryModal] = actionStore((state) => [state.recoveryModal]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    const data = await sendPasswordResetLink(recoveryModal.type, {
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
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        disabled={isLoading}
        type="submit"
        className=" disabled:cursor-not-allowed grid disabled:bg-white disabled:border disabled:border-dark place-items-center w-full h-[40px]  bg-dark hover:bg-dark/80 hover:text-white rounded-sm text-white text-xs "
      >
        {isLoading ? <LoadSmall /> : "Send reset link"}
      </button>
    </form>
  );
}
