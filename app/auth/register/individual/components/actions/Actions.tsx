"use client";

import { useIndividualAuthStore } from "@/store/auth/register/IndividualAuthStore";

type ActionButtonTypes = {
  next: string;
};
export default function Actions({ next }: ActionButtonTypes) {
  const [
    currentSignupFormIndex,
    incrementCurrentSignupFormIndex,
    decrementCurrentSignupFormIndex,
  ] = useIndividualAuthStore((state) => [
    state.currentSignupFormIndex,
    state.incrementCurrentSignupFormIndex,
    state.decrementCurrentSignupFormIndex,
  ]);
  return (
    <div className="mt-5 p-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => decrementCurrentSignupFormIndex()}
          className="py-4 px-6 border border-dark"
        >
          Back
        </button>
        <button
          onClick={() => incrementCurrentSignupFormIndex()}
          className="py-4 px-6 border-dark bg-dark text-white"
        >
          {next}
        </button>
      </div>
    </div>
  );
}
