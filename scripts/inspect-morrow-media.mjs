import { chromium } from "playwright";
import path from "path";

async function inspectMorrowMedia() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
  });

  console.log("Navigating to https://morrow-church.framer.website/ ...");
  await page.goto("https://morrow-church.framer.website/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(3000);

  // Scroll down to the Latest Message section
  const section = page.locator('text="Latest message", text="Latest Message", text="Last Sunday"').first();
  if (await section.isVisible()) {
    console.log("Found Latest message section!");
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  } else {
    // Scroll down halfway
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(1000);
  }

  // Capture desktop screenshot of this section
  await page.screenshot({
    path: path.resolve("./screenshots/morrow_media_desktop.png"),
  });
  console.log("Saved morrow_media_desktop.png");

  // Scroll a bit more and capture full details
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.resolve("./screenshots/morrow_media_desktop_lower.png"),
  });
  console.log("Saved morrow_media_desktop_lower.png");

  // Also capture on mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.resolve("./screenshots/morrow_media_mobile.png"),
  });
  console.log("Saved morrow_media_mobile.png");

  await browser.close();
}

inspectMorrowMedia().catch(console.error);
