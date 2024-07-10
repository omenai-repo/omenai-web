"use client";
import { BsShieldLock } from "react-icons/bs";
export default function NoVerificationBlock() {
  return (
    <div
      className={`w-full h-[78vh] grid place-items-center bg-dark mt-10 rounded-lg`}
    >
      <div className="flex flex-col gap-4 items-center">
        <BsShieldLock className="text-2xl text-white" />
        <div className="text-center">
          <p className=" text-white">
            Your account is being verified, an agent will reach out to you
            within 24 hours.
          </p>
          <p className=" text-white">
            To expedite this process, please click the{" "}
            <b>&apos; Request gallery verification &apos;</b> button below{" "}
          </p>
        </div>
        <div className="mt-3">
          <button className=" h-[50px] px-4 bg-white text-dark rounded-sm ">
            Request gallery verification
          </button>
        </div>
      </div>
    </div>
  );
}
