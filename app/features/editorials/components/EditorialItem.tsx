import NoCover from "@/app/secure/components/NoCover";
import { getEditorialImageFilePreview } from "@/app/secure/editorial/admin/lib/getEditorialImageFilePreview";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

export type EditorialItemProps = {
  title: string;
  date: string;
  minutes: string;
  image: string;
  summary: string;
  id: string;
};
export default function EditorialItem({
  title,
  date,
  minutes,
  image,
  summary,
  id,
}: EditorialItemProps) {
  return (
    <>
      {" "}
      <div className="px-2 py-8 bg-transaparent flex flex-col gap-[1rem] h-full w-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/images/${image}.jpg`}
            alt={"article_image"}
            className="w-full object-cover aspect-square object-top"
          />
        ) : (
          <NoCover />
        )}
        <div className="flex flex-col gap-[1rem] mx-0">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <p className="text-dark/60 text-xs">{minutes} minutes read</p>{" "}
            {/* <span className="font-normal">•</span> */}
            {/* <span className="font-normal">•</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm lg:text-md leading-tight font-normal ">
              {title}
            </h1>

            {/* <p className="text-[#858585] italic text-base">{summary}</p> */}
          </div>
          <p className="flex items-center gap-x-2 underline text-xs">
            Read full article <MdArrowRightAlt />
          </p>{" "}
        </div>
      </div>
    </>
  );
}
