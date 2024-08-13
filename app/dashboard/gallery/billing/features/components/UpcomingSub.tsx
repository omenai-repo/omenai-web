import { daysLeft } from "@/utils/daysLeft";
import { formatIntlDateTime } from "@/utils/formatIntlDateTime";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getFutureDate } from "@/utils/getFutureDate";
import { formatPrice } from "@/utils/priceFormatter";
import Image from "next/image";
export default function UpcomingSub({
  sub_status,
  plan_details,
  payment,
  end_date,
  start_date,
}: {
  sub_status: string;
  end_date: Date;
  start_date: Date;
  payment: { value: number; currency: string };
  plan_details: {
    value: { monthly_price: string; annual_price: string };
    currency: string;
    type: string;
    interval: "monthly" | "yearly";
  };
}) {
  const currency_symbol = getCurrencySymbol(payment.currency);

  return (
    <div className="ring-1 ring-[#e0e0e0] rounded-md p-5 h-[200px] relative">
      <div className="w-full flex justify-start relative z-10 my-2">
        <p className="text-dark text-xs font-semibold">Upcoming</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Image
            src={"/omenai_logo_cut.png"}
            width={20}
            height={20}
            alt="Omenai logo cut"
            className="w-fit h-fit"
          />
          <div>
            <h1 className="font-bold text-xs">Omenai {plan_details.type}</h1>
            <p className="font-normal text-[13px]">
              {daysLeft(end_date)} days left
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold">
            {formatPrice(payment.value, currency_symbol)}
          </h1>
          <p className="text-[13px] self-end">{plan_details.interval}</p>
        </div>
      </div>
      <div className=" mt-5 w-full">
        <div className="flex items-center gap-x-4 px-4 font-semibold py-1 rounded-full bg-[#fafafa] text-[13px] ring-1 ring-[#e0e0e0]">
          <p>
            <span className="font-bold">From:</span>{" "}
            {formatIntlDateTime(end_date)}
          </p>
          <p>
            <span className="font-bold">To:</span>{" "}
            {getFutureDate(end_date, plan_details.interval)}
          </p>
        </div>
      </div>
    </div>
  );
}
