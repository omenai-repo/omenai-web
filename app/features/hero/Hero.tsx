"use client";
import SearchInput from "@/components/navbar/ui/SearchInput";

export default function Hero() {
  return (
    <section className="w-full md:p-0">
      <div className="w-full grid md:grid-cols-2 gap-8 items-center bg-[#fafafa]">
        <div>
          <img
            className="w-full max-h-[500px] h-auto"
            src="/images/hero.jpg"
            alt="hero image"
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 container pb-8 px-4 mx-auto justify-center lg:w-7/8 xl:w-3/4 sm:w-full">
          <div className="w-full flex justify-center ">
            <h1 className="text-md sm:text-lg lg:text-xl xl:text-2xl md:w-full my-5 md:my-0 font-normal text-center md:text-left leading-tight drop-shadow-2xl">
              Shop your Favorite artworks and collections
            </h1>
          </div>

          <SearchInput />
        </div>
      </div>
      <hr className="border-dark/10" />
    </section>
  );
}
