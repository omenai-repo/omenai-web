import Test from "@/app/Test";
import { sendIndividualMail } from "@/emails/models/individuals/sendIndividualMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Proration } from "@/models/prorations/ProrationSchemaModel";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    await resend.emails.send({
      from: "Orders <omenai@omenai.app>",
      to: "gbenro@omenai.net",
      subject: "Email domain test",
      react: Test(),
    });
    return Response.json({ message: "Sent" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
