import { createCanvas, loadImage } from "canvas";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import bwipjs from "bwip-js";

const badgeDirectory = "/tmp/badge"; // Writable directory on Render
const badgeDirectory2 = join(__dirname, "badge");

async function generateBadge(
  id: string,
  fullname: string,
  type: string
): Promise<string> {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  try {
    // Ensure the directory exists
    await mkdir(badgeDirectory, { recursive: true });

    const tempName =
      type == "moga"
        ? "template/official_moga_temp.png"
        : "template/official_patriot_temp.png";
    const template = await loadImage(join(__dirname, tempName));
    ctx.drawImage(template, 0, 0, 500, 500);

    ctx.font = "bold 24px 'Gabriola'";
    ctx.fillStyle = "#fe0000";

    //Add Fullname
    ctx.textAlign = "center";
    ctx.shadowBlur = 50;
    ctx.fillText(fullname, canvas.width / 2, 378);

    // Generate barcode as PNG buffer
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128",
      text: id,
      scale: 1,
      height: 3,
      includetext: true,
      barcolor: "#935e1d",
      textxalign: "center",
      textcolor: "#935e1d",
    });

    const barcodeImage = await loadImage(barcodeBuffer);
    const barcodeX = (canvas.width - barcodeImage.width) / 2;
    const barcodeY = 382;
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
async function generateBadge2(id: string, fullname: string): Promise<string> {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  try {
    // Ensure the directory exists
    await mkdir(badgeDirectory2, { recursive: true });

    const template = await loadImage(
      join(__dirname, "templates/official_patriot_temp.png")
    );
    ctx.drawImage(template, 0, 0, 500, 500);

    ctx.font = "bold 24px 'Gabriola'";
    ctx.fillStyle = "#fe0000";

    ctx.textAlign = "center";
    ctx.shadowBlur = 50;
    ctx.fillText(fullname, canvas.width / 2, 378);
    // Generate barcode as PNG buffer
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128",
      text: id,
      scale: 1,
      height: 3,
      includetext: true,
      barcolor: "#935e1d",
      textxalign: "center",
      textcolor: "#935e1d",
    });

    const barcodeImage = await loadImage(barcodeBuffer);
    const barcodeX = (canvas.width - barcodeImage.width) / 2;
    const barcodeY = 382;
    ctx.drawImage(barcodeImage, barcodeX, barcodeY);

    const buffer = canvas.toBuffer("image/png");
    const badgePath = join(badgeDirectory2, `${id}.png`);
    await writeFile(badgePath, buffer);

    console.log(`✅ Badge saved: ${badgePath}`);
    return badgePath; // Return path of generated badge
  } catch (error) {
    console.error("❌ Error generating badge:", error);
    throw error;
  }
}
async function generateBadge3(id: string, fullname: string): Promise<string> {
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  try {
    // Ensure the directory exists
    await mkdir(badgeDirectory2, { recursive: true });

    const template = await loadImage(
      join(__dirname, "templates/official_moga_temp.png")
    );
    ctx.drawImage(template, 0, 0, 500, 500);

    ctx.font = "bold 24px 'Gabriola'";
    ctx.fillStyle = "#fe0000";

    ctx.textAlign = "center";
    ctx.shadowBlur = 50;
    ctx.fillText(fullname, canvas.width / 2, 378);
    // Generate barcode as PNG buffer
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128",
      text: id,
      scale: 1,
      height: 3,
      includetext: true,
      barcolor: "#935e1d",
      textxalign: "center",
      textcolor: "#935e1d",
    });

    const barcodeImage = await loadImage(barcodeBuffer);
    const barcodeX = (canvas.width - barcodeImage.width) / 2;
    const barcodeY = 382;
    ctx.drawImage(barcodeImage, barcodeX, barcodeY);

    const buffer = canvas.toBuffer("image/png");
    const badgePath = join(badgeDirectory2, `${id}.png`);
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

export { generateBadge, generateBadge2, generateBadge3, deleteBadge };
