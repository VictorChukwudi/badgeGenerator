import { createCanvas, loadImage } from "canvas";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import bwipjs from "bwip-js";

const badgeDirectory = "/tmp/badge"; // Writable directory on Render

async function generateBadge(id: string): Promise<string> {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  try {
    // Ensure the directory exists
    await mkdir(badgeDirectory, { recursive: true });

    const template = await loadImage(join(__dirname, "badge_template.png"));
    ctx.drawImage(template, 0, 0, 500, 500);

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "black";

    // Generate barcode as PNG buffer
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128",
      text: id,
      scale: 1,
      height: 3,
      includetext: true,
      textxalign: "center",
    });

    const barcodeImage = await loadImage(barcodeBuffer);
    const barcodeX = (canvas.width - barcodeImage.width) / 2;
    const barcodeY = 380;
    ctx.drawImage(barcodeImage, barcodeX, barcodeY);

    const buffer = canvas.toBuffer("image/png");
    const badgePath = join(badgeDirectory, `${id}.png`);
    await writeFile(badgePath, buffer);

    console.log(`✅ Badge saved: ${badgePath}`);
    return badgePath; // Return path of generated badge
  } catch (error) {
    console.error("❌ Error generating badge:", error);
    throw error;
  }
}

async function deleteBadge(badgePath: string): Promise<void> {
  try {
    await unlink(badgePath);
    console.log(`🗑️ Deleted badge: ${badgePath}`);
  } catch (error) {
    console.error(`❌ Failed to delete badge: ${badgePath}`, error);
  }
}

export { generateBadge, deleteBadge };
