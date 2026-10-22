import sharp from "sharp";
import fs from "fs";
import path from "path";

const wordmarkSrc = "C:/Users/user/.gemini/antigravity-ide/brain/c3dd98ad-493d-4238-8df3-a4d7b68dfa88/.user_uploaded/media_1792667421890.png";
const faviconSrc = "C:/Users/user/.gemini/antigravity-ide/brain/c3dd98ad-493d-4238-8df3-a4d7b68dfa88/.user_uploaded/media_1792667491738.jpg";

const outDir = path.resolve("public/brand");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processWordmark() {
  console.log("Processing wordmark logo...");
  const image = sharp(wordmarkSrc).trim();
  const trimmedMeta = await image.metadata();
  console.log(`Trimmed wordmark: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // 1. Full Color PNG (Optimized & Trimmed)
  const colorPath = path.join(outDir, "gospels-logo-color.png");
  await image.clone().png({ quality: 100, compressionLevel: 9 }).toFile(colorPath);
  console.log("Saved color logo to", colorPath);

  // Read raw pixels to generate crisp monochrome silhouettes with luminance shading
  const { data, info } = await image.clone().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Buffer for White monochrome: RGB = 255, 255, 255, Alpha = original alpha with tone mapping
  const whiteData = Buffer.alloc(width * height * 4);
  // Buffer for Black monochrome: RGB = 15, 23, 42 (#0F172A slate-900), Alpha = original alpha
  const blackData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const destIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const a = channels === 4 ? data[srcIdx + 3] : 255;

    // Luminance formula (Perceived brightness)
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // White version: pure white foreground with shading preserving contrast
    whiteData[destIdx] = 255;
    whiteData[destIdx + 1] = 255;
    whiteData[destIdx + 2] = 255;
    whiteData[destIdx + 3] = a > 10 ? Math.min(255, Math.round(a * (0.65 + 0.35 * (lum / 255)))) : 0;

    // Black version: deep slate-900 (#0F172A)
    blackData[destIdx] = 15;
    blackData[destIdx + 1] = 23;
    blackData[destIdx + 2] = 42;
    blackData[destIdx + 3] = a > 10 ? Math.min(255, Math.round(a * (0.65 + 0.35 * ((255 - lum) / 255)))) : 0;
  }

  const whitePath = path.join(outDir, "gospels-logo-white.png");
  await sharp(whiteData, { raw: { width, height, channels: 4 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(whitePath);
  console.log("Saved monochrome white logo to", whitePath);

  const blackPath = path.join(outDir, "gospels-logo-black.png");
  await sharp(blackData, { raw: { width, height, channels: 4 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(blackPath);
  console.log("Saved monochrome black logo to", blackPath);
}

async function processFavicon() {
  console.log("Processing circular favicon emblem...");
  // The favicon is a circular graphic inside a black square. Let's create a transparent circle mask!
  const meta = await sharp(faviconSrc).metadata();
  const size = Math.min(meta.width, meta.height);

  // SVG Circular Mask
  const radius = Math.floor(size / 2);
  const circleMask = Buffer.from(`
    <svg width="${size}" height="${size}">
      <circle cx="${radius}" cy="${radius}" r="${radius - 4}" fill="#ffffff" />
    </svg>
  `);

  const maskedBuffer = await sharp(faviconSrc)
    .resize(size, size)
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const favColorPath = path.join(outDir, "gospels-favicon.png");
  await sharp(maskedBuffer).toFile(favColorPath);
  console.log("Saved circular favicon to", favColorPath);

  // Also create Next.js App Router favicons
  const appIconPath = path.resolve("app/icon.png");
  await sharp(maskedBuffer).resize(192, 192).png().toFile(appIconPath);
  console.log("Saved app/icon.png");

  const publicFaviconPath = path.resolve("public/favicon.ico");
  await sharp(maskedBuffer).resize(48, 48).png().toFile(publicFaviconPath);
  console.log("Saved public/favicon.ico");

  // Monochrome Favicon (White and Black versions)
  const { data, info } = await sharp(maskedBuffer).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const favWhiteData = Buffer.alloc(width * height * 4);
  const favBlackData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const destIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const a = channels === 4 ? data[srcIdx + 3] : 255;

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    favWhiteData[destIdx] = 255;
    favWhiteData[destIdx + 1] = 255;
    favWhiteData[destIdx + 2] = 255;
    favWhiteData[destIdx + 3] = a > 20 ? Math.min(255, Math.round(a * (lum / 255))) : 0;

    favBlackData[destIdx] = 15;
    favBlackData[destIdx + 1] = 23;
    favBlackData[destIdx + 2] = 42;
    favBlackData[destIdx + 3] = a > 20 ? Math.min(255, Math.round(a * ((255 - lum) / 255))) : 0;
  }

  const favWhitePath = path.join(outDir, "gospels-favicon-white.png");
  await sharp(favWhiteData, { raw: { width, height, channels: 4 } }).png().toFile(favWhitePath);
  console.log("Saved monochrome white favicon to", favWhitePath);

  const favBlackPath = path.join(outDir, "gospels-favicon-black.png");
  await sharp(favBlackData, { raw: { width, height, channels: 4 } }).png().toFile(favBlackPath);
  console.log("Saved monochrome black favicon to", favBlackPath);
}

async function run() {
  await processWordmark();
  await processFavicon();
  console.log("All logo and favicon assets successfully generated!");
}

run().catch(console.error);
