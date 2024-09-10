"use client";

import { useState, ChangeEvent } from "react";
import ImageUpload from "../components/ImageUpload";
import { AdminUploadInput } from "../components/Input";

export default function page(){
    const [cover, setCover] = useState<File | null>(null);
    const [upload_data, set_upload_data] = useState<Omit <EditorialSchemaTypes, "cover">>({
        title: "",
        minutes: 0,
        date: "",
        link: ""
    });

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
                <div className="flex-1 flex flex-col gap-2">
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
                    <AdminUploadInput
                        handleChange={handleInputChange}
                        label="Minutes read"
                        value={upload_data.minutes}
                        inputType="number"
                        name="minutes"
                    />
                </div>
            </div>
        </div>
    )
}