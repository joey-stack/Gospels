import { chromium } from "playwright";
import path from "path";

async function capturePreview() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1600, height: 1200 },
  });

  await page.goto("https://library.relume.io/components/header-76", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(3500);

  // Find preview iframe or component box
  const frames = page.frames();
  console.log("Total frames:", frames.length);

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const heading = await frame.$('h1');
    if (heading) {
      console.log(`Found h1 in frame ${i}`);
      const body = await frame.$('body');
      if (body) {
        await body.screenshot({ path: path.resolve("./screenshots/relume_h76_inner_frame.png") });
        console.log("Saved inner frame screenshot!");
        break;
      }
    }
  }

  // Also capture page with scroll at y=480
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.resolve("./screenshots/relume_h76_full_preview.png"),
    clip: { x: 230, y: 150, width: 1100, height: 750 }
  });
  console.log("Saved relume_h76_full_preview.png");

  await browser.close();
}

capturePreview().catch(console.error);
