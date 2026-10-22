import QRCode from "qrcode";

export interface TicketQRInput {
  id: string;
  name?: string;
  email?: string;
  guests?: number;
  church?: string;
  [key: string]: any;
}

export async function generateTicketQRCode(
  ticketOrId: string | TicketQRInput,
  origin?: string
): Promise<string> {
  try {
    const ticketId = typeof ticketOrId === "string" ? ticketOrId : ticketOrId.id;

    // 1. Determine base URL dynamically (current origin or env variable)
    let baseUrl = origin ? origin.replace(/\/$/, "") : "";
    
    if (!baseUrl && typeof window !== "undefined") {
      baseUrl = window.location.origin;
    }
    
    if (!baseUrl && process.env.NEXT_PUBLIC_APP_URL) {
      baseUrl = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
    }
    
    if (!baseUrl && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
    }

    if (!baseUrl && process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
    }

    if (!baseUrl) {
      baseUrl = "https://gospels-joeladawah2-gmailcoms-projects.vercel.app";
    }

    // Build URL with query params so any phone camera scanning the pass can verify
    // the attendee identity immediately, even if serverless state was cold-started.
    const params = new URLSearchParams();
    if (typeof ticketOrId !== "string") {
      if (ticketOrId.name) params.set("name", ticketOrId.name);
      if (ticketOrId.email) params.set("email", ticketOrId.email);
      if (ticketOrId.guests) params.set("guests", String(ticketOrId.guests));
      if (ticketOrId.church) params.set("church", ticketOrId.church);
    }

    const queryStr = params.toString();
    const verificationUrl = `${baseUrl}/pass/${encodeURIComponent(ticketId)}${queryStr ? `?${queryStr}` : ""}`;
    
    // Generate high resolution scannable QR code
    const dataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 440,
      margin: 1,
      color: {
        dark: "#0F172A", // Deep slate
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });

    return dataUrl;
  } catch (err) {
    console.error("Failed to generate QR Code data URL:", err);
    return "";
  }
}
