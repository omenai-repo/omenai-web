import { sendMailVerification } from "@shared/emails/controller/emailController";
import AcceptGalleryMail from "@shared/emails/views/gallery/AcceptGalleryMail";
import RejectGalleryMail from "@shared/emails/views/gallery/RejectGalleryMail";
import GalleryVerificationEmail from "@shared/emails/views/gallery/verifyGallery";

type EmailData = {
  name: string;
  email: string;
};
export const sendGalleryRejectedMail = async ({ name, email }: EmailData) => {
  await sendMailVerification({
    prefix: "Onboarding",
    from: "onboarding",
    to: email,
    subject: "Update on Your Gallery Account Verification",
    react: RejectGalleryMail(name),
  });
};
