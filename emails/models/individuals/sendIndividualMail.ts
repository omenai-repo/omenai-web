import { sendMailVerification } from "@/emails/controller/emailController";
import UserVerificationEmail from "@/emails/views/individuals/verifyIndividual";
import { render } from "@react-email/render";
type EmailData = {
  name: string;
  email: string;
  token: string;
};
export const sendIndividualMail = async ({ name, email, token }: EmailData) => {
  await sendMailVerification({
    prefix: "Onboarding",
    from: "onboarding",
    to: email,
    subject: "Verify your Omenai account.",
    react: UserVerificationEmail(name, token),
  });
};
