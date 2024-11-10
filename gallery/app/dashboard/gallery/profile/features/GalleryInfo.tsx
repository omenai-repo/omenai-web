"use client";
import { FormCard } from "./components/FormCard";
import LogoPickerModal from "./components/LogoPickerModal";
import { galleryLogoUpdate } from "@/store/gallery/gallery_logo_upload/GalleryLogoUpload";
import { useSession } from "next-auth/react";
import { getGalleryLogoFileView } from "@/lib/storage/getGalleryLogoFileView";
export default function GalleryInfo() {
  const [updateModal] = galleryLogoUpdate((state) => [state.updateModal]);
  const { data: session } = useSession();
  let logo;

  if (session!.user.logo === "") logo = "/icons/profile.png";
  else logo = getGalleryLogoFileView(session!.user.logo, 80);

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
            alt="gallery logo"
            className="w-auto max-w-[60px] h-auto max-h-[60px]"
          />
        </div>
        <p className="text-dark px-5 lg:px-2 text-xs">Edit profile logo</p>
      </div>

      <FormCard />
    </div>
  );
}
