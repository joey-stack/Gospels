import { chromium } from "playwright";
import path from "path";

async function capture() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 3500 },
  });

  console.log("Navigating to http://localhost:3000/events/holy-spirit-worship ...");
  await page.goto("http://localhost:3000/events/holy-spirit-worship", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(2000);

  // Bypass font waiting
  await page.evaluate(() => {
    try {
      Object.defineProperty(document, 'fonts', {
        get() {
          return {
            ready: Promise.resolve(),
            status: 'loaded',
            check: () => true,
            load: () => Promise.resolve([]),
            values: () => [][Symbol.iterator](),
            forEach: () => {},
          };
        },
        configurable: true,
      });
    } catch (e) {
      console.error(e);
    }
  });

  const screenshotPath = path.resolve("./screenshots/actual_event_detail.png");
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    timeout: 30000,
  });

  console.log("Saved screenshot to", screenshotPath);
  await browser.close();
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
