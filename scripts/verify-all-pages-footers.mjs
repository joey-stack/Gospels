import { chromium } from "playwright";

const routes = [
  { path: "/", name: "home" },
  { path: "/events", name: "events" },
  { path: "/events/holy-spirit-worship", name: "event_detail" },
  { path: "/watch", name: "watch" },
  { path: "/partners", name: "partners" },
  { path: "/give", name: "give" },
  { path: "/prayer", name: "prayer" },
];

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Checking all routes for headers and footers...");
  const results = [];

  for (const route of routes) {
    const url = `http://localhost:3000${route.path}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const counts = await page.evaluate(() => {
      const headers = document.querySelectorAll("header").length;
      const footers = document.querySelectorAll("footer").length;
      const gospelsWordmarks = Array.from(document.querySelectorAll("*")).filter(
        (el) =>
          el.children.length === 0 &&
          el.textContent?.trim() === "GOSPELS" &&
          window.getComputedStyle(el).textTransform === "uppercase"
      ).length;
      return { headers, footers, gospelsWordmarks };
    });

    results.push({ route: route.path, ...counts });

    // Capture screenshot
    await page.screenshot({
      path: `screenshots/audit_${route.name}_desktop.png`,
      fullPage: true,
    });
    console.log(`Route ${route.path}: headers=${counts.headers}, footers=${counts.footers}, wordmarks=${counts.gospelsWordmarks}`);
  }

  console.log("Audit complete:", JSON.stringify(results, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
