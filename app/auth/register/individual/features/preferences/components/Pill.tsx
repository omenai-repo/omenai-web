"use client";

import { useIndividualAuthStore } from "@/store/auth/register/IndividualAuthStore";

type PillProps = {
  text: string;
};
export default function Pill({ text }: PillProps) {
  const [preferences, updatePreference] = useIndividualAuthStore((state) => [
    state.preferences,
    state.updatePreference,
  ]);
  return (
    <button
      onClick={() => updatePreference(text)}
      type="button"
      className={`rounded-full w-fit border border-[#E0E0E0] hover:ring-2 hover:ring-[#E0E0E0]  transition-all ease-linear duration-100 px-3 py-1 ${
        preferences.includes(text)
          ? "bg-dark text-white"
          : "bg-transparent text-dark"
      }`}
    >
      {text}
    </button>
  );
}
