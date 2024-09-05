import Test from "@/app/Test";
import { sendIndividualMail } from "@/emails/models/individuals/sendIndividualMail";
import { connectMongoDB } from "@/lib/mongo_connect/mongoConnect";
import { Proration } from "@/models/prorations/ProrationSchemaModel";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    await connectMongoDB();
    const prorationValue = await Proration.findOne(
      {
        gallery_id: "425353646",
      },
      "value"
    );
    const amount = prorationValue ? 5 - prorationValue.value : 5;
    await Proration.updateOne(
      { gallery_id: 425353646 },
      { $set: { value: 0 } }
    );
    return Response.json({ message: amount });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
