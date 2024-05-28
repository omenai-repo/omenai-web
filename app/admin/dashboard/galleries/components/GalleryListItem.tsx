"use client";
import { adminModals } from "@/store/admin/AdminModalsStore";
import { GoEye } from "react-icons/go";

export default function GalleryListItem({
  name,
  location,
  description,
  _id,
  email,
  admin,
  logo,
}: AdminGalleryListItemTypes) {
  const { setOpenGalleryDetailPopupModal, setSingleGalleryListItemData } =
    adminModals();

  function updateGalleryPopupData() {
    setSingleGalleryListItemData({
      name,
      location,
      description,
      _id,
      email,
      admin,
      logo,
    });

    setOpenGalleryDetailPopupModal(true);
  }
  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-[14px] font-medium">{name}</h1>
          <p className="text-xs font-normal">{location}</p>
          <button
            onClick={updateGalleryPopupData}
            className="flex gap-x-2 w-fit rounded-sm items-center px-4 py-2 bg-dark text-white"
          >
            <span className="text-xs ">View</span>

            <GoEye />
          </button>
        </div>
        <div className="flex gap-x-4">
          <button className=" flex gap-x-2 w-fit rounded-sm items-center px-4 py-2.5 bg-red-600 text-white">
            <span className="text-xs ">Reject</span>

            <GoEye />
          </button>

          <button className=" flex gap-x-2 w-fit rounded-sm items-center px-4 py-2.5 bg-green-600 text-white">
            <span className="text-xs ">Accept</span>

            <GoEye />
          </button>
        </div>
      </div>
      <hr className="border-dark/10 mt-5" />
    </div>
  );
}
