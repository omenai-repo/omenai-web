import { sendMailVerification } from "@/emails/controller/emailController";
import PaymentSuccessfulMail from "@/emails/views/payment/PaymentSuccessMail";
import PasswordRecoveryEmail from "@/emails/views/recovery/PasswordRecoveryEmail";
import SubscriptionPaymentFailedMail from "@/emails/views/subscription/SubscriptionPaymentFailedMail";
import SubscriptionPaymentSuccessfulMail from "@/emails/views/subscription/SubscriptionPaymentSuccessfulMail";
import { render } from "@react-email/render";

type EmailData = {
  email: string;
};
export const sendPaymentSuccessMail = async ({ email }: EmailData) => {
  // Set up resend here instead
  await sendMailVerification({
    to: email,
    subject: "Confirmation: Successful Subscription Payment",
    html: render(PaymentSuccessfulMail(), {
      pretty: true,
    }),
  });
};
