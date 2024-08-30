import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import Filter from "./components/filters/Filter";
import { ArtworksListing } from "./components/ArtworksListing";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page({ params }: { params: { id: string[] } }){
    const session = await getServerSession(nextAuthOptions);

    const pageTitleParser = () => {
        let decodedId = decodeURIComponent(params.id[0]);
        return decodedId
    }

    return(
        <main>
            <DesktopNavbar />
            <div className="h-full w-full text-black pt-10 pb-5 px-4 md:px-8">
                <h1 className="text-lg lg:text-xl font-normal">{pageTitleParser()}</h1>
                <div className="flex items-center gap-2">
                    <Link 
                        href={'/collections'} 
                        className="opacity-80 hover:opacity-100 hover:underline"
                    > Art collections</Link>
                    <p>/</p>
                    <Link 
                        href={`/collection/${params.id[0]}`}
                        className="opacity-80 hover:opacity-100 hover:underline"
                    >{pageTitleParser()}</Link>
                </div>
            </div>
            <div>
                <Filter medium={params.id[0]} />
                <div className="px-4 md:px-8">
                    <ArtworksListing 
                        medium={pageTitleParser()} 
                        sessionId={
                            session?.user.role === "user" ? session?.user.id : undefined
                        }
                    />
                </div>
            </div>
        </main>
    )
}