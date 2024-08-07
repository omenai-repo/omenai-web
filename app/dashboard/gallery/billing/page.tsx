"use client";
import { gallerySubscriptionStore } from "@/store/gallery/gallery_subscriptions/GallerySubscriptions";
import NoSubscriptionTheme from "./features/NoSubscriptionTheme";
import SubscriptionActiveTheme from "./features/SubscriptionActiveTheme";
import { useSession } from "next-auth/react";
import PageTitle from "../components/PageTitle";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
export default function Subscription() {
  const [trans_id, set_trans_id] = useLocalStorage("flw_trans_id", "");

  useEffect(() => {
    set_trans_id("");
  }, []);

  const session = useSession();

  return (
    <div className="w-full h-full relative">
      <PageTitle title="Subscriptions & Billing" />
      {session.data?.user.subscription_active ? (
        <SubscriptionActiveTheme />
      ) : (
        <NoSubscriptionTheme />
      )}
    </div>
  );
}
