"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { TicketPass } from "@/lib/rsvpStore";

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketPass | null;
  qrCodeUrl?: string;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  ticket,
  qrCodeUrl,
}) => {
  const { isSv } = useLanguage();
  const passCardRef = useRef<HTMLDivElement>(null);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);

  if (!isOpen || !ticket) return null;

  // 1. High-resolution canvas PNG export for saving cleanly to smartphone photos / downloads
  const handleDownloadImage = async () => {
    if (!ticket) return;
    setIsDownloadingImage(true);

    try {
      const canvas = document.createElement("canvas");
      // Clean proportions with generous vertical breathing room: 1080 x 1650
      const width = 1080;
      const height = 1650;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      const roundRectPolyfill = (
        c: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        r: number
      ) => {
        if (typeof c.roundRect === "function") {
          c.beginPath();
          c.roundRect(x, y, w, h, r);
        } else {
          c.beginPath();
          c.moveTo(x + r, y);
          c.lineTo(x + w - r, y);
          c.quadraticCurveTo(x + w, y, x + w, y + r);
          c.lineTo(x + w, y + h - r);
          c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
          c.lineTo(x + r, y + h);
          c.quadraticCurveTo(x, y + h, x, y + h - r);
          c.lineTo(x, y + r);
          c.quadraticCurveTo(x, y, x + r, y);
          c.closePath();
        }
      };

      // 1. Base Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#DDFCF5");
      bgGrad.addColorStop(0.18, "#F0FDFA");
      bgGrad.addColorStop(0.55, "#FFFFFF");
      bgGrad.addColorStop(0.85, "#F0FDFA");
      bgGrad.addColorStop(1, "#CCFBF1");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Outer Rounded Border
      const outerMargin = 22;
      const cornerRadius = 50;
      ctx.save();
      roundRectPolyfill(ctx, outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, cornerRadius);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#5EEAD4";
      ctx.stroke();
      ctx.clip(); // Keep corner ribbons cleanly within border

      // 2. Radiant celestial glow behind top header
      const topGlow = ctx.createRadialGradient(width / 2, 100, 20, width / 2, 100, 460);
      topGlow.addColorStop(0, "rgba(45, 212, 191, 0.4)");
      topGlow.addColorStop(0.5, "rgba(20, 184, 166, 0.12)");
      topGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, 500);

      // 3. Fluid Turquoise Ribbon Waves
      // Bottom left ribbons
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-50, height + 20);
      ctx.bezierCurveTo(60, height - 260, 240, height - 220, 360, height + 20);
      ctx.lineTo(-50, height + 20);
      const bLeftGrad1 = ctx.createLinearGradient(0, height - 240, 320, height);
      bLeftGrad1.addColorStop(0, "#0D9488");
      bLeftGrad1.addColorStop(0.6, "#2DD4BF");
      bLeftGrad1.addColorStop(1, "#99F6E4");
      ctx.fillStyle = bLeftGrad1;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-30, height - 40);
      ctx.bezierCurveTo(90, height - 340, 320, height - 280, 440, height + 20);
      ctx.lineTo(-30, height + 20);
      const bLeftGrad2 = ctx.createLinearGradient(0, height - 320, 400, height);
      bLeftGrad2.addColorStop(0, "rgba(13, 148, 136, 0.7)");
      bLeftGrad2.addColorStop(1, "rgba(94, 234, 212, 0.4)");
      ctx.fillStyle = bLeftGrad2;
      ctx.fill();

      // Bottom right ribbons
      ctx.beginPath();
      ctx.moveTo(width + 50, height + 20);
      ctx.bezierCurveTo(width - 60, height - 260, width - 240, height - 220, width - 360, height + 20);
      ctx.lineTo(width + 50, height + 20);
      const bRightGrad1 = ctx.createLinearGradient(width, height - 240, width - 320, height);
      bRightGrad1.addColorStop(0, "#0D9488");
      bRightGrad1.addColorStop(0.6, "#2DD4BF");
      bRightGrad1.addColorStop(1, "#99F6E4");
      ctx.fillStyle = bRightGrad1;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width + 30, height - 40);
      ctx.bezierCurveTo(width - 90, height - 340, width - 320, height - 280, width - 440, height + 20);
      ctx.lineTo(width + 30, height + 20);
      ctx.fillStyle = bLeftGrad2;
      ctx.fill();

      // Top corner flourishes
      ctx.beginPath();
      ctx.moveTo(-40, -20);
      ctx.bezierCurveTo(100, 30, 160, 130, 80, 240);
      ctx.bezierCurveTo(10, 190, -10, 90, -40, -20);
      ctx.fillStyle = "rgba(45, 212, 191, 0.35)";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width + 40, -20);
      ctx.bezierCurveTo(width - 100, 30, width - 160, 130, width - 80, 240);
      ctx.bezierCurveTo(width - 10, 190, width + 10, 90, width + 40, -20);
      ctx.fillStyle = "rgba(45, 212, 191, 0.35)";
      ctx.fill();
      ctx.restore();

      // 4. Gospels Logo (Has cross & open Bible built-in)
      const logoW = 290;
      const logoH = (649 / 996) * logoW; // approx 189px
      const logoY = 65;

      try {
        const logoImg = new window.Image();
        logoImg.crossOrigin = "anonymous";
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
          logoImg.src = "/brand/gospels-logo-color.png";
        });
        if (logoImg.width > 0) {
          ctx.drawImage(logoImg, (width - logoW) / 2, logoY, logoW, logoH);
        }
      } catch (e) {
        ctx.font = "bold 56px 'EB Garamond', Georgia, serif";
        ctx.fillStyle = "#0D9488";
        ctx.textAlign = "center";
        ctx.fillText("Gospels", width / 2, logoY + 120);
      }

      // 5. Subtitle Tagline (Positioned below the logo with dedicated gap)
      const taglineY = logoY + logoH + 34; // approx 288px
      ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#0D9488";
      ctx.textAlign = "center";
      ctx.letterSpacing = "2px";
      ctx.fillText("◆   GOSPELS GOTHENBURG  •  OFFICIAL PASS   ◆", width / 2, taglineY);

      // 6. Event Title (Cleanly below tagline, NO overlap)
      const titleY = taglineY + 68; // approx 356px
      ctx.font = "bold 52px 'EB Garamond', Georgia, serif";
      ctx.fillStyle = "#042F2E";
      ctx.letterSpacing = "-0.5px";
      ctx.fillText(ticket.eventTitle || "Holy Spirit Worship 2026", width / 2, titleY);

      // 7. Event Subtitle
      const subtitleY = titleY + 48; // approx 404px
      ctx.font = "italic 27px 'EB Garamond', Georgia, serif";
      ctx.fillStyle = "#334155";
      ctx.letterSpacing = "0px";
      ctx.fillText(ticket.eventSubtitle || "Night of Adoration & Gospel Praise", width / 2, subtitleY);

      // 8. Diamond separator
      const dividerY = subtitleY + 36; // approx 440px
      ctx.strokeStyle = "#5EEAD4";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 100, dividerY);
      ctx.lineTo(width / 2 - 16, dividerY);
      ctx.moveTo(width / 2 + 16, dividerY);
      ctx.lineTo(width / 2 + 100, dividerY);
      ctx.stroke();

      ctx.fillStyle = "#0D9488";
      ctx.font = "14px sans-serif";
      ctx.fillText("◆", width / 2, dividerY + 4);

      // 9. Info Card (2x2 Grid)
      const cardX = 64;
      const cardY = dividerY + 36; // approx 476px
      const cardW = width - 128;
      const cardH = 260;
      const cardRadius = 26;

      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "rgba(13, 148, 136, 0.09)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      roundRectPolyfill(ctx, cardX, cardY, cardW, cardH, cardRadius);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = "#99F6E4";
      ctx.lineWidth = 2.5;
      roundRectPolyfill(ctx, cardX, cardY, cardW, cardH, cardRadius);
      ctx.stroke();

      // Helper to render an info cell
      const drawInfoCell = (
        col: number,
        row: number,
        type: "user" | "ticket" | "calendar" | "pin",
        label: string,
        val: string,
        subVal?: string
      ) => {
        const colX = col === 0 ? cardX + 34 : cardX + cardW / 2 + 18;
        const rowY = row === 0 ? cardY + 30 : cardY + 144;

        // Circular Icon Badge
        const iconCx = colX + 26;
        const iconCy = rowY + 30;
        ctx.fillStyle = "#0D9488";
        ctx.beginPath();
        ctx.arc(iconCx, iconCy, 26, 0, Math.PI * 2);
        ctx.fill();

        // Icon glyphs
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2.5;

        if (type === "user") {
          ctx.beginPath();
          ctx.arc(iconCx, iconCy - 7, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(iconCx, iconCy + 15, 12, Math.PI, 0, false);
          ctx.fill();
        } else if (type === "ticket") {
          roundRectPolyfill(ctx, iconCx - 12, iconCy - 9, 24, 18, 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(iconCx - 12, iconCy, 3, -Math.PI / 2, Math.PI / 2);
          ctx.arc(iconCx + 12, iconCy, 3, Math.PI / 2, -Math.PI / 2);
          ctx.fillStyle = "#0D9488";
          ctx.fill();
        } else if (type === "calendar") {
          roundRectPolyfill(ctx, iconCx - 11, iconCy - 10, 22, 20, 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(iconCx - 11, iconCy - 3);
          ctx.lineTo(iconCx + 11, iconCy - 3);
          ctx.stroke();
        } else if (type === "pin") {
          ctx.beginPath();
          ctx.arc(iconCx, iconCy - 4, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(iconCx - 6, iconCy - 1);
          ctx.lineTo(iconCx, iconCy + 12);
          ctx.lineTo(iconCx + 6, iconCy - 1);
          ctx.fill();
          ctx.fillStyle = "#0D9488";
          ctx.beginPath();
          ctx.arc(iconCx, iconCy - 4, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Text
        const textX = colX + 66;
        ctx.textAlign = "left";

        // Label
        ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText(label, textX, rowY + 20);

        // Main Value
        ctx.font = "bold 23px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = "#0F172A";
        ctx.fillText(val, textX, rowY + 52);

        // Sub Value
        if (subVal) {
          ctx.font = "500 17px 'Plus Jakarta Sans', sans-serif";
          ctx.fillStyle = "#64748B";
          ctx.fillText(subVal, textX, rowY + 80);
        }
      };

      drawInfoCell(0, 0, "user", "ATTENDEE / DELTAGARE", ticket.name);
      drawInfoCell(
        1,
        0,
        "ticket",
        "ADMISSION / PLATSER",
        `${ticket.guests} ${ticket.guests > 1 ? "Seats" : "Seat"} (Complimentary)`
      );
      drawInfoCell(
        0,
        1,
        "calendar",
        "DATE & TIME / DATUM",
        ticket.dateString,
        ticket.timeString
      );
      drawInfoCell(
        1,
        1,
        "pin",
        "SANCTUARY / LOKAL",
        ticket.venueName,
        ticket.hall
      );

      // 10. QR Code Box
      const qrY = cardY + cardH + 34; // approx 770px
      const qrH = height - qrY - 60; // approx 820px
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "rgba(13, 148, 136, 0.1)";
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 10;
      roundRectPolyfill(ctx, cardX, qrY, cardW, qrH, cardRadius);
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = "#99F6E4";
      ctx.lineWidth = 2.5;
      roundRectPolyfill(ctx, cardX, qrY, cardW, qrH, cardRadius);
      ctx.stroke();

      // QR Image
      if (qrCodeUrl) {
        try {
          const qrImg = new window.Image();
          await new Promise((resolve) => {
            qrImg.onload = resolve;
            qrImg.onerror = resolve;
            qrImg.src = qrCodeUrl;
          });
          const qrSize = 510;
          ctx.drawImage(qrImg, (width - qrSize) / 2, qrY + 45, qrSize, qrSize);
        } catch (e) {
          // ignore
        }
      }

      // Ticket Code e.g. #HSW26-NAV-9403
      ctx.font = "bold 38px 'Plus Jakarta Sans', monospace";
      ctx.fillStyle = "#0D9488";
      ctx.textAlign = "center";
      ctx.fillText(`#${ticket.id}`, width / 2, qrY + 610);

      // Gate admission text
      ctx.font = "500 19px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#64748B";
      ctx.fillText(
        isSv
          ? "Visa denna QR-kod vid Entré B (Västra Narthex) för omedelbart inträde."
          : "Show this QR code at Entrance B (West Narthex) for swift admission.",
        width / 2,
        qrY + 665
      );

      ctx.restore(); // unclip outer border

      // Trigger instant PNG file download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.download = `gospels-pass-${ticket.id}.png`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, "image/png");
    } catch (err) {
      console.error("Failed to generate pass image:", err);
    } finally {
      setIsDownloadingImage(false);
    }
  };

  // 2. High-fidelity printable / PDF pass matching this exact visual
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${ticket.eventTitle} Pass - ${ticket.name}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
              background: #f1f5f9;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 24px;
              color: #0f172a;
            }
            .pass-card {
              position: relative;
              width: 100%;
              max-width: 480px;
              background: linear-gradient(180deg, #DDFCF5 0%, #F0FDFA 18%, #FFFFFF 50%, #F0FDFA 85%, #CCFBF1 100%);
              border: 2px solid #5EEAD4;
              border-radius: 28px;
              padding: 28px 24px;
              box-shadow: 0 16px 36px rgba(13,148,136,0.12);
              overflow: hidden;
            }
            .logo-wrap {
              text-align: center;
              margin-bottom: 6px;
            }
            .logo-wrap img {
              height: 48px;
              max-width: 200px;
              object-fit: contain;
            }
            .tagline {
              text-align: center;
              font-size: 11px;
              font-weight: 800;
              color: #0D9488;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-top: 6px;
            }
            .event-title {
              font-family: 'EB Garamond', Georgia, serif;
              font-size: 28px;
              font-weight: 700;
              color: #042F2E;
              text-align: center;
              margin-top: 8px;
              line-height: 1.15;
              letter-spacing: -0.5px;
            }
            .event-subtitle {
              font-family: 'EB Garamond', Georgia, serif;
              font-style: italic;
              font-size: 15px;
              color: #334155;
              text-align: center;
              margin-top: 3px;
            }
            .diamond-divider {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin: 12px 0 14px 0;
            }
            .diamond-divider::before, .diamond-divider::after {
              content: "";
              height: 1px;
              width: 44px;
              background: #5EEAD4;
            }
            .diamond-divider span {
              color: #0D9488;
              font-size: 9px;
            }
            .info-box {
              background: #ffffff;
              border: 1.5px solid #99F6E4;
              border-radius: 16px;
              padding: 14px 16px;
              box-shadow: 0 4px 14px rgba(13,148,136,0.06);
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              margin-bottom: 14px;
            }
            .info-item {
              display: flex;
              align-items: flex-start;
              gap: 8px;
            }
            .info-icon {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #0D9488;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            .info-label {
              font-size: 9px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #64748B;
              display: block;
              margin-bottom: 2px;
            }
            .info-val {
              font-size: 13px;
              font-weight: 700;
              color: #0F172A;
              line-height: 1.2;
              display: block;
            }
            .info-sub {
              font-size: 10px;
              font-weight: 500;
              color: #64748B;
              margin-top: 2px;
              display: block;
            }
            .qr-box {
              background: #ffffff;
              border: 1.5px solid #99F6E4;
              border-radius: 18px;
              padding: 16px 14px;
              text-align: center;
              box-shadow: 0 6px 20px rgba(13,148,136,0.08);
            }
            .qr-img {
              width: 190px;
              height: 190px;
              margin: 0 auto;
              display: block;
            }
            .pass-code {
              font-family: monospace;
              font-size: 18px;
              font-weight: 800;
              color: #0D9488;
              letter-spacing: 2px;
              margin-top: 10px;
            }
            .gate-instruction {
              font-size: 11px;
              color: #64748B;
              margin-top: 4px;
              line-height: 1.35;
            }
            @media print {
              body { background: white; padding: 0; }
              .pass-card { max-width: 100%; border: none; box-shadow: none; padding: 16px 8px; }
            }
          </style>
        </head>
        <body>
          <div class="pass-card">
            <!-- Logo -->
            <div class="logo-wrap">
              <img src="${window.location.origin}/brand/gospels-logo-color.png" alt="Gospels" onerror="this.style.display='none'" />
            </div>

            <div class="tagline">◆ GOSPELS GOTHENBURG • OFFICIAL PASS ◆</div>
            <h1 class="event-title">${ticket.eventTitle}</h1>
            <p class="event-subtitle">${ticket.eventSubtitle}</p>

            <div class="diamond-divider"><span>◆</span></div>

            <!-- Info Box -->
            <div class="info-box">
              <div class="info-item">
                <div class="info-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">Attendee / Deltagare</span>
                  <span class="info-val">${ticket.name}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">Admission / Platser</span>
                  <span class="info-val">${ticket.guests} ${ticket.guests > 1 ? "Seats" : "Seat"} (Complimentary)</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">Date & Time / Datum</span>
                  <span class="info-val">${ticket.dateString}</span>
                  <span class="info-sub">${ticket.timeString}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <span class="info-label">Sanctuary / Lokal</span>
                  <span class="info-val">${ticket.venueName}</span>
                  <span class="info-sub">${ticket.hall}</span>
                </div>
              </div>
            </div>

            <!-- QR Box -->
            <div class="qr-box">
              ${qrCodeUrl ? `<img src="${qrCodeUrl}" class="qr-img" alt="Pass QR" />` : ""}
              <div class="pass-code">#${ticket.id}</div>
              <p class="gate-instruction">Show this QR code at Entrance B (West Narthex) for swift admission.</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 400);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    ticket.eventTitle
  )}&dates=20260328T173000Z/20260328T210000Z&details=${encodeURIComponent(
    `Official pass #${ticket.id} for ${ticket.name} (${ticket.guests} seats).`
  )}&location=${encodeURIComponent(ticket.venueName + ", " + ticket.venueAddress)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window Container (Cleanly sized & centered like StripeGivingModal) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-[420px] max-h-[92vh] flex flex-col z-10 my-auto"
        >
          {/* Top Bar with Badge & Dismiss Icon */}
          <div className="flex items-center justify-between pb-2 px-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>{isSv ? "Officiellt Inträdespass" : "Official Event Pass"}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* THE EXACT PASS CARD (Perfect Laptop Sizing, Zero Overlap) */}
          {/* ======================================================== */}
          <div
            ref={passCardRef}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#5EEAD4] bg-gradient-to-b from-[#DDFCF5] via-white to-[#CCFBF1] shadow-[0_16px_48px_rgba(13,148,136,0.22)] p-4 sm:p-5 text-[#0F172A] overflow-y-auto"
          >
            {/* Top Radiant Background Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-36 bg-gradient-to-b from-[#2DD4BF]/25 via-[#14B8A6]/10 to-transparent rounded-full blur-xl pointer-events-none z-0" />

            {/* Corner Decorative Ribbon Wave Flourishes */}
            <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none opacity-35 z-0">
              <svg viewBox="0 0 150 150" fill="none" className="w-full h-full">
                <path
                  d="M-20,-20 C50,20 80,70 30,130 C0,100 -10,40 -20,-20 Z"
                  fill="url(#topWaveGrad)"
                />
                <defs>
                  <linearGradient id="topWaveGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2DD4BF" />
                    <stop offset="100%" stopColor="#0D9488" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-35 z-0">
              <svg viewBox="0 0 150 150" fill="none" className="w-full h-full">
                <path
                  d="M170,-20 C100,20 70,70 120,130 C150,100 160,40 170,-20 Z"
                  fill="url(#topWaveGrad2)"
                />
                <defs>
                  <linearGradient id="topWaveGrad2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2DD4BF" />
                    <stop offset="100%" stopColor="#0D9488" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom 3D Ribbon Swooshes */}
            <div className="absolute bottom-0 left-0 w-40 h-32 pointer-events-none z-0">
              <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
                <path
                  d="M-30,190 C30,100 120,110 170,190 Z"
                  fill="url(#bRibbon1)"
                  opacity="0.85"
                />
                <defs>
                  <linearGradient id="bRibbon1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#5EEAD4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-40 h-32 pointer-events-none z-0">
              <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
                <path
                  d="M230,190 C170,100 80,110 30,190 Z"
                  fill="url(#bRibbon3)"
                  opacity="0.85"
                />
                <defs>
                  <linearGradient id="bRibbon3" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#5EEAD4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Pass Foreground Content with Pristine Vertical Spacing */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Official Gospels Logo (Contains glowing cross & Bible) */}
              <div className="relative h-11 sm:h-12 w-36 sm:w-44 flex items-center justify-center">
                <Image
                  src="/brand/gospels-logo-color.png"
                  alt="Gospels Gothenburg"
                  width={180}
                  height={55}
                  className="h-11 sm:h-12 w-auto object-contain mx-auto"
                  priority
                />
              </div>

              {/* Tagline (Cleanly below logo with proper gap) */}
              <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] font-extrabold text-[#0D9488] tracking-[0.16em] uppercase mt-2">
                <span className="text-[7px]">◆</span>
                <span>GOSPELS GOTHENBURG</span>
                <span>•</span>
                <span>OFFICIAL PASS</span>
                <span className="text-[7px]">◆</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-2xl sm:text-[26px] font-bold text-[#042F2E] tracking-tight leading-tight mt-2.5">
                {ticket.eventTitle}
              </h1>

              {/* Subtitle */}
              <p className="font-serif italic text-xs sm:text-sm text-slate-600 mt-0.5">
                {ticket.eventSubtitle}
              </p>

              {/* Diamond Divider */}
              <div className="flex items-center justify-center gap-2 my-2.5">
                <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#2DD4BF]" />
                <span className="text-[#0D9488] text-[8px]">◆</span>
                <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#2DD4BF]" />
              </div>

              {/* 2x2 Rounded Info Card */}
              <div className="w-full bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-[#99F6E4] shadow-[0_4px_14px_rgba(13,148,136,0.06)] p-3 sm:p-3.5 mb-3 text-left">
                <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-2.5 sm:gap-y-3">
                  {/* Attendee */}
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                        ATTENDEE / DELTAGARE
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-900 block truncate mt-0.5 font-hanken leading-tight">
                        {ticket.name}
                      </span>
                    </div>
                  </div>

                  {/* Admission */}
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.5c-1.25.78-2 2.17-2 3.5s.75 2.72 2 3.5V18H4v-2.5c1.25-.78 2-2.17 2-3.5s-.75-2.72-2-3.5V6h16v2.5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                        ADMISSION / PLATSER
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-900 block truncate mt-0.5 font-hanken leading-tight">
                        {ticket.guests} {ticket.guests > 1 ? "Seats" : "Seat"} (Complimentary)
                      </span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                        DATE & TIME / DATUM
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5 leading-tight">
                        {ticket.dateString}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-medium leading-tight mt-0.5">
                        {ticket.timeString}
                      </span>
                    </div>
                  </div>

                  {/* Sanctuary */}
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">
                        SANCTUARY / LOKAL
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5 leading-tight">
                        {ticket.venueName}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-medium leading-tight mt-0.5">
                        {ticket.hall}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Container Box */}
              <div className="w-full bg-white/98 rounded-xl sm:rounded-2xl border border-[#99F6E4] shadow-[0_6px_20px_rgba(13,148,136,0.08)] p-3.5 sm:p-4 text-center">
                <div className="inline-block p-1.5 bg-white rounded-lg border border-slate-100 shadow-2xs">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt={`Pass QR #${ticket.id}`}
                      className="w-36 h-36 sm:w-44 sm:h-44 object-contain mx-auto block"
                    />
                  ) : (
                    <div className="w-36 h-36 sm:w-44 sm:h-44 bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
                      Generating scannable QR...
                    </div>
                  )}
                </div>

                {/* Ticket ID # */}
                <div className="font-mono text-sm sm:text-base font-extrabold text-[#0D9488] tracking-widest mt-2">
                  #{ticket.id}
                </div>

                {/* Admission note */}
                <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 max-w-[260px] mx-auto mt-0.5 leading-snug">
                  {isSv
                    ? "Visa denna QR-kod vid Entré B (Västra Narthex) för omedelbart inträde."
                    : "Show this QR code at Entrance B (West Narthex) for swift admission."}
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* ACTION BUTTONS (Clean, Centered, Matching Stripe Modal) */}
          {/* ======================================================== */}
          <div className="mt-2.5 space-y-1.5">
            <div className="grid grid-cols-2 gap-2">
              {/* 1. Download Pass Image (.png) for direct phone saving */}
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isDownloadingImage}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-bold text-xs py-2.5 px-3 rounded-lg sm:rounded-xl shadow-md shadow-teal-900/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                {isDownloadingImage ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{isSv ? "Genererar..." : "Saving..."}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    <span>{isSv ? "Spara Bild (.png)" : "Save Image (.png)"}</span>
                  </>
                )}
              </button>

              {/* 2. Print / Save as PDF */}
              <button
                type="button"
                onClick={handlePrint}
                className="w-full bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs py-2.5 px-3 rounded-lg sm:rounded-xl shadow-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px] text-[#0D9488]">print</span>
                <span>{isSv ? "Skriv ut / PDF" : "Print / PDF"}</span>
              </button>
            </div>

            {/* Calendar & Dismiss */}
            <div className="flex items-center justify-between px-1 pt-0.5">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-white/80 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-[#2DD4BF]">
                  calendar_add_on
                </span>
                <span>{isSv ? "Lägg till i kalender" : "Add to Calendar"}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="text-[11px] text-white/70 hover:text-white font-medium cursor-pointer transition-colors"
              >
                {isSv ? "Stäng fönstret" : "Close pass view"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
