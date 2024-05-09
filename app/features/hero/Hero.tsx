"use client";
import SearchInput from "@/components/navbar/ui/SearchInput";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="w-full grid md:grid-cols-2 p-4 md:p-8 gap-8 items-center">
        <div className="w-full lg:w-2/3">
          <div className="w-full flex justify-center">
            <h1 className="text-xl md:text-2xl sm:w-2/3 md:w-full my-5 md:my-0 font-medium text-center md:text-left leading-tight drop-shadow-2xl">
              Shop your Favorite artworks and collections
            </h1>
          </div>

          <SearchInput />
        </div>
        <div>
          <img
            className="w-full max-h-[400px] h-auto"
            src="/images/hero.jpg"
            alt="hero image"
          />
        </div>
      </div>
      <hr className="border-dark/10" />
    </section>
  );
}
