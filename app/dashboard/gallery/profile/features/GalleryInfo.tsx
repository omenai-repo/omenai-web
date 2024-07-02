"use client";
import Image from "next/image";
import { FormCard } from "./components/FormCard";
import LogoPickerModal from "./components/LogoPickerModal";
import { galleryLogoUpdate } from "@/store/gallery/gallery_logo_upload/GalleryLogoUpload";
import { useSession } from "next-auth/react";
export default function GalleryInfo() {
  const [updateModal] = galleryLogoUpdate((state) => [state.updateModal]);
  const session = useSession();
  let logo;

  if (session.data!.user.logo === "") logo = "/icons/profile.png";
  else logo = session.data!.user.logo;
  return (
    <div>
      <LogoPickerModal />
      <div
        className="flex gap-3 items-center my-5 cursor-pointer"
        onClick={() => updateModal(true)}
      >
        <div className=" bg-[#eee] flex items-center justify-center">
          <img
            src={logo}
            alt="icon"
            className="w-auto max-w-[80px] h-auto max-h-[80px]"
          />
        </div>
        <p className="text-dark px-5 lg:px-2 text-xs">Edit profile logo</p>
      </div>

      <FormCard />
    </div>
  );
}
