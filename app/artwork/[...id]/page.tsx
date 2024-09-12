import DesktopNavbar from "@/components/navbar/desktop/DesktopNavbar";
import ProductBox from "./components/ProductBox";
import { fetchSingleArtwork } from "@/services/artworks/fetchSingleArtwork";
import SimilarArtworks from "./components/SimilarArtworks";
import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
import Footer from "@/components/footer/Footer";
import { notFound } from "next/navigation";
import FullArtworkDetails from "./components/FullArtworkDetails";
import ArtistInformation from "./components/ArtistInformation";
import SimilarArtworksByArtist from "./components/SimilarArtworksByArtist";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(nextAuthOptions);

  const artworkDetails:
    | {
        isOk: boolean;
        message: string;
        data: ArtworkResultTypes;
      }
    | undefined = await fetchSingleArtwork(decodeURIComponent(params.id));

  if (!artworkDetails?.isOk) throw new Error("Something went wrong");
  if (artworkDetails === undefined) return notFound();
  if (artworkDetails.data === null) return notFound();

  return (
    <div className="">
      <DesktopNavbar />

      <div className="p-2 md:p-8">
        <ProductBox
          data={artworkDetails.data}
          sessionId={
            session?.user.role === "user" ? session?.user.id : undefined
          }
        />
        <hr className="border-dark/10" />
        <FullArtworkDetails data={artworkDetails.data} />
        <ArtistInformation
          name={artworkDetails.data.artist}
          year={artworkDetails.data.artist_birthyear}
          location={artworkDetails.data.artist_country_origin}
        />
        <SimilarArtworks
          title={artworkDetails.data.title}
          sessionId={
            session?.user.role === "user" ? session?.user.id : undefined
          }
          medium={artworkDetails.data.medium}
        />
        <SimilarArtworksByArtist
          sessionId={
            session?.user.role === "user" ? session?.user.id : undefined
          }
          artist={artworkDetails.data.artist}
        />
      </div>

      <Footer />
    </div>
  );
}
