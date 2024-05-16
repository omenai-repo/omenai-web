"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { toast } from "sonner";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchTerm === "") toast.error("Please include a search term");
      else router.push(`/search?searchTerm=${searchTerm}`);
    }
  };
  const handleIconTrigger = () => {
    if (searchTerm === "") toast.error("Please include a search term");
    else router.push(`/search?searchTerm=${searchTerm}`);
  };
  return (
    <div className="relative flex justify-between gap-x-5 items-center px-3 py-2 rounded-full border bg-[#FAFAFA] border-dark/30">
      <input
        type="text"
        className="w-full py-[0.3rem] bg-[#FAFAFA] px-3 border-none rounded-sm placeholder:text-xs placeholder:font-normal focus:border-none focus:ring-0 focus:border-0"
        placeholder="Search for anything"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div
        className=" text-xs flex items-center gap-x-2 bg-dark rounded-full text-white w-fit h-full py-2 border border-dark px-3 cursor-pointer"
        onClick={handleIconTrigger}
      >
        Search
        <CiSearch />
      </div>
    </div>
  );
}
