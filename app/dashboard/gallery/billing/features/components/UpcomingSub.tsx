import { daysLeft } from "@/utils/daysLeft";
import { formatIntlDateTime } from "@/utils/formatIntlDateTime";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { getFutureDate } from "@/utils/getFutureDate";
import { formatPrice } from "@/utils/priceFormatter";
import Image from "next/image";
export default function UpcomingSub({
  sub_data,
}: {
  sub_data: SubscriptionModelSchemaTypes & {
    created: string;
    updatedAt: string;
  };
}) {
  const currency_symbol = getCurrencySymbol(
    sub_data.next_charge_params.currency
  );

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
            <h1 className="font-bold text-xs">
              Omenai {sub_data.plan_details.type}
            </h1>
            <p className="font-normal text-[13px]">
              {daysLeft(sub_data.expiry_date)} days left
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-bold">
            {formatPrice(sub_data.next_charge_params.value, currency_symbol)}
          </h1>
          <p className="text-[13px] self-end">
            {sub_data.plan_details.interval.replace(/^./, (char) =>
              char.toUpperCase()
            )}
          </p>
        </div>
      </div>
      <div className=" mt-5 w-full">
        <div className="flex flex-col gap-2 items-center justify-between px-4 font-semibold py-2 rounded-full bg-[#fafafa] text-[13px] ring-1 ring-[#e0e0e0]">
          <p className="whitespace-nowrap">
            <span className="font-bold">From:</span>{" "}
            {formatIntlDateTime(sub_data.expiry_date)}
          </p>
          <p className="whitespace-nowrap">
            <span className="font-bold">To:</span>{" "}
            {getFutureDate(
              sub_data.expiry_date,
              sub_data.plan_details.interval
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
