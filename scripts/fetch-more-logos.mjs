import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function fetchMoreLogos() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const dir = path.resolve("./public/logos");

  // 1. RCCG logo from Commons
  try {
    await page.goto("https://commons.wikimedia.org/wiki/File:Rccg_logo.png", { waitUntil: "domcontentloaded" });
    const fullImgUrl = await page.evaluate(() => document.querySelector('.fullMedia a')?.href);
    if (fullImgUrl) {
      console.log("RCCG full image:", fullImgUrl);
      const res = await page.request.get(fullImgUrl);
      fs.writeFileSync(path.join(dir, "rccg.png"), await res.body());
      console.log("Saved rccg.png");
    }
  } catch (e) {
    console.error("RCCG error:", e.message);
  }

  // 2. Pingst Sverige logo
  try {
    await page.goto("https://www.pingst.se", { waitUntil: "domcontentloaded", timeout: 20000 });
    const logoSrc = await page.evaluate(() => {
      const img = document.querySelector('header img, .logo img, a[href="/"] img, img[alt*="Pingst"]');
      return img?.src;
    });
    console.log("Pingst logo src:", logoSrc);
    if (logoSrc) {
      const res = await page.request.get(logoSrc);
      const ext = logoSrc.endsWith('.svg') ? 'svg' : 'png';
      fs.writeFileSync(path.join(dir, `pingst.${ext}`), await res.body());
      console.log(`Saved pingst.${ext}`);
    }
  } catch (e) {
    console.error("Pingst error:", e.message);
  }

  // 3. Hillsong logo from Wikimedia
  try {
    await page.goto("https://commons.wikimedia.org/wiki/File:Hillsong_Church_logo.png", { waitUntil: "domcontentloaded" });
    const fullImgUrl = await page.evaluate(() => document.querySelector('.fullMedia a')?.href);
    if (fullImgUrl) {
      console.log("Hillsong full image:", fullImgUrl);
      const res = await page.request.get(fullImgUrl);
      fs.writeFileSync(path.join(dir, "hillsong.png"), await res.body());
      console.log("Saved hillsong.png");
    }
  } catch (e) {
    console.error("Hillsong error:", e.message);
  }

  // 4. Frälsningsarmén Swedish Red Shield (The red shield logo)
  try {
    await page.goto("https://www.fralsningsarmen.se", { waitUntil: "domcontentloaded", timeout: 20000 });
    const logoSrc = await page.evaluate(() => {
      const img = document.querySelector('header img, .logo img, img[alt*="Frälsningsarmén"]');
      return img?.src;
    });
    console.log("Frälsningsarmén logo src:", logoSrc);
    if (logoSrc) {
      const res = await page.request.get(logoSrc);
      const ext = logoSrc.endsWith('.svg') ? 'svg' : 'png';
      fs.writeFileSync(path.join(dir, `fralsningsarmen-official.${ext}`), await res.body());
      console.log(`Saved fralsningsarmen-official.${ext}`);
    }
  } catch (e) {
    console.error("Fralsningsarmen error:", e.message);
  }

  await browser.close();
  console.log("Done fetching remaining logos.");
}

fetchMoreLogos().catch(console.error);
