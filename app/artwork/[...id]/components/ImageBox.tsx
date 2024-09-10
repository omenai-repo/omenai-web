"use client";
import { getImageFileView } from "@/lib/storage/getImageFileView";
import image from "next/image";
import Image from "next/image";
import { useState, useRef } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

type ImageBoxProps = {
  url: string;
  title: string;
  availability: boolean;
};
export default function ImageBox({ url, title, availability }: ImageBoxProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [zoomScale, setZoomScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState(getImageFileView(url, 800)); // Default to low-res

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    setZoomScale(2);
    setImageSrc(getImageFileView(url, 1500)); // Replace with higher resolution (e.g., 1500px)

    requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setPosition({ x, y });
    });
  };

  const handleMouseLeave = () => {
    // Reset to center when not hovering

    setPosition({ x: 50, y: 50 });
    setImageSrc(getImageFileView(url, 800)); // Replace with higher resolution (e.g., 1000px)

    setZoomScale(1);
  };

  return (
    <div
      className="relative w-auto h-full max-h-[1000px] artContainer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <Image
        src={imageSrc}
        alt={`${title} image`}
        width={600}
        height={500}
        loading="lazy"
        className="w-full h-full aspect-auto object-cover object-center cursor-pointer artImage"
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: `${position.x}% ${position.y}%`,
          transition: "transform 0.4s ease, transform-origin 0.2s ease",
        }}
      />
    </div>
  );
}
