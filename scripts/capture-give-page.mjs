import { chromium } from "playwright";
import path from "path";

const executablePath = "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe";

async function main() {
  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  // 1. Desktop Full-Page Screenshot
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktopContext.newPage();

  console.log("Navigating to http://localhost:3000/give ...");
  const res = await page.goto("http://localhost:3000/give", { waitUntil: "networkidle" });
  console.log("HTTP status:", res.status());

  await page.waitForTimeout(1000);

  const desktopPath = path.resolve("screenshots/actual_give_desktop.png");
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log("Saved desktop screenshot to", desktopPath);

  // 2. Open Swish Giving Modal & capture dialog
  console.log("Clicking 'Give once' to capture modal...");
  const swishBtn = page.locator("button:has-text('Give once')").first();
  await swishBtn.click();
  await page.waitForTimeout(600);

  const modalPath = path.resolve("screenshots/actual_give_modal.png");
  await page.screenshot({ path: modalPath, fullPage: false });
  console.log("Saved modal screenshot to", modalPath);

  // 3. Mobile Viewport Screenshot
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000/give", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  const mobilePath = path.resolve("screenshots/actual_give_mobile.png");
  await mobilePage.screenshot({ path: mobilePath, fullPage: true });
  console.log("Saved mobile screenshot to", mobilePath);

  await browser.close();
  console.log("Give page verification capture complete!");
}

main().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
