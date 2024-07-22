"use client";
import Dimensions from "./Dimensions";
import { GrCertificate } from "react-icons/gr";
import { formatPrice } from "@/utils/priceFormatter";
import { IoHeartOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import useLikedState from "@/custom/hooks/useLikedState";
import { useRouter } from "next/navigation";
import { actionStore } from "@/store/actions/ActionStore";
import { requestPrice } from "@/services/requests/requestPrice";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";
import { LoadSmall } from "@/components/loader/Load";
import { PiFrameCornersThin } from "react-icons/pi";

type ArtworkDetailTypes = {
  data: ArtworkResultTypes;
  sessionId: string | undefined;
};
export default function ArtworkDetail({ data, sessionId }: ArtworkDetailTypes) {
  const { likedState, handleLike } = useLikedState(
    data.impressions as number,
    data.like_IDs as string[],
    sessionId,
    data.art_id
  );

  const [loading, setLoading] = useState(false);

  const [toggleLoginModal] = actionStore((state) => [state.toggleLoginModal]);

  const router = useRouter();
  const session = useSession();

  async function handleBuyButtonClick() {
    if (sessionId === undefined) toggleLoginModal(true);
    else {
      if (data.pricing.shouldShowPrice === "Yes") {
        router.push(`/purchase/${data.title}`);
      } else {
        setLoading(true);
        const artwork_data = {
          title: data.title,
          artist: data.artist,
          art_id: data.art_id,
          url: data.url,
          medium: data.medium,
          pricing: data.pricing,
        };
        const res = await requestPrice(
          artwork_data,
          session.data!.user.email,
          session.data!.user.name
        );

        if (res?.isOk) {
          toast.success("Price data sent. Please check your email inbox");
          setLoading(false);
        } else {
          toast.error(
            "Something went wrong, please try again or contact us for assistance."
          );
          setLoading(false);
        }
      }
    }
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="">
        <h1 className="text-md font-medium">{data.title}</h1>
        <h3 className="text-base font-normal text-dark/70">{data.artist}</h3>
      </div>
      <p className="text-xs font-normal text-dark/80 gap-x-4 flex items-center">
        <span>{data.medium}</span>
        <span>|</span>
        <span>{data.rarity}</span>
      </p>
      <Dimensions dimensions={data.dimensions} />
      <div className="flex items-center gap-x-4">
        {data.certificate_of_authenticity === "Yes" && (
          <div className="flex gap-x-2 text-xs items-center px-4 py-1 bg-[#E7F6EC] text-[#004617] w-fit rounded-full">
            <GrCertificate />
            <p>Certificate of authenticity available</p>
          </div>
        )}
        <div className="flex gap-x-2 text-xs items-center px-4 py-1 bg-[#e5f4ff] text-[#30589f] w-fit rounded-full">
          <PiFrameCornersThin />
          {data.framing === "Framed"
            ? "Frame Included"
            : "Artwork is not framed"}
        </div>
      </div>

      <hr className="border-dark/10" />
      <div className="flex flex-col gap-y-2">
        <span className="text-[14px] font-light">Price</span>
        <h1 className=" text-sm font-bold">
          {!data.availability
            ? "Sold"
            : data.pricing.shouldShowPrice === "Yes"
            ? formatPrice(data.pricing.usd_price)
            : "Price Price on request"}
        </h1>
      </div>
      <hr className="border-dark/10" />

      <div className="flex flex-col gap-2 font-normal w-full text-[14px]">
        <button
          disabled={loading || !data.availability}
          onClick={handleBuyButtonClick}
          className="w-full bg-dark h-[50px] px-4  text-white hover:bg-dark/80 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-dark/50 hover:text-white hover:duration-200 grid place-items-center group"
        >
          {loading ? (
            <LoadSmall />
          ) : data.pricing.shouldShowPrice === "Yes" ? (
            !data.availability ? (
              "Artwork Sold"
            ) : (
              "Purchase artwork"
            )
          ) : !data.availability ? (
            "Artwork Sold"
          ) : (
            "Request price"
          )}
        </button>

        {(sessionId === undefined ||
          (sessionId && !likedState.ids.includes(sessionId))) && (
          <button
            onClick={() => handleLike(true)}
            className="w-full h-[50px] px-4 justify-center flex items-center gap-2  text-dark hover:bg-dark/10 hover:text-dark border border-dark/10 duration-300 group"
          >
            <span>Save artwork</span>
            <IoHeartOutline />
          </button>
        )}
        {sessionId !== undefined && likedState.ids.includes(sessionId) && (
          <button
            onClick={() => handleLike(false)}
            className="w-full h-[50px] px-4 rounded-md border flex justify-center items-center gap-2 hover:bg-dark/10 duration-200 border-dark/10 text-dark text-base group"
          >
            <span>Remove from saved</span>
            <GiCheckMark />
          </button>
        )}
      </div>
    </div>
  );
}
