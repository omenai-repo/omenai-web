import { sendMailVerification } from "@/emails/controller/emailController";
import OrderRequestReceivedEmail from "@/emails/views/order/OrderRequestRRecievedEmail";

type EmailData = {
  name: string;
  email: string;
  artwork_data: any;
};
export const sendOrderRequestReceivedMail = async ({
  name,
  email,
  artwork_data,
}: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Acknowledgement of order request",
    react: OrderRequestReceivedEmail(name, artwork_data),
  });
};
