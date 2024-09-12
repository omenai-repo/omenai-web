"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import ImageUpload from "../components/ImageUpload";
import { AdminUploadInput } from "../components/Input";
import DateInput from "../components/DateInput";
import { LoadSmall } from "@/components/loader/Load";
import toast from "react-hot-toast";
import uploadEditorialCoverImage from "../../controller/uploadEditorialCoverImage";
import uploadEditorialDocument from "../../controller/uploadEditorialDocument";
import { editorial_storage } from "@/appwrite";
import { useRouter } from "next/navigation";

export default function page(){
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const [cover, setCover] = useState<File | null>(null);
    const [upload_data, set_upload_data] = useState<Omit <EditorialSchemaTypes, "cover">>({
        title: "",
        minutes: "",
        date: new Date(),
        link: ""
    });

    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
    
        set_upload_data((prev) => {
          return { ...prev, [name]: value };
        });
    };

    const handleEditorialUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(
            upload_data.title === "" ||
            upload_data.link === "" ||
            upload_data.minutes === "" ||
            upload_data.date === null ||
            cover === null
        )toast.error(
            "Invalid input parameters, Please fill in all the fields to upload"
        );
        else{
            setLoading(true)

            const fileUploaded = await uploadEditorialCoverImage(cover);

            if(fileUploaded){
                let file: { bucketId: string; fileId: string } = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                };
        
                const data = {
                    ...upload_data,
                    cover: file.fileId,
                };

                const documentUploaded = await uploadEditorialDocument(data);

                if(!documentUploaded){
                    await editorial_storage.deleteFile(
                        process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_BUCKET_ID!,
                        file.fileId
                    );
                    toast.error("Something went wrong uploading editorial, try aagin");
                    setCover(null);
                }else{
                    setLoading(false);
                    toast.success("Successfully uploaded editorial, redirecting...");
                    setCover(null);

                    router.replace("/admin/dashboard/editorials");
                    router.refresh();
                }

            }else{
                toast.error(
                    "Error uploading cover image. Please try again or contact IT support"
                );
            }
        };

        setLoading(false)
    }

    return(
        <div>
            <div className="mt-5 my-[3rem]">
                <h1 className="divide-y text-sm ">Upload Editorial</h1>
            </div>
            <div className="flex gap-5">
                <div className="">
                    <ImageUpload cover={cover} setCover={setCover} />
                </div>
                <form className="flex-1" onSubmit={handleEditorialUpload}>
                    <div className="w-full flex flex-col gap-4">
                        <AdminUploadInput
                            handleChange={handleInputChange}
                            label="Title"
                            value={upload_data.title}
                            name="title"
                            placeholder="Editorial title"
                        />
                        <AdminUploadInput
                            handleChange={handleInputChange}
                            label="Link"
                            placeholder="www.example.com"
                            value={upload_data.link}
                            name="link"
                        />
                        <div className="flex items-center flex-col lg:flex-row gap-4 w-full">
                            <div className="w-full flex-1">
                                <AdminUploadInput
                                    handleChange={handleInputChange}
                                    label="Minutes read"
                                    placeholder="1"
                                    value={upload_data.minutes}
                                    name="minutes"
                                />
                            </div>
                            <DateInput 
                                label="Date posted"
                                value={upload_data.date}
                                setDate={date => {
                                    set_upload_data((prev) => {
                                        return { ...prev, date: date};
                                    });
                                }}
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className={`whitespace-nowrap bg-dark text-xs disabled:bg-[#E0E0E0] disabled:text-[#858585] rounded-sm w-full text-white disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80 mt-5`}
                        >
                            {loading ? <LoadSmall /> : "Upload new editorial"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}