import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("1. Visiting /events to check 'Yet to Come' badge...");
  await page.goto("http://localhost:3000/events", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  
  const yetToComeText = await page.locator("text=Yet to Come").first().textContent();
  console.log("Found badge on /events:", yetToComeText);

  console.log("2. Visiting /events/holy-spirit-worship to test seat reservation...");
  await page.goto("http://localhost:3000/events/holy-spirit-worship", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#rsvp-name", { timeout: 10000 });

  // Fill in RSVP form
  await page.fill("#rsvp-name", "John Doe Göteborg");
  await page.fill("#rsvp-email", "john.doe@gothenburg-church.se");
  await page.selectOption("#rsvp-guests", "2");

  console.log("Submitting Save your spot form...");
  await page.click("form:has(#rsvp-name) button[type='submit']");

  // Wait for Digital Pass Modal
  console.log("Waiting for Digital Pass Modal to open...");
  await page.waitForSelector("text=Official Entry Pass", { timeout: 8000 });
  console.log("Modal appeared!");

  const passHolder = await page.locator("text=John Doe Göteborg").first().isVisible();
  console.log("Pass Holder Name displayed in modal:", passHolder);

  const qrImg = await page.locator("img[alt*='QR Code Pass']").first().isVisible();
  console.log("QR Code visible in modal:", qrImg);

  const downloadBtn = await page.locator("button:has-text('Download / Print Pass')").first().isVisible();
  console.log("Download / Print Pass button visible:", downloadBtn);

  // Extract pass code
  const passCodeElement = await page.locator("span.font-mono:has-text('#HSW26-')").first().textContent();
  const passCode = passCodeElement.replace("#", "").trim();
  console.log("Generated Ticket Pass Code:", passCode);

  // 3. Test Admin Gate Scanner with this ticket
  console.log(`3. Navigating to /admin/scan?ticket=${passCode} ...`);
  await page.goto(`http://localhost:3000/admin/scan?ticket=${passCode}`, { waitUntil: "domcontentloaded" });

  await page.waitForSelector("text=VALID PASS", { timeout: 8000 });
  console.log("Gate scanner recognized VALID PASS!");

  console.log("Clicking ADMIT ATTENDEE at gate...");
  await page.click("button:has-text('ADMIT ATTENDEE')");

  await page.waitForSelector("text=ADMISSION RECORDED", { timeout: 6000 });
  console.log("Gate admission successfully recorded!");

  // 4. Verify Admin Dashboard
  console.log("4. Visiting /admin dashboard...");
  await page.goto("http://localhost:3000/admin", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  const dashboardVisible = await page.locator("text=Entrance Gate Ready").first().isVisible();
  console.log("Admin Dashboard Gate status visible:", dashboardVisible);

  await browser.close();
  console.log("ALL TESTS COMPLETED SUCCESSFULLY!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
