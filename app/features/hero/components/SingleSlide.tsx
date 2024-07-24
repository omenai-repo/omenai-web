"use client";
import { getPromotionalFileView } from "@/lib/storage/getPromotionalsFileView";
import Link from "next/link";

export default function SingleSlide({
  headline,
  subheadline,
  cta,
  image,
}: PromotionalSchemaTypes) {
  const image_url = getPromotionalFileView(image, 400, 500, "webp");

  return (
    <section className="w-full md:p-0">
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center bg-[#fafafa]">
        <div className="col-span-1">
          <img
            className="w-full max-h-[300px] md:max-h-[500px] object-fit object-bottom h-[300px] md:h-[500px]"
            src={image_url}
            alt={`hero image ${headline}`}
          />
        </div>
        <div className="w-full col-span-1 lg:col-span-2 flex flex-col gap-y-4 container pb-8 px-4 mx-auto justify-center lg:w-7/8 xl:w-3/4 sm:w-full">
          <div className="w-full flex flex-col space-y-4 justify-center ">
            <h1 className="text-md sm:text-lg lg:text-xl xl:text-2xl md:w-full my-5 md:my-0 font-normal text-center md:text-left leading-tight drop-shadow-2xl ">
              {headline}
            </h1>
            <p className="text-xs md:text-base">{subheadline}</p>
            <Link href={cta}>
              <button className="grid disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm bg-dark h-[40px] px-4 text-xs text-white hover:bg-dark/90">
                View resource
              </button>
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-dark/10" />
    </section>
  );
}
