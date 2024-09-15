import Test from "@/app/Test";
import { sendGalleryAcceptedMail } from "@/emails/models/gallery/sendGalleryAcceptedMail";
import { sendGalleryRejectedMail } from "@/emails/models/gallery/sendGalleryRejectionMail";
import { sendIndividualMail } from "@/emails/models/individuals/sendIndividualMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Proration } from "@/models/prorations/ProrationSchemaModel";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
