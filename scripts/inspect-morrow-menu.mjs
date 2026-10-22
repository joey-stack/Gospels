import { chromium } from "playwright";
import path from "path";

async function inspectMorrowMenu() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });

  await page.goto("https://morrow-church.framer.website/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(2000);

  // Click hamburger
  const button = page.locator('button, [aria-label*="menu" i], [class*="menu" i]').first();
  try {
    await button.click();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.resolve("./screenshots/morrow_menu_open.png"),
    });
    console.log("Captured morrow_menu_open.png");
  } catch (e) {
    console.error("Error opening menu:", e);
  }

  await browser.close();
}

inspectMorrowMenu().catch(console.error);
