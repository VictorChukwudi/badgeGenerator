import express, { Request, Response } from "express";
import cors from "cors";
import { generateBadge, deleteBadge } from "./src/generator";
import { sendBadge } from "./src/mailer";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("🎫 Badge Generator Server is running.");
});

app.post("/generate", async (req: Request, res: Response) => {
  try {
    const { id, email, fullname } = req.body;
    console.log("📥 Received data:", { id, email, fullname });

    // Generate badge
    const badgePath = await generateBadge(id);

    // Send badge via email
    await sendBadge(email, badgePath);

    // Delete badge after sending
    await deleteBadge(badgePath);

    res.status(200).send(`✅ Badge generated and sent: ${id}.png`);
  } catch (error) {
    console.error("❌ Error handling generate request:", error);
    res.status(500).send("Error generating badge");
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
