import { chromium } from 'playwright';

async function captureMorrowFull() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 }
  });
  const page = await context.newPage();

  console.log('Navigating to Morrow Church...');
  await page.goto('https://morrow-church.framer.website/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Capture Hero section desktop
  await page.screenshot({ path: 'screenshots/morrow_hero_desktop.png', clip: { x: 0, y: 0, width: 1440, height: 950 } });
  console.log('Saved morrow_hero_desktop.png');

  // Extract Hero details
  const heroData = await page.evaluate(() => {
    const heroEl = document.querySelector('header, section, main > div');
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText,
      allHeadings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({ tag: h.tagName, text: h.innerText.trim() })),
      buttons: Array.from(document.querySelectorAll('a, button')).slice(0, 15).map(b => b.innerText.trim())
    };
  });
  console.log('Hero Data:', JSON.stringify(heroData, null, 2));

  // Switch to mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/morrow_hero_mobile.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
  console.log('Saved morrow_hero_mobile.png');

  await browser.close();
}

captureMorrowFull().catch(console.error);
