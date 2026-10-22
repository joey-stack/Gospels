import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function inspectMotion() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1000, height: 600 },
  });

  const gifBuffer = fs.readFileSync(path.resolve("./screenshots/header79.gif"));
  const base64Gif = `data:image/gif;base64,${gifBuffer.toString("base64")}`;

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <img id="gif" src="${base64Gif}" style="width:100%; height:auto;" />
      </body>
    </html>
  `);

  for (let i = 0; i < 4; i++) {
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.resolve(`./screenshots/motion_${i}.png`) });
  }

  await browser.close();
}

inspectMotion().catch(console.error);
