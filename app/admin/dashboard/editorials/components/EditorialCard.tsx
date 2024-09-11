import { getEditorialCoverFileView } from "@/lib/storage/getEditorialCoverFileView";
import Link from "next/link"

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
    date: string
}){
    const url = getEditorialCoverFileView(cover);

    return(
        <div className="w-full">
            <img
                src={url}
                alt={title}
                className="w-full object-cover aspect-square object-top"
            />
            <div className="mt-2">
                <h1 className="text-sm lg:text-md leading-tight font-normal">{title}</h1>
                <p className="text-dark/60 text-xs">{minutes} minutes read</p>
                <Link href={link}>Open link</Link>
            </div>
        </div>
    )
}