import { chromium } from "playwright";
import path from "path";

async function zoomH76() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
  });

  await page.goto("https://library.relume.io/components/header-76", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(3000);

  // Scroll down to the preview
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(1000);

  const preview = page.locator('div[class*="preview"], iframe, div:has(> h1, > h2):has-text("Medium length hero heading")').first();
  await page.screenshot({
    path: path.resolve("./screenshots/relume_h76_zoomed.png"),
    clip: { x: 230, y: 350, width: 850, height: 650 },
  });
  console.log("Saved relume_h76_zoomed.png");

  // Also switch to React tab if available
  const reactTab = page.locator('button:has-text("React"), a:has-text("React")').first();
  if (await reactTab.isVisible()) {
    console.log("React tab found");
  }

  await browser.close();
}

zoomH76().catch(console.error);
