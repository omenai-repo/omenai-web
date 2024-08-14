import React from "react";
import { IoIosLock } from "react-icons/io";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
export default function CheckoutBillingCard({
  interval,
  sub_data,
}: {
  sub_data: SubscriptionModelSchemaTypes & {
    created: string;
    updatedAt: string;
  };
  interval: string;
}) {
  const is_effected_end_of_billing_cycle =
    sub_data.plan_details.interval === "yearly" && interval === "monthly";

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <h1 className="text-xs font-medium">Payment Method</h1>
        <p className="text-[13px] flex items-center gap-x-1 font-bold">
          <IoIosLock />
          <span className="text-[13px]">Secure form</span>
        </p>
      </div>
      <div className="rounded-sm ring-1 ring-[#e0e0e0] bg-no-repeat text-dark bg-blend-overlay p-5 relative w-full h-fit">
        <div className="w-full flex justify-start relative z-10 my-2">
          <p className="text-dark text-xs font-semibold">
            Billing card details
          </p>
        </div>
        {/* Icon */}
        <div className="flex justify-between items-center relative z-10">
          <div>
            <div className="flex space-x-3 items-center">
              <p className="text-xs text-dark font-bold dark whitespace-nowrap tracking-widest">
                {sub_data.card.first_6digits} ** ****{" "}
                {sub_data.card.last_4digits}
              </p>
            </div>
            <p className="text-normal text-xs font-normal text-dark ">
              {sub_data.card.expiry}
            </p>
          </div>

          <Image
            src={`/icons/${sub_data.card.type.toLowerCase()}.png`}
            alt={`${sub_data.card.type.toLowerCase()} logo`}
            height={20}
            width={40}
            className="w-fit h-fit"
          />
        </div>
        {/* <div className="w-full flex justify-start absolute bottom-5 left-4">
          <button className="flex gap-2 items-center disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm text-[13px] bg-dark h-[40px] px-4 text-white hover:bg-dark/90">
            <FaPen />
            <span>Update Card info</span>
          </button>
        </div> */}
      </div>
      {is_effected_end_of_billing_cycle ? (
        <button className="flex gap-2 items-center w-full my-5 justify-center disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm text-[13px] bg-dark h-[40px] px-4 text-white hover:bg-dark/90">
          <span>Migrate to plan</span>
        </button>
      ) : (
        <button className="flex gap-2 items-center w-full my-5 justify-center disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm text-[13px] bg-dark h-[40px] px-4 text-white hover:bg-dark/90">
          <span>Pay now</span>
        </button>
      )}
    </>
  );
}
