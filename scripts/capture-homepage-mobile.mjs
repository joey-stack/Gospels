import { chromium } from "playwright";
import path from "path";

async function capture() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Bypass font loading on the active page
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

  // Full page mobile screenshot
  const fullPagePath = path.resolve("./screenshots/actual_mobile_homepage_screen21.png");
  await page.screenshot({
    path: fullPagePath,
    fullPage: true,
    timeout: 30000,
  });
  console.log("Saved full mobile homepage to", fullPagePath);

  // Viewport screenshot
  const viewportPath = path.resolve("./screenshots/actual_mobile_homepage_viewport.png");
  await page.screenshot({
    path: viewportPath,
    fullPage: false,
    timeout: 30000,
  });
  console.log("Saved viewport screenshot to", viewportPath);

  await browser.close();
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
