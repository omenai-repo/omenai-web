import { sendMailVerification } from "@shared/emails/controller/emailController";
import OrderAcceptedEmail from "@shared/emails/views/order/OrderAcceptedEmail";
import OrderAutoDeclined from "@shared/emails/views/order/OrderAutoDeclined";
import OrderDeclinedEmail from "@shared/emails/views/order/OrderDeclinedEmail";
import OrderDeclinedWarning from "@shared/emails/views/order/OrderDeclinedWarning";
import OrderRequestReceivedEmail from "@shared/emails/views/order/OrderRequestRRecievedEmail";

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
