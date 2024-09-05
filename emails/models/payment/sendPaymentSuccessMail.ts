import { sendMailVerification } from "@/emails/controller/emailController";
import PaymentSuccessfulMail from "@/emails/views/payment/PaymentSuccessMail";
import { render } from "@react-email/render";

type EmailData = {
  email: string;
  name: string;
  artwork: string;
  price: string;
  order_id: string;
  order_date: string;
  transaction_Id: string;
};
export const sendPaymentSuccessMail = async ({
  email,
  name,
  artwork,
  price,
  order_id,
  order_date,
  transaction_Id,
}: EmailData) => {
  // Set up resend here instead
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Confirmation: Successful Order Payment",
    react: PaymentSuccessfulMail(
      name,
      artwork,
      price,
      order_id,
      order_date,
      transaction_Id
    ),
  });
};
