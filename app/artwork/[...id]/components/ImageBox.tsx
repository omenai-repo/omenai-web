"use client";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

type ImageBoxProps = {
  url: string;
  title: string;
};
export default function ImageBox({ url, title }: ImageBoxProps) {
  const image_href = getImageFileView(url, 800);

  return (
    <div className="w-auto h-full max-h-[1000px]">
      <Image
        src={image_href}
        alt={`${title} image`}
        width={600}
        height={500}
        className="min-w-[300px] aspect-auto object-top object-cover cursor-pointer"
      />
    </div>
  );
}
