"use client"

import { useEffect, useState } from "react";
import EditorialCard from "./components/EditorialCard";
import { editorial_database } from "@/appwrite";
import Load from "@/components/loader/Load";
import { useQuery } from "@tanstack/react-query";
import EditorialListingItem from "./components/EditorialListingItem";

export default function page(){
    // const [loading, setLoading] = useState<boolean>(false);
    // const [editorials, setEditorials] = useState<EditorialSchemaTypes[]>([])

    function reverseArray(arr: any[]) {
        let reversedArr = [];
        
        for (let i = arr.length - 1; i >= 0; i--) {
          reversedArr.push(arr[i]);
        }
        
        return reversedArr;
    }

    const { data: editorials, isLoading: loading } = useQuery({
        queryKey: ["promotional_data"],
        queryFn: async () => {
            const response = await editorial_database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_COLLECTION_ID!,
            );
    
          if (response?.documents) {
            return reverseArray(response.documents)
          } else throw new Error("Something went wrong");
        },
    });

    if (loading) {
        return (
          <div className="h-[75vh] w-full grid place-items-center">
            <Load />
          </div>
        );
    }

    return(
        <div>
            <div className="mt-5 my-[3rem]">
                <h1 className="divide-y text-sm ">Omenai Editorials</h1>
            </div>
            <div className="flex flex-col gap-5 pb-10">
                {editorials && editorials.map((editorial, index) => (
                    <EditorialListingItem 
                        cover={editorial.cover}
                        title={editorial.title}
                        link={editorial.link}
                        minutes={editorial.minutes}
                        date={editorial.date}
                        key={index}
                        documentId={editorial.$id}
                    />
                ))}
                {editorials?.length === 0 && (
                    <p>Nothing to display</p>
                )}
            </div>
        </div>
    )
}