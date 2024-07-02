import { sendMailVerification } from "@/emails/controller/emailController";
import GalleryVerificationEmail from "@/emails/views/gallery/verifyGallery";
import PasswordUpdateConfirmationCodeEmail from "@/emails/views/recovery/PasswordUpdateConfirmationCodeEmail";
import { render } from "@react-email/render";

type EmailData = {
  username: string;
  token: string;
  gallery_name: string;
  email: string;
};
export const sendPasswordConfirmationCodeMail = async ({
  username,
  email,
  token,
  gallery_name,
}: EmailData) => {
  await sendMailVerification({
    to: email,
    subject: "Password Confirmation Code request",
    html: render(
      PasswordUpdateConfirmationCodeEmail(username, token, gallery_name),
      {
        pretty: true,
      }
    ),
  });
};
