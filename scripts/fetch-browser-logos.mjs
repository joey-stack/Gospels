import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function fetchLogosWithBrowser() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const dir = path.resolve("./public/logos");

  // 1. Salvation Army SVG
  try {
    console.log("Navigating to Salvation Army Wikipedia...");
    await page.goto("https://commons.wikimedia.org/wiki/File:The_Salvation_Army_Logo.svg", { waitUntil: "domcontentloaded" });
    const fullImgUrl = await page.evaluate(() => document.querySelector('.fullMedia a')?.href);
    if (fullImgUrl) {
      console.log("Fetching SA logo from:", fullImgUrl);
      const res = await page.request.get(fullImgUrl);
      fs.writeFileSync(path.join(dir, "salvation-army.svg"), await res.body());
      console.log("Saved salvation-army.svg");
    }
  } catch (e) {
    console.error("SA error:", e.message);
  }

  // 2. Svenska kyrkan (Church of Sweden)
  try {
    console.log("Navigating to Svenska kyrkan logo...");
    await page.goto("https://commons.wikimedia.org/wiki/File:Church_of_Sweden_logo.svg", { waitUntil: "domcontentloaded" });
    const fullImgUrl = await page.evaluate(() => document.querySelector('.fullMedia a')?.href);
    if (fullImgUrl) {
      console.log("Fetching Svenska kyrkan logo from:", fullImgUrl);
      const res = await page.request.get(fullImgUrl);
      fs.writeFileSync(path.join(dir, "svenska-kyrkan.svg"), await res.body());
      console.log("Saved svenska-kyrkan.svg");
    }
  } catch (e) {
    console.error("Svenska kyrkan error:", e.message);
  }

  // 3. RCCG Logo
  try {
    console.log("Navigating to RCCG logo...");
    await page.goto("https://en.wikipedia.org/wiki/File:The_Redeemed_Christian_Church_of_God_logo.svg", { waitUntil: "domcontentloaded" });
    const fullImgUrl = await page.evaluate(() => document.querySelector('.fullMedia a')?.href);
    if (fullImgUrl) {
      console.log("Fetching RCCG logo from:", fullImgUrl);
      const res = await page.request.get(fullImgUrl);
      fs.writeFileSync(path.join(dir, "rccg.svg"), await res.body());
      console.log("Saved rccg.svg");
    }
  } catch (e) {
    console.error("RCCG error:", e.message);
  }

  // 4. Frälsningsarmén Swedish Shield
  try {
    console.log("Navigating to Frälsningsarmén Wikipedia...");
    await page.goto("https://sv.wikipedia.org/wiki/Fr%C3%A4lsningsarm%C3%A9n", { waitUntil: "domcontentloaded" });
    const fullImgUrl = await page.evaluate(() => document.querySelector('.infobox img')?.src);
    if (fullImgUrl) {
      console.log("Fetching Frälsningsarmén shield from:", fullImgUrl);
      const res = await page.request.get(fullImgUrl);
      fs.writeFileSync(path.join(dir, "fralsningsarmen.png"), await res.body());
      console.log("Saved fralsningsarmen.png");
    }
  } catch (e) {
    console.error("Frälsningsarmén error:", e.message);
  }

  await browser.close();
  console.log("Finished browser logo extraction.");
}

fetchLogosWithBrowser().catch(console.error);
