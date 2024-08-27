"use client";
import { handleKeyPress } from "@/utils/disableSubmitOnEnter";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoadSmall } from "@/components/loader/Load";
import { GoArrowRight } from "react-icons/go";

export default function FormInput() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState<Form>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn("admin-login", { redirect: false, ...form })
      .then(async ({ ok, error }: any) => {
        if (ok) {
          const session = await getSession();
          if (session?.user) {
            toast.success("Login successful...redirecting!");
            router.replace("/admin/dashboard/galleries");
            router.refresh();
            // if (session?.user.verified) {
            // } else {
            //   router.replace(url);
            // }
          } else {
            // await signOut({
            //   callbackUrl: `/verify/individual/${session?.user.id}`,
            // });
            toast.error("No session detected");
          }
        } else {
          toast.error(error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="container flex flex-col gap-[1rem]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor={"email"} className="text-xs text-[#858585]">
          Email address
        </label>
        <input
          type="email"
          value={form.email}
          name="email"
          className="focus:ring-0 border-0 px-0 border-b-[1px] border-b-dark/20 outline-none focus:outline-none focus:border-b-dark transition-all duration-200 ease-in-out ring-0 placeholder:text-dark/40 py-1"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor={"password"} className="text-xs text-[#858585]">
          Password
        </label>
        <input
          value={form.password}
          type="password"
          name="password"
          className="focus:ring-0 border-0 px-0 border-b-[1px] border-b-dark/20 outline-none focus:outline-none focus:border-b-dark transition-all duration-200 ease-in-out ring-0 placeholder:text-dark/40 py-1"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col mt-[1rem] gap-4 w-full">
        <div className="flex flex-col w-full gap-2 mt-[30px]">
          <button
            disabled={isLoading}
            type="submit"
            className="h-[40px] px-4 w-full flex items-center justify-center gap-3 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-[#A1A1A1] bg-black text-white text-xs font-normal"
          >
            {isLoading ? <LoadSmall /> : "Login"}{" "}
            {!isLoading && <GoArrowRight className="text-md opacity-70" />}
          </button>
        </div>
      </div>
    </form>
  );
}
