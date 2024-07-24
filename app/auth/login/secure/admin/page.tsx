import React from "react";
import Image from "next/image";
import Form from "./features/adminForm/Form";
export default function page() {
  return (
    <section className="h-[100vh] w-full grid place-items-center overflow-x-hidden">
      <div className="w-full h-full md:grid grid-cols-[1fr_1.3fr]">
        {/* Side section */}
        <aside className="h-full w-full relative flex-1 hidden md:block">
          <Image
            src={"/dark_bg_1.jpg"}
            alt="Individual sign up image block"
            width={500}
            height={500}
            className="absolute inset-0 w-full h-full object-center object-cover rounded-tr-xl rounded-br-xl"
          />
          <div className="absolute bottom-14 left-6 z-20 text-white">
            <h1 className="text-lg xl:text-xl font-medium mb-2">
              Enter your login details
            </h1>
            <p className="font-normal">
              Let's get you back to getting artworks at reasonable prices.
            </p>
          </div>
          <div className="absolute inset-0 bg-dark opacity-50 z-10" />
        </aside>

        {/* Form section */}
        <div className="w-full h-full p-5 md:px-[50px] overflow-x-hidden">
          <Form />
        </div>
      </div>
    </section>
  );
}
