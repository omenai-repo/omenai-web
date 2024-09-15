"use client";
import { galleryLoginStore } from "@/store/auth/login/GalleryLoginStore";
import { handleKeyPress } from "@/utils/disableSubmitOnEnter";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import FormActions from "./FormActions";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export default function FormInput() {
  const router = useRouter();

  //simple state to show password visibility

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
              toast.success("Operation successful", {
                description: "Login successful...redirecting!",
                style: {
                  background: "green",
                  color: "white",
                },
                className: "class",
              });
              router.replace("/dashboard/gallery/overview");
              router.refresh();
            } else {
              toast.success("Operation successful", {
                description: "Login successful, please proceed!",
                style: {
                  background: "green",
                  color: "white",
                },
                className: "class",
              });
              router.replace(url);
              set_redirect_uri("");
            }
          }
        }
      } else {
        toast.error("Error notification", {
          description: error,
          style: {
            background: "red",
            color: "white",
          },
          className: "class",
        });
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
        <input
          type="Gallery email address"
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
