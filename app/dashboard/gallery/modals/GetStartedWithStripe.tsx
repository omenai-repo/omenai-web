"use client";
import { LoadSmall } from "@/components/loader/Load";
import { country_codes } from "@/json/country_alpha_2_codes";
import { createAccountLink } from "@/services/stripe/createAccountLink";
import { createConnectedAccount } from "@/services/stripe/createConnectedAccount";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
export default function GetStartedWithStripe() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);

  const [countrySelect, setCountrySelect] = useState<string>("");

  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);

  const [connectedAccountId, setConnectedAccountId] = useState();

  const session = useSession();

  const router = useRouter();

  async function handleButtonClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAccountCreatePending(true);
    const customer = {
      name: session.data!.user.name,
      email: session.data!.user.email,
      customer_id: session.data!.user.id,
      country: countrySelect,
    };
    const response = await createConnectedAccount(customer);

    if (response?.isOk) {
      setConnectedAccountId(response.account_id);
      toast.success(
        "Connected account created successfully, Please continue with Onboarding"
      );
    } else {
      toast.error("Something went wrong, please try again or contact support");
    }
    setAccountCreatePending(false);
  }

  async function handleAccountLink() {
    setAccountLinkCreatePending(true);
    const response = await createAccountLink(connectedAccountId!);

    if (response?.isOk) {
      toast.success("Account link created successfully... Redirecting!");
      router.push(response.url);
    } else {
      toast.error("Something went wrong, please try again or contact support");
    }
  }

  return (
    <AnimatePresence key={9}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-slate-900/20 backdrop-blur py-8 px-2 fixed inset-0 z-50 grid place-items-center cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border border-[#E0E0E0] text-dark p-6 rounded-lg w-full max-w-xl shadow-xl cursor-default relative"
        >
          <div className="">
            <h1 className="text-[14px] font-light text-[#858585] mb-1">
              Let&apos;s get you setup to receive payments!
            </h1>
            <p className="font-bold text-sm">
              Create a connected account on{" "}
              <span className="text-[#5247ee]">Stripe</span>
            </p>
            <form
              className="flex flex-col space-y-2 mt-5"
              onSubmit={handleButtonClick}
            >
              <div className="relative w-full">
                <label
                  className="text-[#858585] font-normal text-xs mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  disabled
                  type="text"
                  value={session.data?.user.name}
                  className="p-3 border border-[#E0E0E0] text-xs disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="text-[#858585] font-normal text-xs mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  disabled
                  type="text"
                  value={session.data?.user.email}
                  className="p-3 border border-[#E0E0E0] text-xs disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
                />
              </div>
              <div className="relative w-full">
                <label
                  className="text-[#858585] font-normal text-xs mb-2"
                  htmlFor="email"
                >
                  Business Location
                </label>
                <select
                  required
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setCountrySelect(e.target.value)
                  }
                  className="p-3 mb-4 border border-[#E0E0E0] text-xs disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
                >
                  <option value="">Select</option>
                  {country_codes.map((country, index) => {
                    return (
                      <option
                        className="p-3 font-light text-dark"
                        value={country.key}
                        key={country.key}
                      >
                        {country.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {(connectedAccountId ||
                accountCreatePending ||
                accountLinkCreatePending) && (
                <div className="dev-callout">
                  {connectedAccountId && (
                    <>
                      <p className="text-[14px] font-normal mt-4">
                        Your connected account ID is:{" "}
                        <code className="font-bold">{connectedAccountId}</code>{" "}
                      </p>
                      <span className="text-xs mt-1 font-light">
                        Hey, don&apos;t worry, we'll remember it for you!
                      </span>
                    </>
                  )}
                  {accountCreatePending && (
                    <p className="text-[14px] font-bold mt-4">
                      Creating a connected account for you...
                    </p>
                  )}
                  {accountLinkCreatePending && (
                    <p className="text-[14px] font-bold mt-4">
                      Creating a new Account Link for you...
                    </p>
                  )}
                </div>
              )}
              {!connectedAccountId && (
                <button
                  type="submit"
                  disabled={accountCreatePending}
                  className="h-[40px] text-[14px] font-normal disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] px-4 w-full bg-black text-white cursor-pointer mt-5 grid place-items-center"
                >
                  {accountCreatePending ? (
                    <LoadSmall />
                  ) : (
                    "Create a connected account"
                  )}
                </button>
              )}
            </form>

            {connectedAccountId && (
              <button
                disabled={accountLinkCreatePending}
                className="h-[40px] text-[14px] font-normal disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] px-4 w-full bg-black text-white cursor-pointer mt-5 grid place-items-center"
                onClick={handleAccountLink}
              >
                {accountLinkCreatePending ? (
                  <LoadSmall />
                ) : (
                  "Continue to Stripe Onboarding"
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
