"use client"
import { AnimatePresence, motion } from "framer-motion";
import FormInput from "./components/FormInput";
import { FiArrowLeft } from "react-icons/fi";
import { useLoginStore } from '@/store/auth/login/LoginStore';

export default function Form() {
  const { updateCurrent } = useLoginStore();

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: -300 }}
        transition={{ duration: 0.33 }}
        className='max-w-[560px] py-[20px] md:py-[30px]'
      >
        <div className="flex items-center gap-5">
          <div className="h-[30px] w-[30px] rounded-full border border-line text-base flex items-center justify-center cursor-pointer" onClick={() => updateCurrent(0)}> <FiArrowLeft className="text-[#161616]" /> </div>
          <h1 className='text-2xl font-medium'>Enter your login details</h1>
        </div>
        <p className='text-[#616161] mt-2'>Kindly provide the following details</p>
        <div className='mt-[50px]'>
            <FormInput />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
