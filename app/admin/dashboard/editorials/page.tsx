"use client"

import { useEffect, useState } from "react";
import EditorialCard from "./components/EditorialCard";
import { editorial_database } from "@/appwrite";
import Load from "@/components/loader/Load";

export default function page(){
    const [loading, setLoading] = useState<boolean>(false);
    const [editorials, setEditorials] = useState<EditorialSchemaTypes[]>([])

    useEffect(() => {
        async function handleFetchEditorials(){
            setLoading(true);

            const editorials = await editorial_database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_DATABASE_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_COLLECTION_ID!,
            );

            if(editorials.total > 0){
                setEditorials(editorials.documents)
            }
    
            setLoading(false);
        }

        handleFetchEditorials()
    }, [])

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {editorials.length > 0 && editorials.map((editorial, index) => (
                    <EditorialCard 
                        cover={editorial.cover}
                        title={editorial.title}
                        link={editorial.link}
                        minutes={editorial.minutes}
                        date={editorial.date}
                        index={index}
                    />
                ))}
                {editorials.length === 0 && (
                    <p>Nothing to display</p>
                )}
            </div>
        </div>
    )
}