import Image from "next/image";
import React from "react";

export default function VerifyTransaction({
  isFirstStep,
  handleClick,
}: {
  isFirstStep: boolean;
  handleClick: () => void;
}) {
  return (
    <div className="grid place-items-center">
      <div className="space-y-2 grid place-items-center">
        <p>Verification Successful</p>
        <Image
          src={"/images/verified.png"}
          height={100}
          width={100}
          alt="verification icon"
          className="text-center"
        />
      </div>

      <div className="w-full mt-10">
        <button
          onClick={handleClick}
          type="button"
          className="h-[40px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-xs bg-dark duration-200 grid place-items-center"
        >
          Finish transaction
        </button>
      </div>
    </div>
  );
}
