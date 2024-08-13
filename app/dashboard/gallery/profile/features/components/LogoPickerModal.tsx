"use client";

import { Modal } from "flowbite-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { galleryLogoUpdate } from "@/store/gallery/gallery_logo_upload/GalleryLogoUpload";
import { LoadSmall } from "@/components/loader/Load";
import { gallery_logo_storage, storage } from "@/appwrite";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
import { updateLogo } from "@/services/update/updateLogo";
import { AnimatePresence, motion } from "framer-motion";
export default function LogoPickerModal() {
  const [modal, updateModal] = galleryLogoUpdate((state) => [
    state.modal,
    state.updateModal,
  ]);
  const logoPickerRef = useRef<HTMLInputElement>(null);

  const session = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [logo, setLogo] = useState<File | null>(null);

  async function handleLogoUpdate() {
    setLoading(true);

    try {
      if (logo) {
        const logoUpdated = await gallery_logo_storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_GALLERY_LOGO_BUCKET_ID!,
          ID.unique(),
          logo
        );

        if (logoUpdated) {
          let file: { bucketId: string; fileId: string } = {
            bucketId: logoUpdated.bucketId,
            fileId: logoUpdated.$id,
          };

          const { isOk, body } = await updateLogo({
            id: session.data!.user.id,
            url: file.fileId,
          });

          if (!isOk) toast.error(body.message);
          else {
            updateModal(false);
            signOut({ callbackUrl: "/auth/login/" });

            toast.success(`${body.message}... Please log back in`);
            router.refresh();
          }
        }
      }
    } catch (error) {
      toast.error("An error has occured, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence key={8}>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              updateModal(false);
            }}
            className="bg-slate-900/20 backdrop-blur py-8 px-2 fixed inset-0 z-50 grid place-items-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-dark p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative h-auto"
            >
              <div className="p-5">
                <p className="text-base font-normal">Upload logo image</p>
              </div>

              <div className="w-full flex justify-center h-full p-5">
                <div className="w-[300px] h-[200px]">
                  {logo ? (
                    <Image
                      src={URL.createObjectURL(logo)}
                      alt="uploaded image"
                      width={300}
                      height={200}
                      className="w-full h-[200px] object-cover mt-2 filter hover:grayscale transition-all duration-200 rounded-lg cursor-not-allowed"
                      onClick={() => {
                        setLogo(null);
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      className="w-full text-xs h-full border border-dark/10 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 hover:border-dark"
                      onClick={() => {
                        logoPickerRef.current?.click();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      Upload logo
                    </button>
                  )}

                  <input
                    type="file"
                    hidden
                    ref={logoPickerRef}
                    onChange={(e) => {
                      // Check if input is actaully an image
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setLogo(e.target.files![0]);
                    }}
                  />
                </div>
              </div>
              <div className=" w-full px-5 py-8 text-xs">
                <div className="w-full items-center gap-x-2 flex">
                  <button
                    className="w-full disabled:cursor-not-allowed whitespace-nowrap disabled:bg-[#E0E0E0] bg-dark rounded-sm text-xs text-white h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
                    onClick={() => updateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogoUpdate}
                    disabled={loading || !logo}
                    className="w-full disabled:cursor-not-allowed whitespace-nowrap disabled:bg-[#E0E0E0] bg-dark rounded-sm text-xs text-white h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
                  >
                    {loading ? <LoadSmall /> : "Upload logo"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
