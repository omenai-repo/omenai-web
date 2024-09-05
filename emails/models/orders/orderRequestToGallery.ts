import { sendMailVerification } from "@/emails/controller/emailController";
import OrderRequestToGalleryMail from "@/emails/views/order/OrderRequestToGalleryEmail";
import { render } from "@react-email/render";
type EmailData = {
  name: string;
  email: string;
  artwork_data: any;
  buyer: string;
  date: string;
};
export const sendOrderRequestToGalleryMail = async ({
  name,
  email,
  buyer,
  date,
  artwork_data,
}: EmailData) => {
  await sendMailVerification({
    prefix: "Orders",
    from: "transactions",
    to: email,
    subject: "Notification of order request for Your Artwork",
    react: OrderRequestToGalleryMail(name, buyer, date, artwork_data),
  });
};
