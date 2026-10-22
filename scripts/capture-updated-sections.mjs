import { chromium } from "playwright";
import path from "path";

async function captureUpdatedSections() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // 1. Desktop
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });

  console.log("Navigating desktop to http://localhost:3000 ...");
  await desktopPage.goto("http://localhost:3000", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await desktopPage.waitForTimeout(2500);

  // Capture Hero + Floating Banner
  await desktopPage.screenshot({
    path: path.resolve("./screenshots/updated_hero_desktop.png"),
    clip: { x: 0, y: 0, width: 1440, height: 950 },
  });
  console.log("Saved updated_hero_desktop.png");

  // Scroll to Media Section
  const mediaEl = desktopPage.locator("#watch");
  if (await mediaEl.isVisible()) {
    await mediaEl.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({
      path: path.resolve("./screenshots/updated_media_desktop.png"),
    });
    console.log("Saved updated_media_desktop.png");
  }

  // 2. Mobile
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
  });

  console.log("Navigating mobile to http://localhost:3000 ...");
  await mobilePage.goto("http://localhost:3000", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await mobilePage.waitForTimeout(2500);

  // Mobile Hero + Floating Card
  await mobilePage.screenshot({
    path: path.resolve("./screenshots/updated_hero_mobile.png"),
    clip: { x: 0, y: 0, width: 390, height: 800 },
  });
  console.log("Saved updated_hero_mobile.png");

  // Mobile Media Section
  const mobileMediaEl = mobilePage.locator("#watch");
  if (await mobileMediaEl.isVisible()) {
    await mobileMediaEl.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await mobileMediaEl.screenshot({
      path: path.resolve("./screenshots/updated_media_mobile.png"),
    });
    console.log("Saved updated_media_mobile.png");
  }

  await browser.close();
}

captureUpdatedSections().catch(console.error);
