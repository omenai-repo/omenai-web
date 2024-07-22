import React from "react";

export default function OtpInput({
  isFirstStep,
  handleClick,
}: {
  isFirstStep: boolean;
  handleClick: () => void;
}) {
  return (
    <form className="container max-w-full flex flex-col space-y-6">
      <div className="relative w-full">
        <label
          className="text-[#858585] font-medium text-xs mb-2"
          htmlFor="otp"
        >
          Enter the OTP sent to you
        </label>
        <input
          name="otp"
          type="text"
          required
          placeholder="Enter the card number"
          className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
        />
      </div>

      <div className="w-full">
        <button
          onClick={handleClick}
          type="button"
          className="h-[40px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-xs bg-dark duration-200 grid place-items-center"
        >
          Verify OTP
        </button>
      </div>
    </form>
  );
}
