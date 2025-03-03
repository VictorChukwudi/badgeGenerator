import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { EMAIL, PASSWORD } = process.env;
async function sendBadge(email: string, badgePath: string) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let mailOptions = {
    from: `"Badge Generator" ${EMAIL}`,
    to: email,
    subject: "Your Badge is Ready!",
    text: "Here is your badge.",
    attachments: [{ filename: "badge.png", path: badgePath }],
  };

  await transporter.sendMail(mailOptions);
}

export { sendBadge };
