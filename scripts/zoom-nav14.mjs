import { chromium } from "playwright";

async function zoom() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://library.relume.io/components/navbar-14", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  // Scroll down to the preview area
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(1000);

  // Check if iframe has a src
  const iframeSrc = await page.evaluate(() => {
    const frame = document.querySelector("iframe");
    return frame ? frame.src : null;
  });
  console.log("iframe src:", iframeSrc);

  await page.screenshot({ path: "./screenshots/relume_nav14_preview_zoomed.png" });
  await browser.close();
}

zoom().catch(console.error);
