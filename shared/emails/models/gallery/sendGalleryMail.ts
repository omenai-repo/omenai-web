import { sendMailVerification } from "@shared/emails/controller/emailController";
import GalleryVerificationEmail from "@shared/emails/views/gallery/verifyGallery";

type EmailData = {
  name: string;
  email: string;
  token: string;
};
export const sendGalleryMail = async ({ name, email, token }: EmailData) => {
  await sendMailVerification({
    prefix: "Onboarding",
    from: "onboarding",
    to: email,
    subject: "Verify your Omenai Gallery account.",
    react: GalleryVerificationEmail(name, token),
  });
};
