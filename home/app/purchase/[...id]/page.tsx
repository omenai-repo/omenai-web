import { fetchSingleArtworkOnPurchase } from "@shared/services/artworks/fetchSingleArtworkOnPurchase";
import PurchaseComponentWrapper from "./components/PurchaseComponentWrapper";

export default async function page({ params }: { params: { id: string } }) {
  const artwork = await fetchSingleArtworkOnPurchase(
    decodeURIComponent(params.id)
  );
  if (!artwork?.isOk) throw new Error("Something went wrong");

  return <PurchaseComponentWrapper artwork={artwork.data} />;
}
