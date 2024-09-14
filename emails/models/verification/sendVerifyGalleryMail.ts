import { sendMailVerification } from "@/emails/controller/emailController";
import GalleryVerificationEmail from "@/emails/views/gallery/verifyGallery";
import VerifyGalleryEmaiil from "@/emails/views/verification/VerifyGalleryEmail";

type EmailData = {
  name: string;
  email: string;
};
export const sendVerifyGalleryMail = async ({ name, email }: EmailData) => {
  await sendMailVerification({
    prefix: "Onboarding",
    from: "onboarding",
    to: email,
    subject: "Gallery account verification request.",
    react: VerifyGalleryEmaiil(name),
  });
};
