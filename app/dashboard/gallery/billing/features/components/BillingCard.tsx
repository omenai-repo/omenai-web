import Image from "next/image";
import { FaPen } from "react-icons/fa6";

export default function BillingCard({
  expiry,
  first_6digits,
  last_4digits,
  type,
}: {
  expiry: string;
  first_6digits: string;
  last_4digits: string;
  type: string;
}) {
  return (
    <div className="rounded-md ring-1 ring-[#e0e0e0] bg-no-repeat text-dark bg-blend-overlay p-5 relative w-full h-[200px]">
      <div className="w-full flex justify-start relative z-10 my-2">
        <p className="text-dark text-xs font-semibold">Billing card details</p>
      </div>
      {/* Icon */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <div className="flex space-x-3 items-center">
            <p className="text-xs text-dark font-bold dark whitespace-nowrap tracking-widest">
              {first_6digits} ** **** {last_4digits}
            </p>
          </div>
          <p className="text-normal text-xs font-normal text-dark ">{expiry}</p>
        </div>

        <Image
          src={`/icons/${type.toLowerCase()}.png`}
          alt={`${type.toLowerCase()} logo`}
          height={20}
          width={40}
          className="w-fit h-fit"
        />
      </div>
      <div className="w-full flex justify-start absolute bottom-5 left-4">
        <button className="flex gap-2 items-center disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm text-[13px] bg-dark h-[40px] px-4 text-white hover:bg-dark/90">
          <FaPen />
          <span>Update Card info</span>
        </button>
      </div>
    </div>
  );
}
