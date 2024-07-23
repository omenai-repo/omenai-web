"use client";

import { AnimatePresence, motion } from "framer-motion";
import Pill from "./Pill";
import { useSession } from "next-auth/react";

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
export default function Preferences() {
  return (
    <AnimatePresence key={"prefs"}>
      <label htmlFor="preferences" className="text-xs font-normal text-dark">
        Preferences
      </label>
      <div className="my-4">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.33 }}
        >
          <div className="flex flex-wrap  gap-y-[1rem] gap-x-[0.5rem] text-xs">
            {artTypes.map((art, index) => {
              return <Pill key={art} text={art} />;
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
