"use client";

import { LoadSmall } from "@/components/loader/Load";
import { declineOrderRequest } from "@/services/orders/declineOrderRequest";
import { actionStore } from "@/store/actions/ActionStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ProvideOrderRejectionModalForm() {
  const [toggleDeclineOrderModal, current_order_id] = actionStore((state) => [
    state.toggleDeclineOrderModal,
    state.current_order_id,
  ]);
  const queryClient = useQueryClient();
  const [accepted_status, setAcceptedStatus] =
    useState<OrderAcceptedStatusTypes>({
      status: "declined",
      reason: "",
    });
  const [loading, setLoading] = useState(false);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setAcceptedStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const router = useRouter();

  const handleSubmitTrackingInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await declineOrderRequest(
      accepted_status,
      current_order_id
    );
    if (!response?.isOk) {
      toast.error(response?.message);
      setLoading(false);
    } else {
      setLoading(false);
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["fetch_orders_by_category"],
      });
      toggleDeclineOrderModal(false);
      router.refresh();
    }
  };

  return (
    <div>
      <h1 className="text-base font-normal mb-4 text-dark">Sure to decline?</h1>
      <form className="w-full" onSubmit={handleSubmitTrackingInfo}>
        <div className="space-y-2 mb-2 flex flex-col w-full">
          <div className="relative w-full h-auto my-2">
            <label htmlFor="shipping" className="text-xs text-[#858585] mb-2">
              Reason for declining request
            </label>
            <input
              onChange={handleInputChange}
              name="reason"
              type="text"
              required
              placeholder="e.g Artwork no longer available"
              className="h-[40px] px-4 border border-dark/20 w-full text-xs focus:border-none focus:ring-1 focus:ring-dark focus:outline-none placeholder:text-xs"
            />
          </div>
        </div>

        <div className="w-full  mt-5">
          <button
            disabled={loading}
            type="submit"
            className="h-[40px] px-4 w-full text-xs text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 bg-dark duration-200 grid place-items-center"
          >
            {loading ? <LoadSmall /> : " Decline order"}
          </button>
        </div>
      </form>
    </div>
  );
}
