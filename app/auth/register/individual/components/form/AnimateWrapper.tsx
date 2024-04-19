"use client";
import { AnimatePresence, motion } from "framer-motion";
import AuthTypeSelect from "./AuthTypeSelect";
import AuthInputGroup from "./AuthInputGroup";
import { useIndividualAuthStore } from "@/store/auth/register/IndividualAuthStore";
import Preferences from "../preferences/Preferences";
import Terms from "../Terms/Terms";

export default function AnimateWrapper() {
  const [currentSignupFormIndex] = useIndividualAuthStore((state) => [
    state.currentSignupFormIndex,
  ]);
  return (
    <div className="w-full container lg:px-[2rem] xl:px-[7rem]">
      <AnimatePresence key={currentSignupFormIndex}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.33 }}
          className="container"
        >
          {currentSignupFormIndex === 0 && <AuthTypeSelect />}
          {currentSignupFormIndex === 1 && <AuthInputGroup />}
          {currentSignupFormIndex === 2 && <Preferences />}
          {currentSignupFormIndex === 3 && <Terms />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
