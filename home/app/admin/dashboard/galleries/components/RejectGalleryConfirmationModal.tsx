"use client";
import { rejectGalleryVerification } from "@shared/services/admin/reject_gallery_verification";
import { adminModals } from "@shared/store/admin/AdminModalsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";

export default function RejectConfirmationPopupModal() {
  const { rejectConfirmationPopup, setRejectConfirmationPopup } = adminModals();
  const queryClient = useQueryClient();

  const rejectGalleryVerificationMutation = useMutation({
    mutationFn: async () => {
      const reject_gallery = await rejectGalleryVerification(
        rejectConfirmationPopup.gallery_id,
        rejectConfirmationPopup.name,
        rejectConfirmationPopup.email
      );
      if (reject_gallery?.isOk) {
        toast.success("Operation successful", {
          description: reject_gallery.message,
          style: {
            background: "green",
            color: "white",
          },
          className: "class",
        });
      } else {
        toast.error("Error notification", {
          description: reject_gallery?.message,
          style: {
            background: "red",
            color: "white",
          },
          className: "class",
        });
      }

      setRejectConfirmationPopup({
        show: false,
        email: "",
        name: "",
        gallery_id: "",
      });
      return reject_gallery?.isOk;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetch_non_verified_galleries"],
      });
    },
  });

  return (
    <div
      className={`${
        rejectConfirmationPopup.show ? "grid" : "hidden"
      } w-full h-screen fixed top-0 left-0 backdrop-blur-lg place-items-center bg-dark/10`}
    >
      <div className="bg-white p-5 rounded-md w-[500px] text-center">
        <h1 className="text-base font-normal mb-4">Are you certain?</h1>
        <p className="text-red-600 font-bold">
          Please note, this action cannot be undone!
        </p>

        <div className="flex gap-x-4 items-center justify-center my-5">
          <button
            onClick={() => rejectGalleryVerificationMutation.mutate()}
            disabled={rejectGalleryVerificationMutation.isPending}
            className="disabled:cursor-not-allowed disabled:bg-dark/10 flex gap-x-2 w-fit rounded-md items-center h-[40px] px-4 bg-red-600 text-white"
          >
            <span className="text-xs ">Confirm</span>
            <IoCheckmarkOutline />
          </button>

          <button
            onClick={() =>
              setRejectConfirmationPopup({
                show: false,
                email: "",
                name: "",
                gallery_id: "",
              })
            }
            className=" flex gap-x-2 w-fit rounded-md items-center h-[40px] px-4 bg-green-600 text-white"
          >
            <span className="text-xs ">Cancel</span>

            <MdClose />
          </button>
        </div>
      </div>
    </div>
  );
}
