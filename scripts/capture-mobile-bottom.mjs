import { chromium, devices } from "playwright";
import path from "path";

async function captureBottom() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const iPhone = devices["iPhone 14"];
  const context = await browser.newContext({
    ...iPhone,
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3000/events/holy-spirit-worship", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(1000);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

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
    } catch (e) {}
  });

  const screenshotPath = path.resolve("./screenshots/actual_mobile_bottom.png");
  await page.screenshot({
    path: screenshotPath,
    fullPage: false, // captures the current viewport at bottom
    timeout: 15000,
  });

  console.log("Saved bottom screenshot to", screenshotPath);
  await browser.close();
}

captureBottom().catch((err) => {
  console.error("Bottom capture failed:", err);
  process.exit(1);
});
