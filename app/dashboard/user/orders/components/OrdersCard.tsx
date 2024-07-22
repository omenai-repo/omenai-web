"use client";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import { actionStore } from "@/store/actions/ActionStore";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { formatPrice } from "@/utils/priceFormatter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { GoIssueClosed } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { MdInfo, MdOutlineCallToAction } from "react-icons/md";

type OverviewOrdersCardProps = {
  title: string;
  artist: string;
  price: number;
  order_date: string;
  url: string;
  status: string;
  order_id: string;
  state: "pending" | "history";
  payment_information: PaymentStatusTypes;
  tracking_information: TrackingInformationTypes;
  shipping_quote?: ShippingQuoteTypes;
  delivery_confirmed: boolean;
  order_accepted: OrderAcceptedStatusTypes;
};
export default function OrdersCard({
  title,
  artist,
  price,
  order_date,
  url,
  status,
  order_id,
  state,
  payment_information,
  tracking_information,
  shipping_quote,
  delivery_confirmed,
  order_accepted,
}: OverviewOrdersCardProps) {
  const image_url = getImageFileView(url, 200);

  // const [toggleUserTrackingInfoModal] = actionStore((state) => [
  //   state.toggleUserTrackingInfoModal,
  // ]);

  const currency = getCurrencySymbol("USD");
  const session = useSession();

  function construct_status(
    status: string,
    payment_status: string,
    tracking_status: string,
    order_accepted: string,
    delivery_confirmed: boolean
  ) {
    if (
      status === "pending" &&
      status === "pending" &&
      order_accepted === "accepted" &&
      payment_status === "pending" &&
      tracking_status === "" &&
      !delivery_confirmed
    ) {
      return (
        <span className="px-3 py-1 rounded-full bg-amber-100 flex gap-x-1 items-center w-fit">
          <MdInfo />
          Awaiting payment
        </span>
      );
    }
    if (
      status === "pending" &&
      status === "pending" &&
      order_accepted === "accepted" &&
      payment_status === "completed" &&
      tracking_status === "" &&
      !delivery_confirmed
    ) {
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 flex gap-x-1 items-center w-fit">
          <GoIssueClosed />
          Payment completed
        </span>
      );
    }
    if (
      status === "pending" &&
      order_accepted === "accepted" &&
      payment_status === "completed" &&
      tracking_status !== "" &&
      !delivery_confirmed
    ) {
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 flex gap-x-1 items-center w-fit">
          <GoIssueClosed />
          Delivery in progress
        </span>
      );
    }
    if (
      status === "pending" &&
      order_accepted === "" &&
      payment_status === "pending" &&
      tracking_status === "" &&
      !delivery_confirmed
    ) {
      return (
        <span className="px-3 py-1 rounded-full bg-amber-100 flex gap-x-1 items-center w-fit">
          <MdInfo />
          Order in review
        </span>
      );
    }
    if (
      status === "completed" &&
      order_accepted === "declined" &&
      !delivery_confirmed
    ) {
      return (
        <span className="px-3 py-1 rounded-full bg-red-200 flex gap-x-1 items-center w-fit">
          <IoClose />
          Order declined by Gallery
        </span>
      );
    }
    if (
      status === "completed" &&
      order_accepted === "accepted" &&
      delivery_confirmed
    ) {
      return (
        <span className="px-3 py-1 rounded-full bg-green-100 flex gap-x-1 items-center w-fit">
          <GoIssueClosed />
          Order has been completed
        </span>
      );
    }
  }
  return (
    <div className="flex md:flex-row flex-col md:justify-between px-5 py-3 w-full">
      <div className=" flex gap-x-3">
        <Image
          src={image_url}
          alt={title}
          height={120}
          width={100}
          className="object-top object-contain"
        />
        <div className="flex flex-col sapce-y-1 text-xs">
          <p className="text-dark font-medium text-[15px]">{title}</p>
          <span className="text-dark text-xs">{artist}</span>
          <span className="text-dark text-xs font-bold">
            {formatPrice(price, currency)}
          </span>
          {construct_status(
            status,
            payment_information.status,
            tracking_information.tracking_link,
            order_accepted.status,
            delivery_confirmed
          )}
        </div>
      </div>
      <div className="flex flex-col md:mt-0 mt-5 text-xs md:items-end items-start gap-y-1">
        <span className="text-dark text-xs font-normal">
          Order ID: <span className="font-medium">{order_id}</span>
        </span>
        <span className="text-dark text-xs">{order_date}</span>

        {payment_information.status === "pending" &&
          status !== "completed" &&
          order_accepted.status === "accepted" && (
            <button className="whitespace-nowrap bg-dark rounded-sm text-white disabled:bg-[#E0E0E0] disabled:text-[#858585] w-full disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80">
              <span>Pay for this artwork</span>
            </button>
          )}
        <div className="w-full sm:flex-row flex-col flex items-center gap-2">
          {payment_information.status === "completed" &&
            status !== "completed" &&
            !delivery_confirmed &&
            tracking_information.tracking_link !== "" && (
              <button className="whitespace-nowrap bg-dark disabled:bg-[#E0E0E0] disabled:text-[#858585] rounded-sm w-full text-white disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80">
                <span>View tracking information</span>
              </button>
            )}
          {payment_information.status === "completed" &&
            !delivery_confirmed &&
            tracking_information.tracking_link !== "" && (
              <button className="whitespace-nowrap bg-green-600 disabled:bg-[#E0E0E0] disabled:text-[#858585] rounded-sm w-full text-white disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80">
                <span>Confirm order delivery</span>
              </button>
            )}
        </div>

        {payment_information.status === "completed" &&
          order_accepted.status === "accepted" &&
          status !== "completed" &&
          tracking_information.tracking_link === "" && (
            <button
              disabled
              className="whitespace-nowrap bg-dark disabled:bg-[#E0E0E0] disabled:text-[#858585] rounded-sm w-full text-white disabled:cursor-not-allowed h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
            >
              <span>Awaiting tracking information</span>
            </button>
          )}

        {order_accepted.status === "" && (
          <div className="relative flex items-center gap-x-1">
            <button
              disabled
              className="whitespace-nowrap bg-dark rounded-sm disabled:cursor-not-allowed w-full disabled:bg-gray-400 disabled:text-[#A1A1A1] text-white h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
            >
              <MdOutlineCallToAction />
              <span>Order in review</span>
            </button>
          </div>
        )}
        {delivery_confirmed && (
          <div className="relative flex items-center gap-x-1">
            <button
              disabled
              className="whitespace-nowrap bg-dark rounded-sm disabled:cursor-not-allowed w-full disabled:bg-gray-400 disabled:text-[#A1A1A1] text-white h-[40px] px-4 flex gap-x-2 items-center justify-center hover:bg-dark/80"
            >
              <GoIssueClosed />
              <span>This order has been fulfilled</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
