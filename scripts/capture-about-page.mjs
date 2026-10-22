import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });

  // 1. Desktop About Page
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000/about...");
  await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  await page.screenshot({
    path: "screenshots/actual_about_desktop.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_about_desktop.png");

  // 2. Mobile About Page
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  await mobilePage.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(500);

  await mobilePage.screenshot({
    path: "screenshots/actual_about_mobile.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_about_mobile.png");

  // 3. Test Navbar & Ministries Dropdown Hover
  console.log("Testing Navbar & Ministries dropdown...");
  const ministriesBtn = page.getByRole("button", { name: /ministries/i });
  await ministriesBtn.hover();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: "screenshots/actual_navbar_about_and_dropdown.png",
  });
  console.log("Saved screenshots/actual_navbar_about_and_dropdown.png");

  await browser.close();
  console.log("About page testing complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
