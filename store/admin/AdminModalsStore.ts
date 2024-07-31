import { create } from "zustand";

type AdminModalsStore = {
  openGalleryDetailPopupModal: boolean;
  setOpenGalleryDetailPopupModal: (val?: boolean) => void;
  singleGalleryListItemData: AdminGalleryListItemTypes;
  setSingleGalleryListItemData: (data: AdminGalleryListItemTypes) => void;
  openMobileNav: boolean;
  setOpenMobileNav: () => void;
  rejectConfirmationPopup: RejectConfirmationPopupOptions;
  setRejectConfirmationPopup: (val: RejectConfirmationPopupOptions) => void;
  acceptConfirmationPopup: { show: boolean; gallery_id: string };
  setAcceptConfirmationPopup: (val: {
    show: boolean;
    gallery_id: string;
  }) => void;

  blockGalleryConfirmationPopup: {
    show: boolean;
    gallery_id: string;
    status: string;
  };
  setBlockGalleryConfirmationPopup: (val: {
    show: boolean;
    gallery_id: string;
    status: string;
  }) => void;
};

type RejectConfirmationPopupOptions = {
  show: boolean;
  email: string;
  name: string;
  gallery_id: string;
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
    location: { country: "", address: "" },
    description: "",
    _id: "",
    email: "",
    admin: "",
    logo: "",
    gallery_id: "",
    status: "active",
  },
  setSingleGalleryListItemData: (data: AdminGalleryListItemTypes) => {
    set({ singleGalleryListItemData: data });
  },
  openMobileNav: false,
  setOpenMobileNav: () => {
    const openState = get().openMobileNav;

    set({ openMobileNav: !openState });
  },

  rejectConfirmationPopup: { show: false, email: "", name: "", gallery_id: "" },
  setRejectConfirmationPopup(val: RejectConfirmationPopupOptions) {
    set({ rejectConfirmationPopup: val });
  },
  acceptConfirmationPopup: { show: false, gallery_id: "" },
  setAcceptConfirmationPopup(val: { show: boolean; gallery_id: string }) {
    set({ acceptConfirmationPopup: val });
  },

  blockGalleryConfirmationPopup: {
    show: false,
    gallery_id: "",
    status: "",
  },
  setBlockGalleryConfirmationPopup(val: {
    show: boolean;
    gallery_id: string;
    status: string;
  }) {
    set({ blockGalleryConfirmationPopup: val });
  },
}));
