import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { EMAIL, PASSWORD } = process.env;

async function sendBadge(
  email: string,
  badgePath: string,
  type: string
): Promise<void> {
  console.log(`📩 Sending badge to: ${email}`);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const subject = type == "moga" ? "MOGA Badge" : "True Patriot Badge";
  const filename = type == "moga" ? "moga_badge.png" : "top_badge.png";
  let mailOptions = {
    from: EMAIL,
    to: email,
    subject,
    text: "Here is your MOGA badge.",
    attachments: [{ filename, path: badgePath }],
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Email sent to: ${email}`);
}

export { sendBadge };
