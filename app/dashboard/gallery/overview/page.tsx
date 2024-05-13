import { Suspense } from "react";
import Tour from "../components/Tour";
import EditorialRecommendations from "./features/editorials/EditorialRecommendations";
import Highlight from "./features/highlight/Highlight";
import Orders from "./features/orders/Orders";
import PopularArtworks from "./features/popular_artworks/PopularArtworks";
import OverviewComponentCard from "./components/OverviewComponentCard";
import ActivityWrapper from "./features/sales_activity/ActivityWrapper";
import Loader from "@/components/loader/Loader";

export default function OverviewPage() {
  return (
    <div className="w-full">
      <Tour />
      <Highlight />

      <div className="grid lg:grid-cols-2 gap-x-[1rem] pb-4">
        <div className="">
          <Suspense fallback={<Loader />}>
            <PopularArtworks />
          </Suspense>
        </div>

        <Suspense fallback={<Loader />}>
          <ActivityWrapper />
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Orders />
        </Suspense>

        <EditorialRecommendations />
      </div>
    </div>
  );
}
