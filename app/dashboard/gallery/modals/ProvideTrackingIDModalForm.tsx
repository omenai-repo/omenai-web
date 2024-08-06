"use client";

import { LoadSmall } from "@/components/loader/Load";
import { updateOrderTrackingData } from "@/services/orders/updateTrackingInformation";
import { actionStore } from "@/store/actions/ActionStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function UploadTrackingInformationModalForm() {
  const [toggleUploadTrackingInfoModal, current_order_id] = actionStore(
    (state) => [state.toggleUploadTrackingInfoModal, state.current_order_id]
  );
  const [tracking_info, setTrackingInfo] = useState<TrackingInformationTypes>({
    tracking_link: "",
    tracking_id: "",
  });

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setTrackingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const router = useRouter();

  const handleSubmitTrackingInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateOrderTrackingData(
      tracking_info,
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
      toggleUploadTrackingInfoModal(false);
      router.refresh();
    }
  };

  return (
    <div>
      <h1 className="text-base font-normal mb-4 text-dark">
        Tracking information
      </h1>
      <form className="w-full" onSubmit={handleSubmitTrackingInfo}>
        <div className="space-y-2 mb-2 flex flex-col w-full">
          <div className="relative w-full h-auto">
            <label htmlFor="shipping" className="text-xs text-[#858585] mb-2">
              Package tracking link
            </label>
            <input
              onChange={handleInputChange}
              name="tracking_link"
              type="text"
              required
              placeholder="Please provide a link to track this order"
              className="h-[35px] px-4 border border-dark/20 w-full text-xs focus:border-none focus:ring-1 focus:ring-dark focus:outline-none placeholder:text-xse"
            />
          </div>
        </div>
        <div className="space-y-2 mb-2 flex flex-col w-full">
          <div className="relative w-full h-auto">
            <label htmlFor="shipping" className="text-xs text-[#858585] mb-2">
              Tracking ID
            </label>
            <input
              onChange={handleInputChange}
              name="tracking_id"
              type="text"
              placeholder="Please provide a tracking ID for this package"
              required
              className="h-[35px] px-4 border border-dark/20 w-full text-xs focus:border-none focus:ring-1 focus:ring-dark focus:outline-none placeholder:text-xse"
            />
          </div>
        </div>

        <div className="w-full mt-5">
          <button
            disabled={loading}
            type="submit"
            className="h-[35px] px-4 w-full text-xs text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 bg-dark duration-300 grid place-items-center"
          >
            {loading ? <LoadSmall /> : " Submit tracking information"}
          </button>
        </div>
      </form>
    </div>
  );
}
