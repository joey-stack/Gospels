import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000/about...");
  await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Capture Header & English state
  await page.screenshot({
    path: "screenshots/header_desktop_en.png",
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });
  console.log("Saved screenshots/header_desktop_en.png");

  const h1En = await page.textContent("h1");
  console.log("English H1:", h1En?.trim());

  // 2. Click 'SWE' button in LanguageToggle
  console.log("Clicking SWE button...");
  const sweBtn = page.getByRole("button", { name: "SWE" }).first();
  await sweBtn.click();
  await page.waitForTimeout(800);

  // 3. Capture Header & Swedish state
  await page.screenshot({
    path: "screenshots/header_desktop_sv.png",
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });
  console.log("Saved screenshots/header_desktop_sv.png");

  const h1Sv = await page.textContent("h1");
  console.log("Swedish H1:", h1Sv?.trim());

  // 4. Capture full page in Swedish
  await page.screenshot({
    path: "screenshots/actual_about_sv.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_about_sv.png");

  // 5. Toggle back to English
  console.log("Clicking ENG button...");
  const engBtn = page.getByRole("button", { name: "ENG" }).first();
  await engBtn.click();
  await page.waitForTimeout(800);

  const h1Reverted = await page.textContent("h1");
  console.log("Reverted English H1:", h1Reverted?.trim());

  await page.screenshot({
    path: "screenshots/actual_about_en.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_about_en.png");

  // 6. Test Mobile Viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: "screenshots/header_mobile_en.png",
    clip: { x: 0, y: 0, width: 390, height: 100 },
  });
  console.log("Saved screenshots/header_mobile_en.png");

  // Click SWE on mobile
  const mobileSweBtn = page.getByRole("button", { name: "SWE" }).first();
  await mobileSweBtn.click();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: "screenshots/header_mobile_sv.png",
    clip: { x: 0, y: 0, width: 390, height: 100 },
  });
  console.log("Saved screenshots/header_mobile_sv.png");

  await browser.close();
  console.log("Verification finished successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
