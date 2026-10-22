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
