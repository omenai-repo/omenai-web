import { sendMailVerification } from "@/emails/controller/emailController";
import OrderAcceptedEmail from "@/emails/views/order/OrderAcceptedEmail";
import OrderAutoDeclined from "@/emails/views/order/OrderAutoDeclined";
import OrderDeclinedEmail from "@/emails/views/order/OrderDeclinedEmail";
import OrderRequestReceivedEmail from "@/emails/views/order/OrderRequestRRecievedEmail";

type EmailData = {
  name: string;
  email: string;
  artwork_data: any;
};
export const sendOrderAutoDeclinedMail = async ({
  name,
  email,
  artwork_data,
}: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Order auto declined",
    react: OrderAutoDeclined(name, artwork_data),
  });
};
