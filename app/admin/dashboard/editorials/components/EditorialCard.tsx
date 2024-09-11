import { getEditorialCoverFileView } from "@/lib/storage/getEditorialCoverFileView";
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi";
import { GoTrash } from "react-icons/go";

export default function EditorialCard({
    cover,
    title,
    minutes,
    link,
    date
}:{
    cover: string,
    title: string,
    minutes: number,
    link: string,
    date: Date | null
}){
    const url = getEditorialCoverFileView(cover);

    return(
        <div className="w-full">
            <div className="relative">
                <img
                    src={url}
                    alt={title}
                    className="w-full object-cover aspect-square object-top"
                />
                <div className="h-full w-full absolute top-0 left-0 hover:bg-black/30 ease-in duration-300 flex justify-end p-[20px] group/overlay overflow-hidden">
                    <div className="opacity-0 group-hover/overlay:opacity-100 group-hover/overlay:translate-x-0 flex ease-in duration-300 translate-x-10  items-center text-[14px] text-red-600 gap-2 px-3 py-2 rounded-full bg-gray-100 h-fit cursor-pointer">
                        <GoTrash />
                        <p>Delete editorial</p>
                    </div>
                </div>
            </div>
            <div className="mt-3 space-y-1">
                <h1 className="text-sm lg:text-md leading-tight font-normal">{title}</h1>
                <p className="text-dark/60">{minutes} minutes read</p>
                <p className="text-dark/60">Posted on <span className="text-dark/90 font-medium">{date !== null && date.getDate()}</span></p>
                <a href={'https://' + link} target="_blank" rel="noopener noreferrer">
                    <div
                        className="hover:text-blue-500 underline text-[14px] flex items-center gap-1 w-fit"
                    >
                        Open link <FiArrowRight />
                    </div>
                </a>
            </div>
        </div>
    )
}