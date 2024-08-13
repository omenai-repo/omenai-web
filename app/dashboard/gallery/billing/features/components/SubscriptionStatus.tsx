"use client";
import { galleryModalStore } from "@/store/gallery/gallery_modals/GalleryModals";
import { formatIntlDateTime } from "@/utils/formatIntlDateTime";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { formatPrice } from "@/utils/priceFormatter";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

export default function SubDetail({
  sub_status,
  plan_details,
  payment,
  end_date,
}: {
  sub_status: string;
  end_date: Date;
  payment: { value: number; currency: string };
  plan_details: {
    value: { monthly_price: string; annual_price: string };
    currency: string;
    type: string;
    interval: string;
  };
}) {
  const [updateOpenModal] = galleryModalStore((state) => [
    state.updateOpenModal,
  ]);

  const currency_symbol = getCurrencySymbol(payment.currency);
  return (
    <div className="ring-1 ring-[#e0e0e0] rounded-md p-5 h-[200px] relative">
      <div className="w-full flex justify-start relative z-10 my-2">
        <p className="text-dark text-xs font-semibold">Subscription Info</p>
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
            <p className="font-semibold text-[12px]">
              Next Due: {formatIntlDateTime(end_date)}
            </p>
            <p className=" text-[13px] text-green-600 font-bold">
              {sub_status.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold">
            {formatPrice(payment.value, currency_symbol)}{" "}
          </h1>
          <p className="text-[13px] self-end">{plan_details.interval}</p>
        </div>
      </div>
      <div className="absolute bottom-5 left-4">
        {sub_status === "canceled" ? (
          <button className=" h-[40px] px-4 rounded-sm w-fit text-[13px] bg-dark text-white hover:bg-dark/70 flex gap-2 items-center">
            Reactivate Subscription
          </button>
        ) : (
          <div className="flex gap-x-2 items-center">
            <button
              className=" h-[40px] px-4 rounded-sm w-fit text-[13px] bg-red-600 flex gap-2 items-center"
              onClick={() => updateOpenModal()}
            >
              {/* <RxCross1 className="text-base text-white" /> */}
              <span className="text-white">Cancel Subscription</span>
            </button>
            <button className=" h-[40px] px-4 rounded-sm w-fit text-[13px] bg-dark flex gap-2 items-center">
              <span className="text-white">Upgrade/Downgrade plan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
