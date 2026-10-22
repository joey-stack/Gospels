import { chromium } from "playwright";

async function getPreviewHtml() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://library.relume.io/components/navbar-14", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  // Click the Copy button
  const copyBtn = await page.$("button:has-text('Copy')");
  if (copyBtn) {
    console.log("Found Copy button!");
    await copyBtn.click();
    await page.waitForTimeout(1000);
    const clipboard = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (e) {
        return "Clipboard error: " + e.message;
      }
    });
    console.log("Clipboard content length:", clipboard.length);
    console.log("Clipboard snippet:", clipboard.substring(0, 1500));
  } else {
    console.log("No copy button found");
  }

  // Also inspect what is inside the preview container
  const previewInfo = await page.evaluate(() => {
    // Find preview container in page
    const allDivs = Array.from(document.querySelectorAll("div"));
    const previewDiv = allDivs.find(d => d.innerText && d.innerText.includes("Link One") && d.innerText.includes("Link Four"));
    return previewDiv ? previewDiv.innerHTML : "Not found";
  });
  console.log("Preview Info length:", previewInfo.length);
  if (previewInfo !== "Not found") {
    console.log("Preview Info snippet:", previewInfo.substring(0, 1500));
  }

  await browser.close();
}

getPreviewHtml().catch(console.error);
