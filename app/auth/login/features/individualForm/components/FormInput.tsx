"use client";
import { individualLoginStore } from "@/store/auth/login/IndividualLoginStore";
import { handleKeyPress } from "@/utils/disableSubmitOnEnter";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import FormActions from "./FormActions";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function FormInput() {
  const router = useRouter();

  //simple state to show password visibility
  // const [hidePassword, setHidePassword] = useState(true);

  const [setIsLoading] = individualLoginStore((state) => [state.setIsloading]);
  const [redirect_uri, set_redirect_uri] = useLocalStorage(
    "redirect_uri_on_login",
    ""
  );
  const url = useReadLocalStorage("redirect_uri_on_login") as string;
  const [form, setForm] = useState<Form>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading();

    await signIn("individual-login", { redirect: false, ...form })
      .then(async ({ ok, error }: any) => {
        if (ok) {
          const session = await getSession();
          if (session?.user) {
            toast.success("Login successful...redirecting!");
            if (session?.user.verified) {
              if (url === "" || url === null) {
                set_redirect_uri("");
                router.replace("/");
                router.refresh();
              } else {
                router.replace(url);
                set_redirect_uri("");
              }
            } else {
              await signOut({
                callbackUrl: `/verify/individual/${session?.user.id}`,
              });
            }
          }
        } else toast.error(error);
      })
      .finally(() => setIsLoading());
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
      <FormActions />
    </form>
  );
}
