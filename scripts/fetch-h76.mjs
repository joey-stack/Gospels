import { chromium } from "playwright";
import path from "path";

async function fetchH76() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to https://library.relume.io/components/header-76 ...");
  try {
    const res = await page.goto("https://library.relume.io/components/header-76", {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    console.log("Status:", res?.status());
    await page.waitForTimeout(3000);
    const screenshotPath = path.resolve("./screenshots/relume_h76.png");
    await page.screenshot({ path: screenshotPath });
    console.log("Saved screenshot to", screenshotPath);
  } catch (err) {
    console.log("Failed direct nav, trying search on library.relume.io...");
    await page.goto("https://library.relume.io/?search=Header+76", {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    await page.waitForTimeout(3000);
    const screenshotPath = path.resolve("./screenshots/relume_h76_search.png");
    await page.screenshot({ path: screenshotPath });
    console.log("Saved search screenshot to", screenshotPath);
  }

  await browser.close();
}

fetchH76().catch((err) => {
  console.error("Fetch failed:", err);
  process.exit(1);
});
