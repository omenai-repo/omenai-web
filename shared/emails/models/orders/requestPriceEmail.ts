import { sendMailVerification } from "@shared/emails/controller/emailController";
import RequestPriceEmail from "@shared/emails/views/order/RequestPriceEmail";

type EmailData = {
  name: string;
  email: string;
  artwork_data: Pick<
    ArtworkSchemaTypes,
    "title" | "artist" | "art_id" | "pricing" | "url" | "medium"
  >;
};
export const sendPriceEmail = async ({
  name,
  email,
  artwork_data,
}: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: `Requested Information: Base Price of artwork`,
    react: RequestPriceEmail(name, artwork_data),
  });
};
