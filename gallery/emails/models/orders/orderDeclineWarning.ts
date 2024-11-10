import { sendMailVerification } from "@/emails/controller/emailController";
import OrderAcceptedEmail from "@/emails/views/order/OrderAcceptedEmail";
import OrderAutoDeclined from "@/emails/views/order/OrderAutoDeclined";
import OrderDeclinedEmail from "@/emails/views/order/OrderDeclinedEmail";
import OrderDeclinedWarning from "@/emails/views/order/OrderDeclinedWarning";
import OrderRequestReceivedEmail from "@/emails/views/order/OrderRequestRRecievedEmail";

type EmailData = {
  name: string;
  email: string | string[];
};
export const sendOrderDeclineWarning = async ({ name, email }: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "orders",
    to: [...email],
    subject: "Notice: Potential Order Request Decline",
    react: OrderDeclinedWarning(name),
  });
};
