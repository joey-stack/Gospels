import { chromium } from "playwright";
import path from "path";

async function capture() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });

  console.log("Navigating to http://localhost:3000/partners ...");
  const response = await page.goto("http://localhost:3000/partners", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  console.log("HTTP status:", response.status());
  await page.waitForTimeout(1500);

  // Bypass font waiting
  await page.evaluate(() => {
    try {
      Object.defineProperty(document, 'fonts', {
        get() {
          return {
            ready: Promise.resolve(),
            status: 'loaded',
            check: () => true,
            load: () => Promise.resolve([]),
            values: () => [][Symbol.iterator](),
            forEach: () => {},
          };
        },
        configurable: true,
      });
    } catch (e) {
      console.error(e);
    }
  });

  // Scroll smoothly down the page to trigger all in-view animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });

  await page.waitForTimeout(1000);

  const desktopScreenshot = path.resolve("./screenshots/actual_partners_desktop.png");
  await page.screenshot({
    path: desktopScreenshot,
    fullPage: true,
    timeout: 30000,
  });
  console.log("Saved desktop screenshot to", desktopScreenshot);

  // Open the registration modal to capture its open state
  const becomePartnerBtn = await page.$('button:has-text("Become a Partner Church")');
  if (becomePartnerBtn) {
    console.log("Clicking 'Become a Partner Church' to capture modal...");
    await becomePartnerBtn.click();
    await page.waitForTimeout(1000);
    const modalScreenshot = path.resolve("./screenshots/actual_partners_modal.png");
    await page.screenshot({
      path: modalScreenshot,
      timeout: 10000,
    });
    console.log("Saved modal screenshot to", modalScreenshot);
  }

  // Mobile viewport test with auto-scroll
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  await mobilePage.goto("http://localhost:3000/partners", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await mobilePage.waitForTimeout(1500);

  await mobilePage.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });

  await mobilePage.waitForTimeout(1000);

  const mobileScreenshot = path.resolve("./screenshots/actual_partners_mobile.png");
  await mobilePage.screenshot({
    path: mobileScreenshot,
    fullPage: true,
    timeout: 30000,
  });
  console.log("Saved mobile screenshot to", mobileScreenshot);

  await browser.close();
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
