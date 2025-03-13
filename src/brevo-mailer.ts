import dotenv from "dotenv";
import fs from "fs";
import axios from "axios";

dotenv.config();
const { BREVO_API_KEY } = process.env;

const url = "https://api.sendinblue.com/v3/smtp/email";

const brevoMailer = async (email, badgePath) => {
    try {
        const headers = {
            accept: "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json",
        };

        // Read file with encoding
        const fileContent = fs.readFileSync(badgePath, { encoding: "base64" });
        console.log("Base64 Encoded Image (First 100 chars):", fileContent.substring(0, 100));

        const body = {
            sender: {
                name: "MOGA",
                email: "victorukay0@gmail.com",
            },
            to: [{ email }],
            subject: "MOGA Badge",
            htmlContent: "<p>Here is your MOGA Badge.</p>",
            attachments: [
                {
                    name: "moga_badge.png",
                    content: fileContent, // No need to manually encode
                    contentType: "image/png",
                },
            ],
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
