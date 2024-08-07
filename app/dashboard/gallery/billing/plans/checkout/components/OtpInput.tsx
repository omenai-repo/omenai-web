import { LoadSmall } from "@/components/loader/Load";
import { validateCharge } from "@/services/subscriptions/subscribeUser/validateCharge";
import { stepperStore } from "@/store/stepper/stepperStore";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { IoIosLock } from "react-icons/io";
import { toast } from "sonner";

export default function OtpInput({
  handleClick,
  set_id,
}: {
  handleClick: () => void;
  set_id: Dispatch<SetStateAction<string>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const { flw_ref } = stepperStore();

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOtp(value);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    const data = { otp, flw_ref };

    console.log(data);

    const response = await validateCharge(data);
    if (response?.isOk) {
      if (response.data.status === "error") {
        console.log(response.data);
        toast.error(response.data.message);
      } else {
        console.log(response.data);
        set_id(response.data.data.id);
        handleClick();
      }
    } else {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  }

  return (
    <form
      className=" max-w-full flex flex-col space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xs font-medium">OTP verification</h1>
        <p className="text-[13px] flex items-center gap-x-1 font-bold">
          <IoIosLock />
          <span className="text-[13px]">Secure form</span>
        </p>
      </div>
      <div className="relative w-full">
        <label
          className="text-[#858585] font-medium text-[13px] mb-4"
          htmlFor="otp"
        >
          Enter OTP sent to your number or email
        </label>
        <input
          name="otp"
          type="text"
          required
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          className="h-[40px] border border-[#E0E0E0] text-[13px] placeholder:text-[#858585] placeholder:text-[13px] bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
        />
      </div>

      <div className="w-full">
        <button
          disabled={isLoading}
          type="submit"
          className="h-[40px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-[13px] bg-dark duration-200 grid place-items-center"
        >
          {isLoading ? <LoadSmall /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
