import { chromium } from "playwright";
import path from "path";

async function capture() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const bypassFont = async (p) => {
    await p.evaluate(() => {
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
  };

  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);
  await bypassFont(page);

  // 1. Desktop Navbar default
  await page.screenshot({
    path: path.resolve("./screenshots/navbar14_desktop.png"),
    clip: { x: 0, y: 0, width: 1440, height: 260 },
  });
  console.log("Captured navbar14_desktop.png");

  // 2. Desktop with dropdown open
  // Click on Ministries button
  const ministriesButton = page.locator('button:has-text("Ministries")');
  await ministriesButton.click();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.resolve("./screenshots/navbar14_dropdown.png"),
    clip: { x: 0, y: 0, width: 1440, height: 420 },
  });
  console.log("Captured navbar14_dropdown.png");

  // 3. Mobile viewport & drawer
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await mobilePage.waitForTimeout(1500);
  await bypassFont(mobilePage);

  // Open mobile menu
  const menuToggle = mobilePage.locator('button[aria-label="Toggle Navigation Menu"]');
  await menuToggle.click();
  await mobilePage.waitForTimeout(500);

  // Expand Ministries accordion
  const mobileAccordion = mobilePage.locator('button.w-full:has-text("Ministries")');
  await mobileAccordion.click();
  await mobilePage.waitForTimeout(500);

  await mobilePage.screenshot({
    path: path.resolve("./screenshots/navbar14_mobile_drawer.png"),
    clip: { x: 0, y: 0, width: 390, height: 600 },
  });
  console.log("Captured navbar14_mobile_drawer.png");

  await browser.close();
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
