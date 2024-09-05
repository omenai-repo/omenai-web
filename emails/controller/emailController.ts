import Test from "@/app/Test";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailPayload = {
  prefix: string;
  from: string;
  to: string;
  subject: string;
  react: React.ReactNode;
};

export const sendMailVerification = async (data: EmailPayload) => {
  await resend.emails.send({
    from:
      data.from === "onboarding"
        ? `${data.prefix} <onboarding@omenai.app>`
        : `${data.prefix} <omenai@omenai.app>`,
    to: data.to,
    subject: data.subject,
    react: data.react,
  });
};
