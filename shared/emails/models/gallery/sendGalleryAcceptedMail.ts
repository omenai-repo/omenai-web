import { sendMailVerification } from "@shared/emails/controller/emailController";
import AcceptGalleryMail from "@shared/emails/views/gallery/AcceptGalleryMail";
import GalleryVerificationEmail from "@shared/emails/views/gallery/verifyGallery";

type EmailData = {
  name: string;
  email: string;
};
export const sendGalleryAcceptedMail = async ({ name, email }: EmailData) => {
  await sendMailVerification({
    prefix: "Onboarding",
    from: "onboarding",
    to: email,
    subject: "Your Gallery Account Has Been Successfully Verified!",
    react: AcceptGalleryMail(name),
  });
};
