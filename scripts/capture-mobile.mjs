import { chromium, devices } from "playwright";
import path from "path";

async function captureMobile() {
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

  console.log("Navigating to http://localhost:3000/events/holy-spirit-worship on mobile...");
  await page.goto("http://localhost:3000/events/holy-spirit-worship", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(1000);

  // Trigger all whileInView animations by scrolling down in steps
  const scrollSteps = 10;
  for (let i = 1; i <= scrollSteps; i++) {
    await page.evaluate((step) => {
      window.scrollTo(0, (document.body.scrollHeight / 10) * step);
    }, i);
    await page.waitForTimeout(150);
  }

  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

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

  const screenshotPath = path.resolve("./screenshots/actual_event_detail_mobile.png");
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    timeout: 30000,
  });

  console.log("Saved mobile screenshot to", screenshotPath);
  await browser.close();
}

captureMobile().catch((err) => {
  console.error("Mobile capture failed:", err);
  process.exit(1);
});
