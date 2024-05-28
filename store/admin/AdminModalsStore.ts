import { create } from "zustand";

type AdminModalsStore = {
  openGalleryDetailPopupModal: boolean;
  setOpenGalleryDetailPopupModal: (val?: boolean) => void;
  singleGalleryListItemData: AdminGalleryListItemTypes;
  setSingleGalleryListItemData: (data: AdminGalleryListItemTypes) => void;
  openMobileNav: boolean;
  setOpenMobileNav: () => void;
};

export const adminModals = create<AdminModalsStore>((set, get) => ({
  openGalleryDetailPopupModal: false,
  setOpenGalleryDetailPopupModal: (val?: boolean) => {
    const openState = get().openGalleryDetailPopupModal;
    if (val && typeof val === "boolean") {
      set({ openGalleryDetailPopupModal: val });
    } else {
      set({ openGalleryDetailPopupModal: !openState });
    }
  },
  singleGalleryListItemData: {
    name: "",
    location: "",
    description: "",
    _id: "",
    email: "",
    admin: "",
    logo: "",
  },
  setSingleGalleryListItemData: (data: AdminGalleryListItemTypes) => {
    set({ singleGalleryListItemData: data });
  },
  openMobileNav: false,
  setOpenMobileNav: () => {
    const openState = get().openMobileNav;

    set({ openMobileNav: !openState });
  },
}));
