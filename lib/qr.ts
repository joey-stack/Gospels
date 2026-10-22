import QRCode from "qrcode";

export async function generateTicketQRCode(ticketId: string, origin?: string): Promise<string> {
  try {
    const baseUrl = origin || "https://gospels.se";
    const verificationUrl = `${baseUrl}/admin/scan?ticket=${ticketId}`;
    
    // We encode the verification URL so scanning it with a standard phone camera opens the gate scanner verification page,
    // and scanning it inside the Admin Gate Scanner immediately decodes the ticket parameter!
    const dataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 380,
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
