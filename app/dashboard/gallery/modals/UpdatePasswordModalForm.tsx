"use client";

import { LoadSmall } from "@/components/loader/Load";
import { validate } from "@/lib/validations/validatorGroup";
import { requestPasswordConfirmationCode } from "@/services/requests/requestPasswordConfirmationCode";
import { updateGalleryPassword } from "@/services/requests/updateGalleryPassword";
import { actionStore } from "@/store/actions/ActionStore";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdError } from "react-icons/md";
import { toast } from "sonner";

export default function UpdatePasswordModalForm() {
  const [updatePasswordModalPopup] = actionStore((state) => [
    state.updatePasswordModalPopup,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const [info, setInfo] = useState({
    password: "",
    confirmPassword: "",
    code: "",
  });

  const [errorList, setErrorList] = useState<string[]>([]);

  async function requestConfirmationCode() {
    setCodeLoading(true);
    const response = await requestPasswordConfirmationCode();
    if (response?.isOk) toast.success(response.message);
    else toast.error(response?.message);
    setCodeLoading(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;

    setErrorList([]);
    const { success, errors }: { success: boolean; errors: string[] | [] } =
      validate(value, name, info.password);
    if (!success) setErrorList(errors);
    else
      setInfo((prev) => {
        return { ...prev, [name]: value };
      });
  }

  async function handlePasswordUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const response = await updateGalleryPassword(info.password, info.code);

    if (response?.isOk) {
      toast.success(response.message);
      updatePasswordModalPopup(false);
    } else {
      toast.error(response?.message);
    }
    setLoading(false);
  }
  return (
    <div>
      <h1 className="text-sm font-normal mb-4 text-dark">
        Update Password Information
      </h1>
      <form onSubmit={handlePasswordUpdate}>
        <div className="space-y-2 mb-2 flex flex-col w-full">
          <div className="relative w-full h-auto">
            <label htmlFor="shipping" className="text-xs text-[#858585] mb-2">
              Password
            </label>
            <input
              onChange={handleInputChange}
              name="password"
              type="text"
              required
              placeholder="Enter a new password"
              className="h-[50px] px-4 border border-dark/20 w-full text-xs focus:border-none focus:ring-1 focus:ring-dark focus:outline-none placeholder:text-xse"
            />
          </div>
        </div>
        <div className="space-y-2 mb-2 flex flex-col w-full">
          <div className="relative w-full h-auto">
            <label htmlFor="shipping" className="text-xs text-[#858585] mb-2">
              Confirm password
            </label>
            <input
              onChange={handleInputChange}
              name="confirmPassword"
              type="text"
              placeholder="Confirm your password"
              required
              className="h-[50px] px-4 border border-dark/20 w-full text-xs focus:border-none focus:ring-1 focus:ring-dark focus:outline-none placeholder:text-xs"
            />
          </div>
        </div>

        <div className="space-y-2 mb-2 flex flex-col w-full relative">
          <div className="relative w-full h-auto">
            <label htmlFor="shipping" className="text-xs text-[#858585] mb-2">
              Confirmation code
            </label>
            <input
              onChange={handleInputChange}
              name="code"
              type="text"
              placeholder="Enter confirmation code"
              required
              className="h-[50px] px-4 border border-dark/20 w-full text-xs focus:border-none focus:ring-1 focus:ring-dark focus:outline-none placeholder:text-xs"
            />
          </div>

          <div className="absolute right-0 translate-y-[25%] top-1">
            <button
              type="button"
              onClick={requestConfirmationCode}
              disabled={
                loading ||
                errorList.length > 0 ||
                info.confirmPassword === "" ||
                info.password === "" ||
                codeLoading
              }
              className="h-[50px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-xs bg-dark duration-200 grid place-items-center"
            >
              Get code
            </button>
          </div>
        </div>
      </form>

      {errorList.length > 0 &&
        errorList.map((error, index) => {
          return (
            <div key={index} className="flex items-center gap-x-2 my-2">
              <MdError className="text-red-600" />
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          );
        })}
      <div className="w-full mt-5 flex items-center gap-x-2">
        <button
          disabled={
            loading ||
            errorList.length > 0 ||
            info.code === "" ||
            info.confirmPassword === "" ||
            info.password === ""
          }
          type="submit"
          className="h-[50px] px-4 w-full text-xs text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 bg-dark duration-300 grid place-items-center"
        >
          {loading ? <LoadSmall /> : "Update Password"}
        </button>
      </div>
    </div>
  );
}
