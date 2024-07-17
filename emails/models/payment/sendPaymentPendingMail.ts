import { sendMailVerification } from "@/emails/controller/emailController";
import PaymentPendingMail from "@/emails/views/payment/PaymentPendingMail";
import { render } from "@react-email/render";

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
    to: email,
    subject: "Your Payment is being Processed",
    html: render(PaymentPendingMail(name, artwork), {
      pretty: true,
    }),
  });
};
