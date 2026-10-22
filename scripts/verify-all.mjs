import { chromium } from "playwright";
import path from "path";

async function verifyAll() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const fontBypass = () => {
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
  };

  // 1. Desktop Homepage
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await desktopPage.addInitScript(fontBypass);

  console.log("Navigating to http://localhost:3000/ (Desktop)...");
  await desktopPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await desktopPage.waitForTimeout(2000);

  await desktopPage.screenshot({
    path: path.resolve("./screenshots/actual_header76_desktop.png"),
    clip: { x: 0, y: 0, width: 1440, height: 850 },
  });
  console.log("Saved actual_header76_desktop.png");

  // 2. Mobile Homepage
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await mobilePage.addInitScript(fontBypass);

  console.log("Navigating to http://localhost:3000/ (Mobile)...");
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await mobilePage.waitForTimeout(2000);

  // Capture top of mobile page showing Header 76 and floating navbar (no bottom bar!)
  await mobilePage.screenshot({
    path: path.resolve("./screenshots/actual_header76_mobile_top.png"),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log("Saved actual_header76_mobile_top.png");

  // 3. Open Slide-in Right Drawer
  const hamburger = mobilePage.locator('button[aria-label="Open Navigation Menu"]');
  await hamburger.click();
  await mobilePage.waitForTimeout(600);

  // Capture drawer sliding in from right
  await mobilePage.screenshot({
    path: path.resolve("./screenshots/actual_drawer_slide_in_right.png"),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log("Saved actual_drawer_slide_in_right.png");

  await browser.close();
}

verifyAll().catch(console.error);
