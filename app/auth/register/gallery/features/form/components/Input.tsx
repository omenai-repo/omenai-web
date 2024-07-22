import { validate } from "@/lib/validations/validatorGroup";
import { handleKeyPress } from "@/utils/disableSubmitOnEnter";
import { useGalleryAuthStore } from "@/store/auth/register/GalleryAuthStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import { MdError, MdOutlineArrowForward } from "react-icons/md";

export type InputProps = {
  label: string;
  labelText: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonType: "button" | "submit" | undefined;
  buttonText: "Next" | "Submit" | undefined;
  onClick?: () => void;
};

export default function Input({
  label,
  labelText,
  type,
  placeholder,
  disabled = false,
  onChange,
}: InputProps) {
  const [
    gallerySignupData,
    currentGallerySignupFormIndex,
    incrementCurrentGallerySignupFormIndex,
    decrementCurrentGallerySignupFormIndex,
  ] = useGalleryAuthStore((state) => [
    state.gallerySignupData,
    state.currentGallerySignupFormIndex,
    state.incrementCurrentGallerySignupFormIndex,
    state.decrementCurrentGallerySignupFormIndex,
    state.isLoading,
  ]);

  const [errorList, setErrorList] = useState<string[]>([]);

  const handleClickPrev = () => {
    setErrorList([]);
    decrementCurrentGallerySignupFormIndex();
  };

  const handleClick = (value: string, label: string) => {
    setErrorList([]);
    const { success, errors }: { success: boolean; errors: string[] | [] } =
      validate(
        value,
        label,
        labelText === "confirmPassword" &&
          (gallerySignupData as Record<string, any>)["password"]
      );
    if (!success) setErrorList(errors);
    else incrementCurrentGallerySignupFormIndex();
  };

  return (
    <AnimatePresence key={currentGallerySignupFormIndex}>
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
          className="focus:ring-0 border-0 px-0 border-b-[1px] border-b-dark/20 outline-none focus:outline-none focus:border-b-dark transition-all duration-200 ease-in-out ring-0 placeholder:text-dark/40 py-2"
          placeholder={`e.g ${placeholder}`}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={handleKeyPress}
          name={labelText}
          value={(gallerySignupData as Record<string, string>)[labelText]}
        />
        {errorList.length > 0 &&
          errorList.map((error, index) => {
            return (
              <div key={index} className="flex items-center gap-x-2">
                <MdError className="text-red-600" />
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            );
          })}
        <div className="self-end flex gap-4">
          <button
            className={`${
              currentGallerySignupFormIndex > 0 ? "block" : "hidden"
            }   h-[40px] px-4 mt-[1rem] bg-dark text-white text-xs font-medium hover:bg-dark/80 transition-all ease-linear duration-200`}
            type={"button"}
            onClick={handleClickPrev}
          >
            Back
          </button>
          <button
            className=" h-[40px] px-4 mt-[1rem] text-xs font-medium bg-dark text-white flex justify-center items-center gap-x-2 hover:bg-dark/80 transition-all ease-linear duration-200"
            type={"button"}
            onClick={() =>
              handleClick(
                (gallerySignupData as Record<string, string>)[labelText],
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
