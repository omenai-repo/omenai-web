import { MdOutlineClear } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

export default function FilterActions() {
  return (
    <div className="w-full">
      <button className="flex items-center gap-x-4 bg-[#FAFAFA] border border-dark/10 py-3 px-4">
        <span>Apply Filters</span>
        <MdOutlineClear />
      </button>
    </div>
  );
}