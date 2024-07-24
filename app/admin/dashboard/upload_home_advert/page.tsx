"use client";
import { Timeline } from "flowbite-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AdminUploadInput } from "./components/Input";
import { LoadSmall } from "@/components/loader/Load";
import ImageUpload from "./components/ImageUpload";
import { toast } from "sonner";
import uploadPromotionalContentImage from "../controller/uploadPromotionalCoverImage";
import { createPromotionalData } from "@/services/promotionals/createPromotionalData";
import { promotional_storage } from "@/appwrite";
import { useQueryClient } from "@tanstack/react-query";

export default function Upload() {
  const queryClient = useQueryClient();
  const [cover, setCover] = useState<File | null>(null);
  const [upload_data, set_upload_data] = useState<
    Omit<PromotionalSchemaTypes, "image">
  >({
    headline: "",
    subheadline: "",
    cta: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    set_upload_data((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const acceptedFileTypes = ["jpg", "jpeg", "png"];

  async function handlePromotionalContentUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      upload_data.cta === "" ||
      upload_data.headline === "" ||
      upload_data.subheadline === "" ||
      cover === null
    )
      toast.error(
        "Invalid input parameters, Please fill in all the fields to upload"
      );
    else {
      setLoading(true);
      const type = cover.type.split("/");

      if (!acceptedFileTypes.includes(type[1])) {
        toast.error(
          "File type unsupported. Supported file types are: JPEG, JPG, and PNG"
        );
        setLoading(false);

        return;
      }
      const fileUploaded = await uploadPromotionalContentImage(cover);

      if (fileUploaded) {
        let file: { bucketId: string; fileId: string } = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };

        const data = {
          ...upload_data,
          image: file.fileId,
        };

        const upload_response = await createPromotionalData(data);
        if (!upload_response?.isOk) {
          await promotional_storage.deleteFile(
            process.env.NEXT_PUBLIC_APPWRITE_PROMOTIONAL_BUCKET_ID!,
            file.fileId
          );
          toast.error(upload_response?.message);
          setCover(null);
          setLoading(false);
        } else {
          setLoading(false);
          toast.success(upload_response.message);
          queryClient.invalidateQueries();
          set_upload_data({ headline: "", subheadline: "", cta: "" });
          setCover(null);
        }
      } else {
        toast.error(
          "Error uploading cover image. Please try again or contact IT support"
        );
      }
    }
    setLoading(false);
  }

  return (
    <div className="md:container">
      <form onSubmit={handlePromotionalContentUpload}>
        <div className=" mt-5 mb-[3rem]">
          <h1 className="divide-y text-sm ">Create a promotional content</h1>
        </div>
        <Timeline>
          {/* Item */}
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <AdminUploadInput
                label={"Headline"}
                name={"headline"}
                handleChange={handleInputChange}
                value={upload_data.headline}
              />
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <AdminUploadInput
                label={"Sub headline"}
                name={"subheadline"}
                handleChange={handleInputChange}
                value={upload_data.subheadline}
              />
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <AdminUploadInput
                label={"Call to action (A link to the promotional resource)"}
                name={"cta"}
                handleChange={handleInputChange}
                value={upload_data.cta}
              />
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="Cover" className="text-xs">
                  Cover image
                </label>
                <label
                  htmlFor="label_description"
                  className="text-xs text-red-600 font-semibold"
                >
                  Note: Uploading a landscaped or square-shaped image would be
                  most ideal for display
                </label>
              </div>
              <ImageUpload cover={cover} setCover={setCover} />
            </Timeline.Content>
          </Timeline.Item>
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <div className="flex flex-col gap-3">
                <label htmlFor="Cover" className="text-xs">
                  Upload content
                </label>
                <button
                  disabled={loading}
                  type="submit"
                  className={`whitespace-nowrap bg-dark text-xs disabled:bg-[#E0E0E0] disabled:text-[#858585] rounded-sm w-full text-white disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80 `}
                >
                  {loading ? <LoadSmall /> : "Upload promotional content"}
                </button>
              </div>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </form>
    </div>
  );
}
