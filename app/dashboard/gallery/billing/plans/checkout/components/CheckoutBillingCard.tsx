"use client";
import React, { useState } from "react";
import { IoIosLock } from "react-icons/io";
import Image from "next/image";
import { ObjectId } from "mongoose";
import { generateAlphaDigit } from "@/utils/generateToken";
import { createTokenizedCharge } from "@/services/subscriptions/createTokenizedCharge";
import { toast } from "sonner";
import { LoadSmall } from "@/components/loader/Load";
import { useRouter } from "next/navigation";
import { getApiUrl } from "@/config";
import { useLocalStorage } from "usehooks-ts";
import { downgradeSubscriptionPlan } from "@/services/subscriptions/downgradeSubscriptionPlan";
import { useSession } from "next-auth/react";

export default function CheckoutBillingCard({
  plan,
  interval,
  sub_data,
  amount,
  shouldCharge,
}: {
  plan: SubscriptionPlanDataTypes & {
    createdAt: string;
    updatedAt: string;
    _id: string;
  };
  sub_data: SubscriptionModelSchemaTypes & {
    created: string;
    updatedAt: string;
  };
  interval: string;
  amount: number;
  shouldCharge: boolean;
}) {
  const { data: session } = useSession();
  const [transaction_id, set_transaction_id] = useLocalStorage(
    "flw_trans_id",
    ""
  );
  const is_effected_end_of_billing_cycle =
    sub_data.plan_details.interval === "yearly" && interval === "monthly";

  const [loading, setLoading] = useState<boolean>(false);
  const [migrationLoading, setMigrationLoading] = useState<boolean>(false);

  const router = useRouter();

  const url = getApiUrl();

  async function handlePayNow() {
    const tokenized_data: SubscriptionTokenizationTypes = {
      amount,
      email: sub_data.customer.email,
      tx_ref: generateAlphaDigit(7),
      token: sub_data.card.token,
      gallery_id: sub_data.customer.gallery_id,
      plan_id: plan._id.toString(),
      plan_interval: interval,
    };
    setLoading(true);
    const tokenize_card = await createTokenizedCharge(tokenized_data);

    if (!tokenize_card?.isOk)
      toast.error("Couldn't create tokenized card charge");
    else {
      const { data } = tokenize_card;
      console.log(data);
      set_transaction_id(data.data.id);
      router.replace(
        `${url}/dashboard/gallery/billing/plans/checkout/verification`
      );
    }

    setLoading(false);
  }

  async function handleMigrateToPlan() {
    setMigrationLoading(true);

    const data: NextChargeParams = {
      value:
        interval === "monthly"
          ? +plan.pricing.monthly_price
          : +plan.pricing.annual_price,
      currency: "USD",
      type: plan.name,
      interval,
      id: plan._id as string,
    };

    const migrate = await downgradeSubscriptionPlan(data, session!.user.id);

    if (!migrate?.isOk) toast.error(migrate?.message);
    else toast.success("Migration successful");
    setMigrationLoading(false);
  }

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
      {!shouldCharge ? (
        <button
          disabled={migrationLoading}
          onClick={handleMigrateToPlan}
          className="flex gap-2 items-center w-full my-5 justify-center disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm text-[13px] bg-dark h-[40px] px-4 text-white hover:bg-dark/90"
        >
          {migrationLoading ? (
            <LoadSmall />
          ) : (
            <span className="flex items-center gap-x-2">
              <IoIosLock /> <span>Migrate to Plan</span>
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={handlePayNow}
          disabled={loading}
          className="flex gap-2 items-center w-full my-5 justify-center disabled:cursor-not-allowed disabled:bg-dark/20 place-items-center rounded-sm text-[13px] bg-dark h-[40px] px-4 text-white hover:bg-dark/90"
        >
          {loading ? (
            <LoadSmall />
          ) : (
            <span className="flex items-center gap-x-2">
              <IoIosLock /> <span>Pay now</span>
            </span>
          )}
        </button>
      )}
    </>
  );
}
