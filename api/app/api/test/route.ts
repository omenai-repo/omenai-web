import { sendGalleryRejectedMail } from "@shared/emails/models/gallery/sendGalleryRejectionMail";

export async function POST() {
  try {
    sendGalleryRejectedMail({
      name: "Whimsical mysteries",
      email: "dantereus1@gmail.com",
    });
    return Response.json({ message: "Sent" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
