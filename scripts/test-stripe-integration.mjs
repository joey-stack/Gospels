import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1248\\chrome-win64\\chrome.exe",
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log("Navigating to http://localhost:3000/give...");
  await page.goto("http://localhost:3000/give", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Capture Give page with Stripe Hero CTA
  await page.screenshot({
    path: "screenshots/give_page_stripe_cta.png",
    clip: { x: 0, y: 0, width: 1440, height: 600 },
  });
  console.log("Saved screenshots/give_page_stripe_cta.png");

  // 2. Click "Give with Card (Stripe)" button in Hero
  console.log("Clicking 'Give with Card (Stripe)' button...");
  const stripeHeroBtn = page.getByRole("button", { name: /Give with Card \(Stripe\)/i }).first();
  await stripeHeroBtn.click();
  await page.waitForTimeout(600);

  // 3. Capture Stripe modal initial state
  await page.screenshot({
    path: "screenshots/stripe_modal_opened.png",
  });
  console.log("Saved screenshots/stripe_modal_opened.png");

  // 4. Click "Autofill Test" button
  console.log("Clicking Autofill Test Card...");
  const autofillBtn = page.getByRole("button", { name: /Autofill Test/i });
  await autofillBtn.click();
  await page.waitForTimeout(400);

  await page.screenshot({
    path: "screenshots/stripe_modal_autofilled.png",
  });
  console.log("Saved screenshots/stripe_modal_autofilled.png");

  // 5. Submit the test payment
  console.log("Submitting test payment...");
  const submitBtn = page.getByRole("button", { name: /Process 250 SEK/i });
  await submitBtn.click();
  await page.waitForTimeout(1600);

  // 6. Capture Receipt state
  await page.screenshot({
    path: "screenshots/stripe_modal_success_receipt.png",
  });
  console.log("Saved screenshots/stripe_modal_success_receipt.png");

  // 7. Close modal
  const doneBtn = page.getByRole("button", { name: /Done/i });
  if (await doneBtn.count() > 0) {
    await doneBtn.click();
    await page.waitForTimeout(500);
  }

  // 8. Test Card 1 in "Ways to Give"
  console.log("Testing Ways to Give Card 1 Stripe button...");
  const card1StripeBtn = page.locator('button:has-text("Card via Stripe")').first();
  await card1StripeBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "screenshots/ways_to_give_stripe_btn.png",
  });
  console.log("Saved screenshots/ways_to_give_stripe_btn.png");

  await browser.close();
  console.log("Stripe test mode verification completed successfully!");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
