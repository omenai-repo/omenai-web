import Test from "@shared/app/Test";
import { sendGalleryAcceptedMail } from "@shared/emails/models/gallery/sendGalleryAcceptedMail";
import { sendGalleryRejectedMail } from "@shared/emails/models/gallery/sendGalleryRejectionMail";
import { sendIndividualMail } from "@shared/emails/models/individuals/sendIndividualMail";
import { connectMongoDB } from "@shared/lib/mongo_connect/mongoConnect";
import { Proration } from "@shared/models/prorations/ProrationSchemaModel";
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
