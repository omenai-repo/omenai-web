import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function PriceFilter() {
  return (
    <div className="p-2 ">
      <div className="border border-dark/10 font-light text-dark flex justify-between items-center px-4 py-3 hover:bg-[#FAFAFA] hover:border-dark">
        <p>Filter by Price</p>
        <MdOutlineKeyboardArrowDown />
      </div>
    </div>
  );
}
