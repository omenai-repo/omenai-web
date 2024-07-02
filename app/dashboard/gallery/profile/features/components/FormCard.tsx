"use client";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { InputCard } from "./InputCard";
import { TextareaCard } from "./TextareaCard";
import { galleryProfileUpdate } from "@/store/gallery/gallery_profile_update/GalleryProfileUpdateStore";
import { updateProfile } from "@/services/update/updateProfile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadSmall } from "@/components/loader/Load";

export const FormCard = () => {
  const session = useSession();

  const user = session.data?.user;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [updateData, clearData] = galleryProfileUpdate((state) => [
    state.updateData,
    state.clearData,
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { isOk, body } = await updateProfile(
      "gallery",
      updateData,
      session.data!.user.id
    );
    if (!isOk) toast.error(body.message);
    else {
      await session.update();
      toast.success(`${body.message}... Please log back in`);
      setIsLoading(false);
      clearData();
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-8 lg:px-2">
      <div className="grid grid-cols-2 items-center">
        <InputCard
          label="Gallery name"
          value={user?.name}
          onChange={() => {}}
          labelText="gallery"
        />
        <InputCard
          label="Gallery Email address"
          value={user?.email}
          labelText="email"
          rightComponent={
            <div>
              {user?.verified ? (
                <p className="text-green-400">Verified</p>
              ) : (
                <p className="text-red-500">Verify</p>
              )}
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-2 items-center">
        <InputCard
          label="Location"
          defaultValue={user?.location}
          labelText="location"
        />
        <InputCard label="Admin" defaultValue={user?.admin} labelText="admin" />
      </div>

      <TextareaCard
        label="Gallery description"
        rows={2}
        className="resize-none"
        defaultValue={user?.description}
        name="description"
      />

      <button
        type="submit"
        disabled={
          (!updateData.admin &&
            !updateData.location &&
            !updateData.description) ||
          isLoading
        }
        className="w-full disabled:cursor-not-allowed disabled:bg-[#E0E0E0] bg-dark rounded-sm text-white h-[50px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
      >
        {isLoading ? <LoadSmall /> : "Save edit data"}
      </button>
    </form>
  );
};
