"use client";

import { useState, ChangeEvent } from "react";
import ImageUpload from "../components/ImageUpload";
import { AdminUploadInput } from "../components/Input";
import DateInput from "../components/DateInput";
import { LoadSmall } from "@/components/loader/Load";

export default function page(){
    const [cover, setCover] = useState<File | null>(null);
    const [upload_data, set_upload_data] = useState<Omit <EditorialSchemaTypes, "cover">>({
        title: "",
        minutes: 1,
        date: "",
        link: ""
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
    
        set_upload_data((prev) => {
          return { ...prev, [name]: value };
        });
      };

    return(
        <div>
            <div className="mt-5 my-[3rem]">
                <h1 className="divide-y text-sm ">Upload Editorial</h1>
            </div>
            <div className="flex gap-5">
                <div className="">
                    <ImageUpload cover={cover} setCover={setCover} />
                </div>
                <form className="flex-1">
                    <div className="w-full flex flex-col gap-4">
                        <AdminUploadInput
                            handleChange={handleInputChange}
                            label="Title"
                            value={upload_data.title}
                            name="title"
                        />
                        <AdminUploadInput
                            handleChange={handleInputChange}
                            label="Link"
                            value={upload_data.link}
                            name="link"
                        />
                        <div className="flex items-center flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <AdminUploadInput
                                    handleChange={handleInputChange}
                                    label="Minutes read"
                                    value={upload_data.minutes}
                                    inputType="number"
                                    name="minutes"
                                />
                            </div>
                            <DateInput 
                                label="Date posted"
                                value="20"
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