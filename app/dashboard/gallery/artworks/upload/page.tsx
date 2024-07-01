"use client";

import NoSubscriptionBlock from "../../components/NoSubscriptionBlock";
import NoVerificationBlock from "../../components/NoVerificationBlock";
import PageTitle from "../../components/PageTitle";
import UploadArtworkDetails from "./features/UploadArtworkDetails";
import { useSession } from "next-auth/react";

export default function UploadArtwork() {
  const session = useSession();
  return (
    <div className="relative">
      <PageTitle title="Upload an artwork" />
      {!session?.data?.user.gallery_verified &&
        !session?.data?.user.subscription_active && <NoVerificationBlock />}
      {session?.data?.user.gallery_verified &&
        !session?.data?.user.subscription_active && <NoSubscriptionBlock />}
      {!session?.data?.user.gallery_verified &&
        session?.data?.user.subscription_active && <NoVerificationBlock />}
      {session?.data?.user.gallery_verified &&
        session.data.user.subscription_active && (
          <div className="">
            <UploadArtworkDetails />
          </div>
        )}
    </div>
  );
}
