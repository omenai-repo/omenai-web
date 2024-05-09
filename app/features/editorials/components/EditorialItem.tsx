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
  const image_href = getEditorialImageFilePreview(image, 400);

  return (
    <>
      {" "}
      <div className="px-2 py-8 bg-transaparent flex flex-col gap-[1rem] h-full w-full">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image_href}
            alt={"article_image"}
            className="w-full h-[300px] object-cover object-top"
          />
        ) : (
          <NoCover />
        )}
        <div className="flex flex-col gap-[1rem] mx-0">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <p className="text-dark text-xs">
              <span>by</span>{" "}
              <span className="font-normal text-xs">Olabisi Onabanjo</span>
            </p>
            <p></p>
            <p className="text-dark/60 text-xs">{minutes} minutes read</p>{" "}
            {/* <span className="font-medium">•</span> */}
            {/* <span className="font-medium">•</span> */}
          </div>
          <div className="flex flex-col gap-2">
            <Link href={`articles/${id}/${title}`}>
              <h1 className="text-sm leading-tight font-normal ">{title}</h1>
            </Link>

            <p className="text-dark text-xs">{summary}</p>
          </div>

          <Link href={`articles/${id}/${title}`}>
            <p className="flex items-center gap-x-2 underline text-xs">
              Read full article <MdArrowRightAlt />
            </p>{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
