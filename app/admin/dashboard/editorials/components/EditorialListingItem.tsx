import { getEditorialCoverFileView } from "@/lib/storage/getEditorialCoverFileView";
import { adminModals } from "@/store/admin/AdminModalsStore";
import { GoTrash } from "react-icons/go";
import { MdArrowRightAlt } from "react-icons/md";

export default function EditorialListingItem({
    cover,
    title,
    minutes,
    link,
    date,
    documentId
}:{
    cover: string,
    title: string,
    minutes: number,
    link: string,
    date: Date | null,
    documentId: string
}){
    const url = getEditorialCoverFileView(cover);

    const { setShowDeleteEditorialModal } = adminModals();

    return(
        <div className="w-full flex gap-5">
            <div className="flex-1 flex gap-5">
                <div className="relative w-[200px]">
                    <img
                        src={url}
                        alt={title}
                        className="w-full object-cover aspect-square object-top"
                    />
                    <div className="h-full w-full absolute top-0 left-0 hover:bg-black/30 ease-in duration-300 flex justify-end p-[20px] group/overlay overflow-hidden">
                        <div onClick={() => setShowDeleteEditorialModal(true, documentId)} className="opacity-0 group-hover/overlay:opacity-100 group-hover/overlay:translate-x-0 flex ease-in duration-300 translate-x-10  items-center text-[14px] text-red-600 gap-2 px-3 py-2 rounded-full bg-gray-100 h-fit cursor-pointer">
                            <GoTrash />
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-sm lg:text-md leading-tight font-normal">{title}</h1>
                    <p className="text-dark/60 text-xs">{minutes} minutes read</p>
                </div>
            </div>
            <div className="flex jusitfy-end gap-2">
                <a href={'https://' + link} target="_blank" rel="noopener noreferrer">
                    <p className="flex items-center gap-x-2 underline text-xs">
                        Read full article <MdArrowRightAlt />
                    </p>
                </a>
            </div>
        </div>
    )
}