import { chromium } from "playwright";
import path from "path";

async function inspectAllMorrow() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating...");
  await page.goto("https://morrow-church.framer.website/", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await page.waitForTimeout(2000);

  // 1. Capture Hero Section Desktop
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.resolve("./screenshots/morrow_01_hero.png") });

  // 2. Find and scroll to Latest Message
  const elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h1, h2, h3, h4, span, p')).map(el => ({
      tag: el.tagName,
      text: el.innerText.trim(),
      top: el.getBoundingClientRect().top + window.scrollY,
    })).filter(x => x.text.length > 0 && x.text.length < 100);
  });

  console.log("Found headings/texts:", elements.filter(e => ['H1', 'H2', 'H3'].includes(e.tag)));

  // Scroll through page in increments to capture all sections
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log("Total height:", totalHeight);

  for (let y = 800; y < totalHeight; y += 800) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(600);
    const filename = `./screenshots/morrow_scroll_${y}.png`;
    await page.screenshot({ path: path.resolve(filename) });
  }

  // Also capture mobile hero
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.resolve("./screenshots/morrow_mobile_hero.png") });

  await browser.close();
  console.log("All screenshots captured.");
}

inspectAllMorrow().catch(console.error);
