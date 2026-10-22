"use server";

import { prisma } from "@/lib/prisma";
import {
  registerTicket,
  getTicketById,
  getAllTickets,
  checkInTicket,
  undoCheckInTicket,
  TicketPass,
} from "@/lib/rsvpStore";
import { generateTicketQRCode } from "@/lib/qr";

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: any;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action: submitRSVP
 * Validates email and event registration, creates digital ticket pass with QR code.
 */
export async function submitRSVP(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const eventId = formData.get("eventId")?.toString().trim() || "holy-spirit-worship-2026";
  const rawGuests = formData.get("guests")?.toString().trim() || "1";
  const church = formData.get("church")?.toString().trim() || "";
  const guests = parseInt(rawGuests, 10) || 1;

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
    // 1. Register in persistent ticket store
    const ticketRecord = registerTicket({
      name: name!,
      email: email!,
      guests,
      church,
      eventId,
      eventTitle: "Holy Spirit Worship 2026",
    });

    // 2. Determine request origin from incoming headers
    let origin: string | undefined;
    try {
      const { headers } = await import("next/headers");
      const headersList = await headers();
      const host = headersList.get("x-forwarded-host") || headersList.get("host");
      const proto = headersList.get("x-forwarded-proto") || "https";
      if (host) {
        origin = `${proto}://${host}`;
      }
    } catch {
      // fallback handled in qr.ts
    }

    // 3. Generate scannable QR code data URL pointing to attendee pass verification page
    const qrCodeDataUrl = await generateTicketQRCode(ticketRecord, origin);

    // 3. Persist registration to InsForge PostgreSQL Database via Prisma
    try {
      if (prisma && process.env.DATABASE_URL) {
        await prisma.rSVP.upsert({
          where: { ticketCode: ticketRecord.id },
          create: {
            ticketCode: ticketRecord.id,
            eventId: eventId || "holy-spirit-worship-2026",
            eventTitle: "Holy Spirit Worship 2026",
            name: name!,
            email: email!,
            guests,
            church: church || null,
            checkedIn: false,
          },
          update: {
            name: name!,
            email: email!,
            guests,
            church: church || null,
          },
        });
      }
    } catch (dbErr) {
      console.warn("InsForge Prisma write notice:", dbErr);
    }

    // Mock Email Dispatch
    console.log("==================================================");
    console.log("[EMAIL DISPATCH — DIGITAL PASS]");
    console.log(`To: ${email}`);
    console.log(`Subject: Your Pass: Holy Spirit Worship 2026 (#${ticketRecord.id})`);
    console.log(`Attendee: ${name} (${guests} seats)`);
    console.log(`Ticket Pass Code: ${ticketRecord.id}`);
    console.log(`Venue: Smyrna Frihamnskyrkan`);
    console.log("Status: Pass delivered with scannable gate admission code.");
    console.log("==================================================");

    return {
      success: true,
      message: "You're registered! Your official pass is ready below.",
      data: {
        ticket: ticketRecord,
        qrCodeDataUrl,
      },
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
 * Server Action: verifyTicketAction
 * Used by gate stewards / admin dashboard to look up a ticket by ID.
 */
export async function verifyTicketAction(ticketId: string): Promise<{
  success: boolean;
  ticket?: TicketPass;
  message?: string;
}> {
  if (!ticketId) {
    return { success: false, message: "No ticket code provided." };
  }
  const ticket = getTicketById(ticketId);
  if (!ticket) {
    return { success: false, message: `Ticket #${ticketId} not found in registered attendee roster.` };
  }
  return { success: true, ticket };
}

/**
 * Server Action: checkInTicketAction
 * Used at the entrance gate to admit an attendee and mark ticket checked in.
 */
export async function checkInTicketAction(ticketId: string): Promise<{
  success: boolean;
  status: "CHECKED_IN_NOW" | "ALREADY_CHECKED_IN" | "NOT_FOUND";
  message: string;
  ticket?: TicketPass;
}> {
  if (!ticketId) {
    return {
      success: false,
      status: "NOT_FOUND",
      message: "No ticket code provided.",
    };
  }
  return checkInTicket(ticketId);
}

/**
 * Server Action: undoCheckInTicketAction
 */
export async function undoCheckInTicketAction(ticketId: string): Promise<{
  success: boolean;
  ticket?: TicketPass;
}> {
  return undoCheckInTicket(ticketId);
}

/**
 * Server Action: getAllTicketsAction
 */
export async function getAllTicketsAction(): Promise<TicketPass[]> {
  return getAllTickets();
}

/**
 * Server Action: submitPrayerRequest
 * Validates intercession request, logs mock WhatsApp routing to the prayer team.
 */
export async function submitPrayerRequest(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name")?.toString().trim() || "Anonymous Prayer Seeker";
  const emailInput = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || "";
  const categories = formData.getAll("category").map((c) => c.toString()).filter(Boolean);
  const isConfidential = formData.get("confidential") === "true" || formData.get("confidential") === "on";
  const rawRequestText = formData.get("requestText")?.toString().trim() || "";

  const errors: Record<string, string> = {};

  if (!rawRequestText || rawRequestText.length < 5) {
    errors.requestText = "Please share a brief prayer request (at least 5 characters).";
  }

  if (emailInput && !EMAIL_REGEX.test(emailInput)) {
    errors.email = "Please enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const email = emailInput && EMAIL_REGEX.test(emailInput) ? emailInput : "intercession@gospelsgoteborg.se";

  // Build composite payload for database record
  const categoryHeader = categories.length > 0 ? `[Focus: ${categories.join(", ")}]` : "";
  const phoneHeader = phone ? `[Phone: ${phone}]` : "";
  const confidentialHeader = isConfidential ? `[Confidential: Strictly Pastoral]` : "";
  const metaHeader = [categoryHeader, phoneHeader, confidentialHeader].filter(Boolean).join(" ");
  const fullRequestText = metaHeader ? `${metaHeader}\n\n${rawRequestText}` : rawRequestText;

  try {
    let prayerRecord;
    try {
      if (prisma && process.env.DATABASE_URL) {
        prayerRecord = await prisma.prayerRequest.create({
          data: {
            name,
            email,
            requestText: fullRequestText,
            status: "NEW",
          },
        });
      } else {
        throw new Error("Database not connected");
      }
    } catch (dbError) {
      console.warn("Database connection unavailable, using in-memory mock prayer record:", dbError);
      prayerRecord = {
        id: `mock-prayer-${Date.now()}`,
        name,
        email,
        phone,
        categories,
        isConfidential,
        requestText: fullRequestText,
        status: "NEW",
        createdAt: new Date(),
      };
    }

    // Mock WhatsApp Routing to Intercession Team
    console.log("==================================================");
    console.log("[WHATSAPP INTERCESSION ROUTING — MOCK]");
    console.log("To: +46 31 GOSPELS PRAYER TEAM (Gothenburg)");
    console.log(`From: ${name} <${email}>`);
    if (phone) console.log(`Phone: ${phone}`);
    if (categories.length > 0) console.log(`Categories: ${categories.join(", ")}`);
    console.log(`Confidential: ${isConfidential ? "YES (Pastoral Only)" : "NO (Shared with Intercessory Choir)"}`);
    console.log(`Prayer Burden: "${rawRequestText}"`);
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


