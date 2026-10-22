import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amount,
      currency = "sek",
      frequency = "one-time",
      donorEmail,
      donorName,
      fund = "Gospels Gothenburg Worship & Outreach",
    } = body;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Please provide a valid donation amount greater than 0." },
        { status: 400 }
      );
    }

    const normalizedCurrency = currency.toLowerCase();
    const isRecurring = frequency === "monthly";
    const amountInCents = Math.round(parsedAmount * 100);

    const origin =
      request.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    // 1. If valid Stripe Secret Key is present and configured, invoke Stripe Checkout
    if (
      isStripeConfigured &&
      stripe &&
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes("placeholder") &&
      !process.env.STRIPE_SECRET_KEY.includes("sample")
    ) {
      const lineItemData: any = {
        price_data: {
          currency: normalizedCurrency,
          unit_amount: amountInCents,
          product_data: {
            name: `${fund} (${isRecurring ? "Monthly Partnership" : "One-Time Gift"})`,
            description: `Kingdom Giving for Gothenburg Ecumenical Mass Choir & Outreach`,
            images: [`${origin}/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png`],
          },
        },
        quantity: 1,
      };

      if (isRecurring) {
        lineItemData.price_data.recurring = {
          interval: "month",
        };
      }

      const session = await stripe.checkout.sessions.create({
        line_items: [lineItemData],
        mode: isRecurring ? "subscription" : "payment",
        customer_email: donorEmail || undefined,
        metadata: {
          donorName: donorName || "Anonymous Supporter",
          frequency,
          fund,
          platform: "Gospels Gothenburg Next.js",
        },
        success_url: `${origin}/give?status=success&session_id={CHECKOUT_SESSION_ID}&amount=${parsedAmount}&currency=${currency.toUpperCase()}&frequency=${frequency}`,
        cancel_url: `${origin}/give?status=cancelled`,
      });

      return NextResponse.json({
        url: session.url,
        sessionId: session.id,
        isLiveStripe: true,
      });
    }

    // 2. Stripe Test Mode Simulation Sandbox Fallback
    // When real keys aren't in .env yet, provide authentic test-mode response
    const mockSessionId = `cs_test_mock_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const redirectUrl = `${origin}/give?status=success&session_id=${mockSessionId}&amount=${parsedAmount}&currency=${currency.toUpperCase()}&frequency=${frequency}&simulated=true`;

    console.log("==================================================");
    console.log("[STRIPE TEST MODE CHECKOUT INITIATED]");
    console.log(`Session ID: ${mockSessionId}`);
    console.log(`Amount: ${parsedAmount} ${currency.toUpperCase()} (${frequency})`);
    console.log(`Donor: ${donorName || "Anonymous"} <${donorEmail || "no-email@stripe.test"}>`);
    console.log(`Fund: ${fund}`);
    console.log(`Target Redirect: ${redirectUrl}`);
    console.log("Status: Ready in Test Mode Sandbox");
    console.log("==================================================");

    return NextResponse.json({
      url: redirectUrl,
      sessionId: mockSessionId,
      isSimulated: true,
      message: "Stripe Test Mode simulation active. Keys can be added to .env.local anytime.",
    });
  } catch (error: any) {
    console.error("Stripe Checkout Session creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create Stripe Checkout session" },
      { status: 500 }
    );
  }
}
