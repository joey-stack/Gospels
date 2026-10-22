import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function inspectGif() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const gifBuffer = fs.readFileSync(path.resolve("./screenshots/header79.gif"));
  const base64Gif = `data:image/gif;base64,${gifBuffer.toString("base64")}`;

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#0F172A; display:flex; justify-content:center; align-items:center; min-height:100vh;">
        <img id="gif" src="${base64Gif}" style="width:100%; height:auto;" />
      </body>
    </html>
  `);

  await page.waitForTimeout(600);
  await page.screenshot({ path: path.resolve("./screenshots/gif_frame_0.png") });

  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.resolve("./screenshots/gif_frame_1.png") });

  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.resolve("./screenshots/gif_frame_2.png") });

  console.log("Frames captured successfully with base64!");
  await browser.close();
}

inspectGif().catch((err) => {
  console.error("Error inspecting GIF:", err);
  process.exit(1);
});
