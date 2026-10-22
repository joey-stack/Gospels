"use server";

import { prisma } from "@/lib/prisma";

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: any;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action: submitRSVP
 * Validates email and event registration, logs mock confirmation email.
 */
export async function submitRSVP(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const eventId = formData.get("eventId")?.toString().trim() || "holy-spirit-worship-event";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please provide your full name (at least 2 characters).";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    let rsvpRecord;
    try {
      rsvpRecord = await prisma.rSVP.create({
        data: {
          eventId,
          name: name!,
          email: email!,
        },
      });
    } catch (dbError) {
      console.warn("Database connection unavailable, using in-memory mock RSVP record:", dbError);
      rsvpRecord = {
        id: `mock-rsvp-${Date.now()}`,
        eventId,
        name,
        email,
        createdAt: new Date(),
      };
    }

    // Mock Email Dispatch
    console.log("==================================================");
    console.log("[EMAIL DISPATCH — MOCK]");
    console.log(`To: ${email}`);
    console.log(`Subject: Confirmation: Gospels Gothenburg RSVP Pass`);
    console.log(`Attendee: ${name}`);
    console.log(`Event ID: ${eventId}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log("Status: Delivered to virtual inbox.");
    console.log("==================================================");

    return {
      success: true,
      message: "You're registered! Check your email for your digital access pass.",
      data: rsvpRecord,
    };
  } catch (err: any) {
    console.error("submitRSVP Error:", err);
    return {
      success: false,
      message: "Unable to process registration at this moment. Please try again.",
    };
  }
}

/**
 * Server Action: submitPrayerRequest
 * Validates intercession request, logs mock WhatsApp routing to the prayer team.
 */
export async function submitPrayerRequest(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name")?.toString().trim() || "Anonymous Prayer Seeker";
  const emailInput = formData.get("email")?.toString().trim();
  const email = emailInput && EMAIL_REGEX.test(emailInput) ? emailInput : "intercession@gospelsgoteborg.se";
  const requestText = formData.get("requestText")?.toString().trim();

  const errors: Record<string, string> = {};

  if (!requestText || requestText.length < 5) {
    errors.requestText = "Please share a brief prayer request.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    let prayerRecord;
    try {
      prayerRecord = await prisma.prayerRequest.create({
        data: {
          name,
          email: email!,
          requestText: requestText!,
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.warn("Database connection unavailable, using in-memory mock prayer record:", dbError);
      prayerRecord = {
        id: `mock-prayer-${Date.now()}`,
        name,
        email,
        requestText,
        status: "NEW",
        createdAt: new Date(),
      };
    }

    // Mock WhatsApp Routing to Intercession Team
    console.log("==================================================");
    console.log("[WHATSAPP INTERCESSION ROUTING — MOCK]");
    console.log("To: +46 31 GOSPELS PRAYER TEAM (Gothenburg)");
    console.log(`From: ${name} <${email}>`);
    console.log(`Prayer Burden: "${requestText}"`);
    console.log(`Priority: Active Intercession`);
    console.log("==================================================");

    return {
      success: true,
      message: "Your prayer request has been received. Our intercession team is standing in faith with you.",
      data: prayerRecord,
    };
  } catch (err: any) {
    console.error("submitPrayerRequest Error:", err);
    return {
      success: false,
      message: "An error occurred while submitting your prayer request. Please try again.",
    };
  }
}

/**
 * Server Action: submitPartnerChurchRegistration
 * Validates partner church covenant registration and logs ministerial notification.
 */
export async function submitPartnerChurchRegistration(formData: FormData): Promise<ActionResult> {
  const churchName = formData.get("churchName")?.toString().trim();
  const tradition = formData.get("tradition")?.toString().trim() || "Independent / Ecumenical";
  const contactName = formData.get("contactName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || "";
  const district = formData.get("district")?.toString().trim() || "Gothenburg";
  const collaborationRole = formData.get("collaborationRole")?.toString().trim() || "Choir & Music Collaboration";
  const message = formData.get("message")?.toString().trim() || "";
  const covenantAgreed = formData.get("covenantAgreed") === "true" || formData.get("covenantAgreed") === "on";

  const errors: Record<string, string> = {};

  if (!churchName || churchName.length < 2) {
    errors.churchName = "Please enter your congregation / church name.";
  }

  if (!contactName || contactName.length < 2) {
    errors.contactName = "Please provide the lead pastor or contact minister name.";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid ministerial contact email address.";
  }

  if (!covenantAgreed) {
    errors.covenantAgreed = "Please confirm agreement to the Gothenburg Ecumenical Covenant.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const registrationRecord = {
      id: `covenant-reg-${Date.now()}`,
      churchName,
      tradition,
      contactName,
      email,
      phone,
      district,
      collaborationRole,
      message,
      covenantAgreed: true,
      createdAt: new Date().toISOString(),
    };

    // Ministerial Dispatch Log
    console.log("==================================================");
    console.log("[PARTNER CHURCH COVENANT REGISTRATION — MOCK]");
    console.log(`Church: ${churchName} (${tradition})`);
    console.log(`District: ${district}`);
    console.log(`Lead Minister: ${contactName} <${email}>`);
    console.log(`Phone: ${phone}`);
    console.log(`Role: ${collaborationRole}`);
    console.log("Status: Registered in Gothenburg Ecumenical Covenant Directory");
    console.log("==================================================");

    return {
      success: true,
      message: `Tack! ${churchName} has been received into the GOSPELS Gothenburg Partner Network. A ministry covenant packet has been dispatched to ${email}.`,
      data: registrationRecord,
    };
  } catch (err: any) {
    console.error("submitPartnerChurchRegistration Error:", err);
    return {
      success: false,
      message: "An error occurred while processing your partnership registration. Please try again.",
    };
  }
}

/**
 * Server Action: submitKingdomPartnerSubscription
 * Handles monthly sustaining partner registration (150 kr, 350 kr, 750 kr, or custom).
 */
export async function submitKingdomPartnerSubscription(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const tier = formData.get("tier")?.toString().trim() || "150";
  const tierName = formData.get("tierName")?.toString().trim() || "Supporter";
  const paymentMethod = formData.get("paymentMethod")?.toString().trim() || "autogiro";
  const personnummer = formData.get("personnummer")?.toString().trim() || "";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please provide your full name.";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const partnerSubscription = {
      id: `partner-sub-${Date.now()}`,
      name,
      email,
      tierAmount: tier,
      tierName,
      paymentMethod,
      personnummer: personnummer || undefined,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    console.log("==================================================");
    console.log("[KINGDOM PARTNER MONTHLY SUBSCRIPTION — MOCK]");
    console.log(`Partner: ${name} <${email}>`);
    console.log(`Tier: ${tierName} (${tier} kr/mo)`);
    console.log(`Payment Method: ${paymentMethod}`);
    if (personnummer) console.log(`Tax Deduction SSN: ${personnummer}`);
    console.log("Status: Registered. Welcome packet dispatched.");
    console.log("==================================================");

    return {
      success: true,
      message: `Tack så mycket, ${name}! Your monthly partnership as a ${tierName} (${tier} kr/mo) has been initialized. A confirmation and direct management link have been sent to ${email}.`,
      data: partnerSubscription,
    };
  } catch (err: any) {
    console.error("submitKingdomPartnerSubscription Error:", err);
    return {
      success: false,
      message: "Unable to process monthly partnership at this time. Please try again.",
    };
  }
}

/**
 * Server Action: submitDonationIntent
 * Handles one-time or custom card / express digital donations.
 */
export async function submitDonationIntent(formData: FormData): Promise<ActionResult> {
  const amount = formData.get("amount")?.toString().trim() || "250";
  const currency = formData.get("currency")?.toString().trim() || "SEK";
  const frequency = formData.get("frequency")?.toString().trim() || "one-time";
  const method = formData.get("method")?.toString().trim() || "card";
  const donorEmail = formData.get("email")?.toString().trim() || "";

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return {
      success: false,
      errors: { amount: "Please provide a valid donation amount greater than 0." },
    };
  }

  const transactionRef = `GSP-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

  console.log("==================================================");
  console.log("[KINGDOM GIVING TRANSACTION INTENT — MOCK]");
  console.log(`Reference: ${transactionRef}`);
  console.log(`Amount: ${amount} ${currency} (${frequency})`);
  console.log(`Method: ${method}`);
  if (donorEmail) console.log(`Receipt Email: ${donorEmail}`);
  console.log("Status: Ready for gateway processing.");
  console.log("==================================================");

  return {
    success: true,
    message: `Thank you for your generous gift of ${amount} ${currency}! Reference: ${transactionRef}.`,
    data: {
      transactionRef,
      amount,
      currency,
      frequency,
      method,
    },
  };
}


