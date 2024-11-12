import { promotional_storage } from "@shared/appwrite";
import { ImageFormat, ImageGravity } from "appwrite";

export const getPromotionalFileView = (
  fileId: string,
  width: number,
  height?: number,
  format?: string
) => {
  const fileData = promotional_storage.getFilePreview(
    process.env.NEXT_PUBLIC_APPWRITE_PROMOTIONAL_BUCKET_ID!,
    fileId,

    width, // width, will be resized using this value.
    height ? height : 0, // height, ignored when 0
    ImageGravity.Center, // crop center
    90, // slight compression
    0, // border width
    "FFFFFF", // border color
    0, // border radius
    1, // full opacity
    0, // no rotation
    "FFFFFF", // background color
    ImageFormat.Webp
  );

  return fileData;
};
