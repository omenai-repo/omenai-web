"use client";
import SearchInput from "@/components/navbar/ui/SearchInput";

export default function DefaultHeroSlides() {
  return (
    <section className="w-full md:p-0">
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 items-center bg-[#fafafa]">
        <div className="col-span-1">
          <img
            className="w-full max-h-[500px] object-fit object-bottom h-[400px] md:h-[500px]"
            src="/images/hero.jpg"
            alt="hero image"
          />
        </div>
        <div className="w-full col-span-1 lg:col-span-2 flex flex-col gap-y-4 container pb-8 px-4 mx-auto justify-center lg:w-7/8 xl:w-3/4 sm:w-full">
          <div className="w-full flex flex-col space-y-4 justify-center ">
            <h1 className="text-md sm:text-lg lg:text-xl xl:text-2xl md:w-full my-5 md:my-0 font-normal text-center md:text-left leading-tight drop-shadow-2xl">
              Shop your Favorite artworks and collections
            </h1>
            <p className="text-xs md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              molestiae sint deleniti inventore sequi saepe eius fuga, quod quam
              expedita.
            </p>
            <SearchInput />
          </div>
        </div>
      </div>
      <hr className="border-dark/10" />
    </section>
  );
}
