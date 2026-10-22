import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
}

async function verifyScreens() {
  console.log("Launching Chromium...");
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const outputDir = path.resolve("./screenshots");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Homepage Screenshot
  console.log("Capturing Homepage http://localhost:3000 ...");
  const page1 = await context.newPage();
  await page1.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page1.waitForTimeout(1500);
  await autoScroll(page1);
  const homeScreenshot = path.join(outputDir, "actual_homepage.png");
  await page1.screenshot({ path: homeScreenshot, fullPage: true, animations: "disabled", timeout: 60000 });
  console.log("Saved Homepage screenshot to:", homeScreenshot);
  await page1.close();

  // 2. Event Detail Page Screenshot
  console.log("Capturing Event Detail http://localhost:3000/events/holy-spirit-worship ...");
  const page2 = await context.newPage();
  await page2.goto("http://localhost:3000/events/holy-spirit-worship", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page2.waitForTimeout(1500);
  await autoScroll(page2);
  const eventScreenshot = path.join(outputDir, "actual_event_detail.png");
  await page2.screenshot({ path: eventScreenshot, fullPage: true, animations: "disabled", timeout: 60000 });
  console.log("Saved Event Detail screenshot to:", eventScreenshot);
  await page2.close();

  await browser.close();
  console.log("Screen verification capture complete!");
}

verifyScreens().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
