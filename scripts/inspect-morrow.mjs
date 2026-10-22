import { chromium } from "playwright";
import path from "path";

async function inspectMorrow() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to https://morrow-church.framer.website/ ...");
  try {
    await page.goto("https://morrow-church.framer.website/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: path.resolve("./screenshots/morrow_navbar_desktop.png"),
      clip: { x: 0, y: 0, width: 1440, height: 300 },
    });
    console.log("Captured morrow_navbar_desktop.png");

    // Also capture mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.resolve("./screenshots/morrow_navbar_mobile.png"),
      clip: { x: 0, y: 0, width: 390, height: 300 },
    });
    console.log("Captured morrow_navbar_mobile.png");

  } catch (err) {
    console.error("Navigation error:", err);
  } finally {
    await browser.close();
  }
}

inspectMorrow().catch(console.error);
