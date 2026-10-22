import { chromium } from "playwright";
import path from "path";

async function fetchHeader76() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });

  console.log("Navigating to https://library.relume.io/components/header-76 ...");
  try {
    await page.goto("https://library.relume.io/components/header-76", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(4000);

    // Screenshot page
    const screenshotPath = path.resolve("./screenshots/relume_header76.png");
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log("Saved relume_header76.png");

    // Also look for iframe or preview container
    const iframes = page.frames();
    console.log(`Found ${iframes.length} frames`);

    // Let's find preview element or take a zoomed screenshot of the component preview
    const previewLocator = page.locator('div[class*="preview"], [class*="component-preview"], iframe').first();
    if (await previewLocator.isVisible()) {
      await previewLocator.screenshot({
        path: path.resolve("./screenshots/relume_header76_preview.png"),
      });
      console.log("Saved relume_header76_preview.png");
    }
  } catch (err) {
    console.error("Error fetching Header 76:", err);
  } finally {
    await browser.close();
  }
}

fetchHeader76().catch(console.error);
