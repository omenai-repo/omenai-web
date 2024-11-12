import { editorial_storage } from "@shared/appwrite";
import { ImageFormat, ImageGravity } from "appwrite";

export const getEditorialCoverFileView = (
  fileId: string,
  width?: number,
  height?: number,
  format?: string
) => {
  const fileData = editorial_storage.getFilePreview(
    process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_BUCKET_ID!,
    fileId,

    width ? width : 0, // width, ignored when 0
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
