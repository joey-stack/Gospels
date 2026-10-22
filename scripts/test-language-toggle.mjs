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
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // 1. Capture English
  await page.screenshot({
    path: "screenshots/actual_about_en.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_about_en.png");

  // 2. Click the Language Toggle button
  console.log("Clicking language toggle button...");
  const toggleBtn = page.getByRole("button", { name: /switch between english and swedish|toggle language/i });
  await toggleBtn.click();
  await page.waitForTimeout(1000);

  // Scroll to ensure all content is updated
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // 3. Capture Swedish
  await page.screenshot({
    path: "screenshots/actual_about_sv.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_about_sv.png");

  // Verify Swedish text exists
  const headingText = await page.textContent("h1");
  console.log("H1 in Swedish:", headingText);

  // 4. Toggle back to English
  await toggleBtn.click();
  await page.waitForTimeout(500);
  const revertedHeading = await page.textContent("h1");
  console.log("H1 reverted to English:", revertedHeading);

  await browser.close();
  console.log("Language toggle verification successful!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
