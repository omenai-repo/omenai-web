"use client";
import Load from "@/components/loader/Load";
import { checkLockStatus } from "@/services/orders/checkLockStatus";
import { createOrderLock } from "@/services/orders/createOrderLock";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tooltip } from "flowbite-react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { LoadSmall } from "@/components/loader/Load";
import { purchase_artwork } from "@/services/purchase_artwork/purchase_artwork";
import { useLocalStorage } from "usehooks-ts";
import { createCheckoutSession } from "@/services/stripe/createCheckoutSession";

export default function PayNowButton({
  art_id,
  artwork,
  amount,
  gallery_id,
  order_id,
}: {
  art_id: string;
  artwork: string;
  amount: number;
  gallery_id: string;
  order_id: string;
}) {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const [pur_gid, set_pur_gid] = useLocalStorage("pur_gid", {
    gid: "",
    oid: "",
  });

  // useEffect(() => {
  //   const checkLock = async () => {
  //     const lock_status = await checkLockStatus(art_id, session.data!.user.id);
  //     if (lock_status?.isOk) {
  //       setLocked(lock_status.data.locked);
  //     } else {
  //       throw new Error("Something went wrong, please try again");
  //     }
  //   };

  //   checkLock();
  // }, [art_id, session.data]);

  async function handleClickPayNow() {
    setLoading(true);
    const checkout_session = await createCheckoutSession(
      artwork,
      amount,
      gallery_id,
      {
        trans_type: "purchase_payout",
        user_id: session.data!.user.id,
        user_email: session.data!.user.email,
        art_id,
      }
    );

    if (!checkout_session?.isOk) {
      toast.error("Something went wrong, please try again or contact support");
    } else {
      toast.success("Checkout session initiated...Redirecting!");
      router.replace(checkout_session.url);
    }

    setLoading(false);
  }

  return (
    <div className="w-full grid place-items-center h-full">
      <div className="space-y-8 text-center w-full flex flex-col items-center">
        <div className="w-fit relative">
          <Tooltip
            content={
              "Another user has initiated a payment transaction on this artwork. Please refresh your page in a few minutes to confirm the availability of this artwork."
            }
            style="dark"
            animation="duration-500"
            trigger="hover"
            className={`w-[400px] bg-dark text-xs text-white p-2 relative ${
              !locked && "hidden"
            }`}
          >
            <button
              onClick={handleClickPayNow}
              disabled={locked || loading}
              className="w-fit h-[50px] px-4 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-dark disabled:border-dark bg-dark text-white text-[14px] hover:bg-white hover:text-dark disabled:hover:border-none hover:border-dark hover:border duration-150 grid place-items-center group"
            >
              {loading ? <LoadSmall /> : "Proceed to payment"}
            </button>
          </Tooltip>
          {locked && <CiLock className="absolute right-[-15px] top-[-5px]" />}
        </div>

        <p className="font-medium text-red-600 lg:w-1/2 mt-6 leading-6">
          <span className="text-base font-bold uppercase underline">
            Please note:
          </span>
          <br /> To safeguard your purchase and prevent accidental duplicate
          transactions for this artwork, we utilize a secure queuing system.
          This system allows only one buyer to finalize payment at a time.
          <br />
          In the rare instance you encounter an issue accessing the payment
          portal, you can refresh your page shortly. We&apos;ll inform you of
          the artwork's availability if the purchase process hasn't been
          completed by another buyer.
        </p>
      </div>
    </div>
  );
}
