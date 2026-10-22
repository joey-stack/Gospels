import { chromium } from "playwright";
import path from "path";

async function searchHeader76() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });

  console.log("Navigating to https://library.relume.io/ ...");
  try {
    await page.goto("https://library.relume.io/", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    // Search for "Header 76"
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search" i]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill("Header 76");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.resolve("./screenshots/relume_search_h76.png") });
      console.log("Captured search results!");
    } else {
      console.log("Search input not found, capturing current page");
      await page.screenshot({ path: path.resolve("./screenshots/relume_home.png") });
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await browser.close();
  }
}

searchHeader76().catch(console.error);
