"use client";
import { galleryLoginStore } from "@/store/auth/login/GalleryLoginStore";
import { handleKeyPress } from "@/utils/disableSubmitOnEnter";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import FormActions from "./FormActions";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function FormInput() {
  const router = useRouter();

  //simple state to show password visibility
  const [hidePassword, setHidePassword] = useState(true);

  const [redirect_uri, set_redirect_uri] = useLocalStorage(
    "redirect_uri_on_login",
    ""
  );

  const url = useReadLocalStorage("redirect_uri_on_login") as string;

  const [setIsLoading] = galleryLoginStore((state) => [state.setIsloading]);

  const [form, setForm] = useState<Form>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading();
    try {
      const { ok, error }: any = await signIn("gallery-login", {
        ...form,
        redirect: false,
      });

      if (ok) {
        const session = await getSession();
        if (session?.user) {
          if (!session.user.verified) {
            // Redirect to verification page
            await signOut({
              callbackUrl: `/verify/gallery/${session.user.id}`,
            });
          } else {
            if (url === "" || url === null) {
              set_redirect_uri("");
              toast.success("Login successful...redirecting!");
              router.refresh();
              router.replace("/dashboard/gallery/overview");
            } else {
              toast.success("Login successful...Please proceed!");
              router.replace(url);
              set_redirect_uri("");
            }
          }
        }
      } else {
        toast.error(error);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle the error as needed
    } finally {
      setIsLoading();
    }
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
        <div className="border border-[#E0E0E0] mt-3 rounded-md overflow-hidden">
          <input
            type="Gallery email address"
            value={form.email}
            name="email"
            placeholder="Enter your gallery's email address"
            className="px-3 text-xs focus:ring-0 border-0 outline-none focus:outline-none h-[56px] w-full bg-[#FAFAFA] placeholder:text-dark/40"
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor={"password"} className="text-xs text-[#858585]">
          Password
        </label>
        <div className="flex items-center gap-0 h-[56px] w-full rounded-md mt-3 bg-[#FAFAFA] border border-[#E0E0E0]">
            <input
                value={form.password}
                type={hidePassword ? "password" : "text"}
                name="password"
                placeholder="Enter your password"
                className="flex-1 text-xs placeholder:text-dark/40 bg-transparent border-0 outline-none focus:outline-none focus:ring-0"
                onKeyDown={handleKeyPress}
                onChange={handleChange}
                required
            />
            <div className="h-full px-5 flex items-center justify-center cursor-pointer text-sm text-[#858585]" onClick={() => setHidePassword(prev => !prev)} > {hidePassword ? <FiEyeOff /> : <FiEye />} </div>
        </div>
      </div>
      <FormActions />
    </form>
  );
}
