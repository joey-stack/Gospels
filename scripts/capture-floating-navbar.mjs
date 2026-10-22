import { chromium } from "playwright";
import path from "path";

async function captureFloatingNavbar() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const fontBypassScript = () => {
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

  // Mobile Page
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  await mobilePage.addInitScript(fontBypassScript);

  console.log("Navigating mobile to http://localhost:3000/ ...");
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await mobilePage.waitForTimeout(1500);

  // 1. Mobile closed screenshot
  await mobilePage.screenshot({
    path: path.resolve("./screenshots/actual_floating_navbar_mobile_closed.png"),
    clip: { x: 0, y: 0, width: 390, height: 260 },
  });
  console.log("Saved actual_floating_navbar_mobile_closed.png");

  // 2. Open menu
  const menuButton = mobilePage.locator('button[aria-label="Toggle Navigation Menu"]');
  await menuButton.click();
  await mobilePage.waitForTimeout(500);

  // 3. Mobile open screenshot
  await mobilePage.screenshot({
    path: path.resolve("./screenshots/actual_floating_navbar_mobile_open.png"),
    clip: { x: 0, y: 0, width: 390, height: 550 },
  });
  console.log("Saved actual_floating_navbar_mobile_open.png");

  await browser.close();
}

captureFloatingNavbar().catch(console.error);
