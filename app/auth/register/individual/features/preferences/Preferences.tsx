"use client";

import { AnimatePresence, motion } from "framer-motion";
import Pill from "./components/Pill";
import { useIndividualAuthStore } from "@/store/auth/register/IndividualAuthStore";
import LoaderAnimation from "@/components/loader/LoaderAnimation";
import { MdOutlineArrowForward } from "react-icons/md";
let artTypes = [
  "Acyllic",
  "Oil",
  "Fabric",
  "Mixed media",
  "Ink",
  "Ankara",
  "Photography",
  "Collage or other works on paper",
  "Charcoal",
  "Canvas",
  "Paper",
];
function Preferences() {
  const [
    decrementCurrentSignupFormIndex,
    incrementCurrentSignupFormIndex,
    preferences,
    isLoading,
  ] = useIndividualAuthStore((state) => [
    state.decrementCurrentSignupFormIndex,
    state.incrementCurrentSignupFormIndex,
    state.preferences,
    state.isLoading,
  ]);
  return (
    <AnimatePresence>
      <div className="container">
        <p className="text-xs font-normal text-center">
          We would like understand your art interests, please select up to 5
          artwork mediums that resonates with you most
        </p>
        <p className="text-center text-base font-semibol my-[1.5rem]">
          Selected: {preferences.length}/5
        </p>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.33 }}
        >
          <div className="flex flex-wrap justify-center gap-y-[1rem] gap-x-[0.5rem]">
            {artTypes.map((art, index) => {
              return <Pill key={index} text={art} />;
            })}
          </div>
          {/* Submit */}
          <div className="flex gap-4 justify-end my-5">
            <button
              className={`px-[1.5rem] py-[0.5rem] mt-[1rem] text-xs font-bold bg-dark text-white flex justify-center items-center gap-x-2 hover:bg-dark/30 transition-all ease-linear duration-200`}
              type={"button"}
              onClick={decrementCurrentSignupFormIndex}
            >
              Back
            </button>
            <button
              disabled={isLoading || preferences.length < 5}
              onClick={incrementCurrentSignupFormIndex}
              className=" disabled:bg-gray-400 disabled:cursor-not-allowed px-[1.5rem] py-[0.5rem] mt-[1rem] text-xs font-bold bg-dark text-white flex justify-center items-center gap-x-2 hover:bg-dark/30 transition-all ease-linear duration-200"
            >
              <span>Next</span>
              <MdOutlineArrowForward />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Preferences;
