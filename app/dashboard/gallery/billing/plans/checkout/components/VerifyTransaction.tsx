"use client";
import Load from "@/components/loader/Load";
import { verifyFlwTransaction } from "@/services/subscriptions/verifyFlwTransaction";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function VerifyTransaction({
  transaction_id,
}: {
  transaction_id: string;
}) {
  const { data: verified, isLoading } = useQuery({
    queryKey: ["verify_subscription_payment"],
    queryFn: async () => {
      const response = await verifyFlwTransaction({ transaction_id });
      if (!response?.isOk) return null;
      else {
        console.log(response.data);
        return { message: response.message, data: response.data };
      }
    },
  });
  return (
    <div className="grid place-items-center">
      {isLoading ? (
        <>
          <Load />
          <p className="text-xs">Verification in progress...please wait</p>
        </>
      ) : (
        <>
          <div className="space-y-2 grid place-items-center">
            <Image
              src={"/images/verified.png"}
              height={100}
              width={100}
              alt="verification icon"
              className="text-center"
            />
            <p className="text-xs font-bold">{verified?.message}</p>
          </div>

          <div className="w-full mt-5">
            <Link
              href={"/dashboard/gallery/billing"}
              type="button"
              className="h-[40px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-xs bg-dark duration-200 grid place-items-center"
            >
              Go home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
