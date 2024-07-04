"use client";
import { gallerySubscriptionStore } from "@/store/gallery/gallery_subscriptions/GallerySubscriptions";
import NoSubscriptionTheme from "./features/NoSubscriptionTheme";
import SubscriptionActiveTheme from "./features/SubscriptionActiveTheme";
import { useSession } from "next-auth/react";
import PageTitle from "../components/PageTitle";
export default function Subscription() {
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
