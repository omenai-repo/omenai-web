import { sendMailVerification } from "@shared/emails/controller/emailController";
import OrderAcceptedEmail from "@shared/emails/views/order/OrderAcceptedEmail";
import OrderAutoDeclined from "@shared/emails/views/order/OrderAutoDeclined";
import OrderDeclinedEmail from "@shared/emails/views/order/OrderDeclinedEmail";
import OrderRequestReceivedEmail from "@shared/emails/views/order/OrderRequestRRecievedEmail";

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
