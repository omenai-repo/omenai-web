import { sendMailVerification } from "@shared/emails/controller/emailController";
import OrderAcceptedEmail from "@shared/emails/views/order/OrderAcceptedEmail";
import OrderRequestReceivedEmail from "@shared/emails/views/order/OrderRequestRRecievedEmail";

type EmailData = {
  name: string;
  email: string;
  order_id: string;
  user_id: string;
  artwork_data: any;
};
export const sendOrderAcceptedMail = async ({
  name,
  email,
  order_id,
  user_id,
  artwork_data,
}: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Your Order has been Accepted!",
    react: OrderAcceptedEmail(name, order_id, user_id, artwork_data),
  });
};
