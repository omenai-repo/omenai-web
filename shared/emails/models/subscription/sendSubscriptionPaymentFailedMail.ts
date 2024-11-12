import { sendMailVerification } from "@shared/emails/controller/emailController";
import PasswordRecoveryEmail from "@shared/emails/views/recovery/PasswordRecoveryEmail";
import SubscriptionPaymentFailedMail from "@shared/emails/views/subscription/SubscriptionPaymentFailedMail";

type EmailData = {
  name: string;
  email: string;
};
export const sendSubscriptionPaymentFailedMail = async ({
  name,
  email,
}: EmailData) => {
  // Set up resend here instead
  await sendMailVerification({
    prefix: "Subscriptions",
    from: "transactions",
    to: email,
    subject: " Notification: Failed Subscription Payment Attempt",
    react: SubscriptionPaymentFailedMail(name),
  });
};
