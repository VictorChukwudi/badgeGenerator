import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { EMAIL, PASSWORD } = process.env;

async function sendBadge(email: string, badgePath: string): Promise<void> {
  console.log(`📩 Sending badge to: ${email}`);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let mailOptions = {
    from: EMAIL,
    to: email,
    subject: "MOGA Badge",
    text: "Here is your MOGA badge.",
    attachments: [{ filename: "badge.png", path: badgePath }],
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to: ${email}`);
}

export { sendBadge };
