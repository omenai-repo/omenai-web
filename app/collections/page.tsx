import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import { collections } from "@/constants/collections.constants";
import ArtCollectionCard from "./components/ArtCollectionCard";

export default function page(){
    return(
        <main>
            <DesktopNavbar />
            <div className="h-full w-full text-black pt-10 pb-5 px-4 md:px-8">
                <h1 className="text-lg lg:text-xl font-normal">Art Collections</h1>
            </div>
            <div className="px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
                {collections.map((collection, index) => (
                    <ArtCollectionCard
                        key={index}
                        title={collection.title}
                        url={collection.url}
                    />
                ))}
            </div>
        </main>
    )
}