import { sendMailVerification } from "@shared/emails/controller/emailController";
import OrderAcceptedEmail from "@shared/emails/views/order/OrderAcceptedEmail";
import OrderDeclinedEmail from "@shared/emails/views/order/OrderDeclinedEmail";
import OrderRequestReceivedEmail from "@shared/emails/views/order/OrderRequestRRecievedEmail";

type EmailData = {
  name: string;
  email: string;
  reason: string;
  artwork_data: any;
};
export const sendOrderDeclinedMail = async ({
  name,
  email,
  reason,
  artwork_data,
}: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Your Order has been Declined!",
    react: OrderDeclinedEmail(name, reason, artwork_data),
  });
};
