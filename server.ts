import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { generateBadge } from "./src/generator";
import { join } from "path";
import { sendBadge } from "./src/mailer";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Badge Generator Server is running.");
});

app.post("/generate", async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body); // Log the request body
    const { id, email, fullname } = req.body;
    console.log("Received data:", { id, email, fullname });

    // Continue with badge generation and sending email
    const outputPath = join(__dirname, "badge", `${id}.png`);
    const result = await generateBadge(id, outputPath);

    console.log(result);
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
