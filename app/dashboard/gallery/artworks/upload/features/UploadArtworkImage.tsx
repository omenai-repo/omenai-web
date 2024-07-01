"use client";
/* eslint-disable @next/next/no-img-element */
import { galleryArtworkUploadStore } from "@/store/gallery/gallery_artwork_upload/GalleryArtworkUpload";
import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import uploadImage from "@/services/artworks/uploadArtworkImage";
import { createUploadedArtworkData } from "@/utils/createUploadedArtworkData";
import { uploadArtworkData } from "@/services/artworks/uploadArtworkData";
import { storage } from "@/appwrite";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadSmall } from "@/components/loader/Load";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadArtworkImage() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [image, setImage, artworkUploadData, clearData] =
    galleryArtworkUploadStore((state) => [
      state.image,
      state.setImage,
      state.artworkUploadData,
      state.clearData,
    ]);

  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  const acceptedFileTypes = ["jpg", "jpeg", "png"];

  const queryClient = useQueryClient();

  async function handleArtworkUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (image) {
      const type = image.type.split("/");
      if (!acceptedFileTypes.includes(type[1])) {
        toast.error(
          "File type unsupported. Supported file types are: JPEG, JPG, and PNG"
        );
        setLoading(false);
        return;
      }
      const fileUploaded = await uploadImage(image);

      if (fileUploaded) {
        let file: { bucketId: string; fileId: string } = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };

        const data = createUploadedArtworkData(
          artworkUploadData,
          file.fileId,
          session.data!.user.id
        );

        const upload_response = await uploadArtworkData(data);
        if (!upload_response?.isOk) {
          await storage.deleteFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
            file.fileId
          );
          toast.error(upload_response!.body.message);
          setImage(null);
          setLoading(false);
        } else {
          setLoading(false);
          toast.success(upload_response!.body.message);
          queryClient.invalidateQueries({ queryKey: ["fetch_artworks_by_id"] });
          clearData();
          router.replace("/dashboard/gallery/artworks");
        }
      }
    } else {
      toast.error("Please select an image");
    }
  }
  return (
    <form onSubmit={handleArtworkUpload}>
      <div className="w-full h-[60vh] grid place-items-center">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="uploaded image"
            className="w-auto h-auto max-h-[60vh] max-w-full object-cover mt-2 filter hover:grayscale transition-all duration-200 rounded-lg cursor-not-allowed"
            onClick={() => {
              setImage(null);
            }}
          />
        ) : (
          <button
            type="button"
            className="w-[400px] h-[400px] border border-[#E0E0E0] bg-white rounded-sm text-xs outline-none p-5 focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 hover:border-dark"
            onClick={() => {
              imagePickerRef.current?.click();
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
            Upload image
          </button>
        )}

        <input
          type="file"
          hidden
          ref={imagePickerRef}
          onChange={(e) => {
            // Check if input is actaully an image
            if (!e.target.files![0].type.startsWith("image/")) return;
            setImage(e.target.files![0]);
          }}
        />
      </div>
      <div className="mt-4 flex w-full text-xs">
        <button
          disabled={loading || !image}
          className={`bg-dark rounded-sm disabled:cursor-not-allowed disabled:bg-[#E0E0E0] text-white h-[50px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80 w-full`}
          type="submit"
        >
          {loading ? <LoadSmall /> : "Upload artwork"}
        </button>
      </div>
    </form>
  );
}
