"use client";

import { validate } from "@/lib/validations/validatorGroup";
import { handleKeyPress } from "@/utils/disableSubmitOnEnter";
import { useIndividualAuthStore } from "@/store/auth/register/IndividualAuthStore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import { MdError } from "react-icons/md";

export default function Input({
  label,
  labelText,
  type,
  placeholder,
  disabled = false,
  onChange,
  id,
}: InputProps) {
  const [
    currentSignupFormIndex,
    individualSignupData,
    incrementCurrentSignupFormIndex,
    decrementCurrentSignupFormIndex,
  ] = useIndividualAuthStore((state) => [
    state.currentSignupFormIndex,
    state.individualSignupData,
    state.incrementCurrentSignupFormIndex,
    state.decrementCurrentSignupFormIndex,
  ]);

  const [errorList, setErrorList] = useState<string[]>([]);

  const handleClickPrev = () => {
    setErrorList([]);
    decrementCurrentSignupFormIndex();
  };

  const handleClick = (value: string, label: string) => {
    setErrorList([]);
    const { success, errors }: { success: boolean; errors: string[] | [] } =
      validate(
        value,
        label,
        labelText === "confirmPassword" &&
          (individualSignupData as Record<string, any>)["password"]
      );
    if (!success) setErrorList(errors);
    else incrementCurrentSignupFormIndex();
  };

  return (
    <AnimatePresence key={`${id}-individual`}>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.33 }}
        className="flex flex-col gap-2 container"
      >
        <label htmlFor={labelText} className="text-[#858585] text-xs">
          {label}
        </label>
        <input
          type={type}
          className=" focus:ring-1 focus:border-0 border px-2 ring-0 text-[14px] text-dark border-[#E0E0E0] w-full py-2 focus:ring-dark placeholder:font-light placeholder:text-xs placeholder:text-[#858585]"
          placeholder={`e.g ${placeholder}`}
          disabled={disabled}
          onChange={onChange}
          name={labelText}
          onKeyDown={handleKeyPress}
          value={(individualSignupData as Record<string, string>)[labelText]}
        />

        {errorList.length > 0 &&
          errorList.map((error, index) => {
            return (
              <div
                key={`${index}-error_list`}
                className="flex items-center gap-x-2"
              >
                <MdError className="text-red-600" />
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            );
          })}

        <div className="self-end flex gap-4">
          <button
            className={`${
              currentSignupFormIndex > 0 ? "block" : "hidden"
            }  h-[35px] px-4 mt-[1rem] text-xs font-medium bg-dark text-white hover:bg-dark/80 transition-all ease-linear duration-200`}
            type={"button"}
            onClick={handleClickPrev}
          >
            Back
          </button>
          <button
            className=" h-[35px] px-4 mt-[1rem] text-xs font-medium bg-dark text-white flex justify-center items-center gap-x-2 hover:bg-dark/80 transition-all ease-linear duration-200"
            type={"button"}
            onClick={() =>
              handleClick(
                (individualSignupData as Record<string, any>)[labelText],
                labelText
              )
            }
          >
            <span>Next</span>
            <MdOutlineArrowForward />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
