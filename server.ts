import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { generateBadge } from "./src/generator";
import { join } from "path";
import { sendBadge } from "./src/mailer";

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Badge Generator Server is running.");
});

app.get("/generate", async (req: Request, res: Response) => {
  try {
    const { id, email, fullname } = req.body;
    // const id = "00001";
    const outputPath = join(__dirname, "badge", `${id}.png`);
    await generateBadge(id, outputPath);
    await sendBadge(email, outputPath);
    res.status(200).send(`Badge generated: ${id}.png`);
  } catch (error) {
    console.error("Error handling generate request:", error);
    res.status(500).send("Error generating badge");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
