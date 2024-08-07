"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import CardNumber from "./CardNumber";
import CVV from "./CardCvv";
import ExpiryMonth from "./CardExpiryMonth";
import ExpiryYear from "./CardExpiryYear";
import { generateAlphaDigit } from "@/utils/generateToken";
import { initiateDirectCharge } from "@/services/subscriptions/subscribeUser/initiateDirectCharge";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getApiUrl } from "@/config";
import { LoadSmall } from "@/components/loader/Load";
import { hasEmptyString } from "@/utils/hasEmptyString";
import { stepperStore } from "@/store/stepper/stepperStore";
import { IoIosLock } from "react-icons/io";

export default function CardInput({
  updateAuthorization,
  handleClick,
  plan,
}: {
  updateAuthorization: Dispatch<
    SetStateAction<"" | "redirect" | "pin" | "avs_noauth" | "otp">
  >;
  handleClick: () => void;
  plan: SubscriptionPlanDataTypes & { createdAt: string; updatedAt: string };
}) {
  const { update_flw_charge_payload_data } = stepperStore();
  const session = useSession();
  const url = getApiUrl();
  const router = useRouter();

  const searchParams = useSearchParams();
  const interval = searchParams.get("interval");

  const [card_info, set_card_info] = useState<CardInputTypes>({
    card: "",
    cvv: "",
    month: "",
    year: "",
    name: "",
  });

  const [cardInputLoading, setCardInputLoading] = useState(false);

  const handleCardDetailInputChange = (name: string, value: string) => {
    set_card_info((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  async function handleCardInputSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCardInputLoading(true);
    const ref = generateAlphaDigit(7);
    if (hasEmptyString(card_info))
      toast.error("Some fields are empty, please fill all fields");
    else {
      const data: FLWDirectChargeDataTypes & { name: string } = {
        ...card_info,
        year: card_info.year.slice(2, 4),
        tx_ref: ref,
        amount:
          interval === "monthly"
            ? plan.pricing.monthly_price
            : plan.pricing.annual_price,
        customer: {
          name: session.data!.user.name,
          email: session.data!.user.email,
        },
        redirect: `${url}/dashboard/gallery/billing`,
      };

      const response = await initiateDirectCharge(data);
      if (response?.isOk) {
        if (response.data.status === "error") {
          console.log(response.data);
          toast.error(response.data.message);
        } else {
          console.log(response.data);
          if (response.data.meta.authorization.mode === "redirect") {
            console.log("User needs to be redirected");
            router.replace(response.data.meta.authorization.redirect);
            // redirect user
          } else {
            updateAuthorization(response.data.meta.authorization.mode);
          }
          handleClick();
        }
        update_flw_charge_payload_data(data);
      } else {
        toast.error("Something went wrong");
      }
    }

    setCardInputLoading(false);

    // should be moved to the success response
  }
  return (
    <form className="space-y-4" onSubmit={handleCardInputSubmit}>
      <div className="flex justify-between items-center">
        <h1 className="text-xs font-medium">Payment Method</h1>
        <p className="text-[13px] flex items-center gap-x-1 font-bold">
          <IoIosLock />
          <span className="text-[13px]">Secure form</span>
        </p>
      </div>

      <div className="relative w-full ">
        <label className="text-[#858585] text-[13px]" htmlFor="card_name">
          Card name
        </label>
        <input
          name="name"
          type="text"
          required
          placeholder="Enter the name on your card"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleCardDetailInputChange(e.target.name, e.target.value)
          }
          className="h-[40px] border border-[#E0E0E0] text-[13px] placeholder:text-[#858585] placeholder:text-[13px] bg-white w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
        />
      </div>
      <CardNumber onChange={handleCardDetailInputChange} />

      <div className="grid grid-cols-3 gap-x-2 justify-center">
        <ExpiryMonth onChange={handleCardDetailInputChange} />
        <ExpiryYear onChange={handleCardDetailInputChange} />
        <CVV onChange={handleCardDetailInputChange} />
      </div>
      <div className="w-full mt-10">
        <button
          type="submit"
          disabled={cardInputLoading}
          className="h-[40px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-[13px] bg-dark duration-200 grid place-items-center"
        >
          {cardInputLoading ? <LoadSmall /> : "Submit"}
        </button>
      </div>
    </form>
  );
}