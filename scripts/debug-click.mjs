import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });

  console.log("Before H1:", (await page.textContent("h1"))?.trim());

  // Click the visible SWE button
  const sweBtn = page.locator('div.hidden.lg\\:flex button:has-text("SWE")');
  console.log("SWE btn count:", await sweBtn.count());
  await sweBtn.click();
  await page.waitForTimeout(1000);

  console.log("After H1:", (await page.textContent("h1"))?.trim());

  const sweActive = await sweBtn.getAttribute("aria-pressed");
  console.log("SWE aria-pressed:", sweActive);

  await page.screenshot({ path: "screenshots/about_switched_sv.png" });
  await browser.close();
}

run().catch(console.error);
