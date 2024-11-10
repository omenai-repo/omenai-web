import { sendMailVerification } from "@/emails/controller/emailController";
import PasswordRecoveryEmail from "@/emails/views/recovery/PasswordRecoveryEmail";
import SubscriptionPaymentFailedMail from "@/emails/views/subscription/SubscriptionPaymentFailedMail";
import SubscriptionPaymentSuccessfulMail from "@/emails/views/subscription/SubscriptionPaymentSuccessfulMail";

type EmailData = {
  name: string;
  email: string;
};
export const sendSubscriptionPaymentSuccessfulMail = async ({
  name,
  email,
}: EmailData) => {
  // Set up resend here instead
  await sendMailVerification({
    prefix: "Subscriptions",
    from: "transactions",
    to: email,
    subject: "Confirmation: Successful Subscription Payment",
    react: SubscriptionPaymentSuccessfulMail(name),
  });
};
