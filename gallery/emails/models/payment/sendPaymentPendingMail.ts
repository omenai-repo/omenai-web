import { sendMailVerification } from "@/emails/controller/emailController";
import PaymentPendingMail from "@/emails/views/payment/PaymentPendingMail";

type EmailData = {
  email: string;
  name: string;
  artwork: string;
};
export const sendPaymentPendingMail = async ({
  email,
  name,
  artwork,
}: EmailData) => {
  // Set up resend here instead
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Your Payment is being Processed",
    react: PaymentPendingMail(name, artwork),
  });
};
