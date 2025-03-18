import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const { BREVO_API_KEY } = process.env;

const url = "https://api.sendinblue.com/v3/smtp/email";

const brevoMailer = async (email: string, downloadUrl: string, imageUrl: string) => {
    try {
        const headers = {
            accept: "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json",
        };

        const htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">

  <h2 style="color: #333; text-align: center;">Welcome! Your MOGA Badge is Ready.</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #555; text-align: center;">
    Thank you for successfully registering. Your MOGA Badge is now available.
  </p>

  <p style="font-size: 16px; line-height: 1.6; color: #555; text-align: center;">
    Download your badge here: <br>
    <span style="word-break: break-all; text-decoration: underline; color: #007BFF; cursor: pointer;" 
          onclick="window.open('${downloadUrl}', '_blank')">
      ${downloadUrl}
    </span>
  </p>

  <p style="font-size: 14px; color: #777; margin-top: 30px; text-align: center;">
    Keep this badge safe. It confirms your registration.
  </p>

</div>`;

        const body = {
            sender: {
                name: "MOGA",
                email: "moga.patriot@gmail.com",
            },
            to: [{ email }],
            subject: "MOGA Badge",
            htmlContent

        };

        const response = await axios.post(url, body, { headers });

        console.log(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Brevo API error:", error.response ? error.response.data : error.message);
        } else {
            console.error("Error sending email:", error);
        }
    }
};

export default brevoMailer;
