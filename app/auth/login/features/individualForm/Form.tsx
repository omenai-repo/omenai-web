"use client"
import { AnimatePresence, motion } from "framer-motion";
import FormInput from "./components/FormInput";
import { useLoginStore } from '@/store/auth/login/LoginStore';
import Image from "next/image";
import Link from "next/link";

export default function Form() {

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ y: 300 }}
        transition={{ duration: 0.33 }}
        className='w-full py-[20px] md:py-[30px] lg:px-[2rem] xl:px-[4rem] 2xl:px-[7rem]'
      >
        <div className="text-center flex items-center flex-col mt-10">
          <Link href={'/'}>
            <Image
              src={"/omenai_logo.png"}
              alt="omenai logo"
              width={150}
              height={30}
            />
          </Link>
          <p className='text-[#616161] mt-5'>Welcome back. kindly login to your account</p>
        </div>
        <div className='mt-[40px]'>
            <FormInput />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
