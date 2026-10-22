import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });

  // 1. Desktop Test
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000/prayer...");
  await page.goto("http://localhost:3000/prayer", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: "screenshots/actual_prayer_desktop.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_prayer_desktop.png");

  // 2. Mobile View
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  await mobilePage.goto("http://localhost:3000/prayer", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({
    path: "screenshots/actual_prayer_mobile.png",
    fullPage: true,
  });
  console.log("Saved screenshots/actual_prayer_mobile.png");

  // 3. Test Form Interaction & Submission
  console.log("Testing Prayer Form interaction...");
  await page.fill("#name", "Elin Lindqvist");
  await page.fill("#email", "elin.lindqvist@goteborg.se");
  await page.fill("#phone", "+46 70 882 1900");

  // Click on "Healing & Strength" and "Spiritual Renewal" chips
  const healingChip = page.getByRole("button", { name: "Healing & Strength" });
  if (await healingChip.isVisible()) {
    await healingChip.click();
  }
  const renewalChip = page.getByRole("button", { name: "Spiritual Renewal" });
  if (await renewalChip.isVisible()) {
    await renewalChip.click();
  }

  await page.fill(
    "#requestText",
    "Please pray for my mother recovering from surgery in Sahlgrenska hospital, and for peace and spiritual renewal over our family during this season."
  );

  // Take screenshot of filled form
  await page.screenshot({
    path: "screenshots/actual_prayer_form_filled.png",
  });

  // Click Submit
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);

  // Verify success confirmation card
  await page.screenshot({
    path: "screenshots/actual_prayer_form_success.png",
  });
  console.log("Saved screenshots/actual_prayer_form_success.png");

  await browser.close();
  console.log("Prayer page testing and screenshot verification complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
