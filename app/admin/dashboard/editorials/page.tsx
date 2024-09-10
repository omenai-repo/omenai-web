import EditorialCard from "./components/EditorialCard";

export default function page(){
    return(
        <div>
            <div className=" mt-5 my-[3rem]">
                <h1 className="divide-y text-sm ">Omenai Editorials</h1>
            </div>
            <div className="grid grid-cols-4 gap-5">
                <EditorialCard 
                    cover=""
                    title="A Sketch At A Time: In Conversation with Musa Ganiyy"
                    link="/"
                    minutes={5}
                    date="12"
                />
            </div>
        </div>
    )
}