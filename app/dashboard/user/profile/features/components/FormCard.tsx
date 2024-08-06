"use client";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { InputCard } from "./InputCard";
import { updateProfile } from "@/services/update/updateProfile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadSmall } from "@/components/loader/Load";
import { individualProfileUdateStore } from "@/store/individual/individual_profile_update/IndividualProfileUpdateStore";
import Preferences from "./Preferences";

export const FormCard = () => {
  const session = useSession();

  const user = session.data?.user;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [updateData, clearData] = individualProfileUdateStore((state) => [
    state.updateData,
    state.clearData,
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(updateData);

    if (updateData.name === "" && updateData!.preferences!.length === 0)
      toast.error("Invalid inputs");
    else if (
      updateData!.preferences!.length < 5 &&
      updateData!.preferences!.length > 0
    ) {
      toast.error("Please select up to 5 interests please");
    } else {
      setIsLoading(true);

      const { isOk, body } = await updateProfile(
        "individual",
        updateData,
        session.data!.user.id
      );
      if (!isOk) toast.error(body.message);
      else {
        await session.update();
        toast.success(`${body.message}... Please log back in`);
        clearData();
        router.refresh();
      }
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-8 lg:px-2">
      <InputCard
        label="Full name"
        value={user!.name}
        onChange={() => {}}
        labelText="name"
      />
      <InputCard label="Email address" value={user!.email} labelText="email" />

      <div>
        <Preferences />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="whitespace-nowrap bg-dark disabled:bg-[#E0E0E0] disabled:text-[#858585] text-xs rounded-sm w-full text-white disabled:cursor-not-allowed h-[35px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
      >
        {isLoading ? <LoadSmall /> : "Save edit data"}
      </button>
    </form>
  );
};
