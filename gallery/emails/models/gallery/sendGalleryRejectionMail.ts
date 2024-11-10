import { sendMailVerification } from "@/emails/controller/emailController";
import AcceptGalleryMail from "@/emails/views/gallery/AcceptGalleryMail";
import RejectGalleryMail from "@/emails/views/gallery/RejectGalleryMail";
import GalleryVerificationEmail from "@/emails/views/gallery/verifyGallery";

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
