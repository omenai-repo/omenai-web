import { sendMailVerification } from "@/emails/controller/emailController";

import OrderDeclinedWarning from "@/emails/views/order/OrderDeclinedWarning";
import OrderRequestReminder from "@/emails/views/order/OrderRequessstReminder";

type EmailData = {
  name: string;
  email: string | string[];
};
export const sendOrderRequestReminder = async ({ name, email }: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "orders",
    to: "omenai@omenai.app",
    bcc: [...email],
    subject: "Order Request reminder",
    react: OrderRequestReminder(name),
  });
};
