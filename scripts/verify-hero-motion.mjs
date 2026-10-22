import { chromium } from "playwright";
import path from "path";

async function verifyMotion() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Bypass font loading
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

  // Capture at t=0
  await page.screenshot({
    path: path.resolve("./screenshots/actual_hero_motion_t0.png"),
    clip: { x: 0, y: 0, width: 1440, height: 800 },
  });
  console.log("Saved actual_hero_motion_t0.png");

  // Wait 2.5 seconds for marquee movement
  await page.waitForTimeout(2500);

  // Capture at t=2.5s
  await page.screenshot({
    path: path.resolve("./screenshots/actual_hero_motion_t2.png"),
    clip: { x: 0, y: 0, width: 1440, height: 800 },
  });
  console.log("Saved actual_hero_motion_t2.png");

  await browser.close();
}

verifyMotion().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
