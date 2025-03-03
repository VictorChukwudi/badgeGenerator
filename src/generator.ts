import { createCanvas, loadImage } from "canvas";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import bwipjs from "bwip-js";

async function generateBadge(id: string, outputPath: string): Promise<void> {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  try {
    console.log(join(__dirname, "badge_template.png"));
    const template = await loadImage(join(__dirname, "badge_template.png"));
    ctx.drawImage(template, 0, 0, 500, 500);

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";
    // ctx.fillText(id, 57, 400, 400);

    // Generate barcode as PNG buffer
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128", // Or another barcode type
      text: id,
      scale: 1,
      height: 3, // Adjust height as needed
      includetext: true, // Don't include the text below the barcode
      textxalign: "center", // Align text centrally
    });

    // Load barcode buffer into an Image object
    const barcodeImage = await loadImage(barcodeBuffer);

    // Calculate barcode position
    const barcodeX = (canvas.width - barcodeImage.width) / 2; // Center horizontally
    // const barcodeX = 50;
    const barcodeY = 380; // Adjust vertical position as needed

    // Draw barcode onto canvas
    ctx.drawImage(barcodeImage, barcodeX, barcodeY);
    // ctx.drawImage(barcodeImage,50,)

    const buffer = canvas.toBuffer("image/png");
    const badgeDirectory = join(__dirname, "badge");
    await mkdir(badgeDirectory, { recursive: true });
    const fullOutputPath = join(badgeDirectory, `${id}.png`);
    await writeFile(fullOutputPath, buffer);
    console.log(`Badge saved: ${fullOutputPath}`);
  } catch (error) {
    console.error("Error generating badge:", error);
    throw error;
  }
}

export { generateBadge };
