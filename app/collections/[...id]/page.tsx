import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { collections } from "@/constants/collections.constants";
import { useEffect, useState } from "react";
import Filter from "./components/filters/Filter";
import { ArtworksListing } from "./components/ArtworksListing";
import { useQuery } from "@tanstack/react-query";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";

export default async function page({ params }: { params: { id: string[] } }){
    const session = await getServerSession(nextAuthOptions);

    function getImageUrl(){
        const selectedCollection = collections.filter(collection => collection.title === params.id[0]);
        return(`/images/${selectedCollection[0].url}.jpg`)
    };

    return(
        <main>
            <DesktopNavbar />
            <div className="w-full bg-black/10 bg-cover bg-no-repeat" style={{backgroundImage: `url(${getImageUrl()})`}}>
                <div className="h-full w-full px-[20px] md:px-[50px] text-white py-10 bg-[#00000070]">
                    <h1 className="text-md font-normal">{params.id[0]}</h1>
                    <p className="text-sm opacity-90 font-normal italic">
                        Fresh Off the Easel: Explore the Newest Masterpieces, Just for You
                    </p>
                </div>
            </div>
            <div>
                <Filter medium={params.id[0]} />
                <div className="px-4 md:px-8">
                    <ArtworksListing 
                        medium={params.id[0]} 
                        sessionId={
                            session?.user.role === "user" ? session?.user.id : undefined
                        }
                    />
                </div>
            </div>
        </main>
    )
}