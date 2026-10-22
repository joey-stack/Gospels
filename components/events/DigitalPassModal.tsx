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

  // 1. High-resolution canvas PNG export for saving directly to smartphone photos / downloads
  const handleDownloadImage = async () => {
    if (!ticket) return;
    setIsDownloadingImage(true);

    try {
      const canvas = document.createElement("canvas");
      const width = 1080;
      const height = 1620;
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
      bgGrad.addColorStop(0.2, "#F0FDFA");
      bgGrad.addColorStop(0.55, "#FFFFFF");
      bgGrad.addColorStop(0.85, "#F0FDFA");
      bgGrad.addColorStop(1, "#CCFBF1");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Outer Rounded Border
      const outerMargin = 20;
      const cornerRadius = 52;
      ctx.save();
      roundRectPolyfill(ctx, outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, cornerRadius);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#5EEAD4";
      ctx.stroke();
      ctx.clip(); // Clip decorative ribbons within border

      // 2. Radiant celestial glow behind top header
      const topGlow = ctx.createRadialGradient(width / 2, 110, 30, width / 2, 110, 480);
      topGlow.addColorStop(0, "rgba(45, 212, 191, 0.45)");
      topGlow.addColorStop(0.5, "rgba(20, 184, 166, 0.16)");
      topGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, 550);

      // 3. Fluid Turquoise Ribbon Waves
      // Bottom left wave 1
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

      // Bottom left wave 2
      ctx.beginPath();
      ctx.moveTo(-30, height - 40);
      ctx.bezierCurveTo(90, height - 340, 320, height - 280, 440, height + 20);
      ctx.lineTo(-30, height + 20);
      const bLeftGrad2 = ctx.createLinearGradient(0, height - 320, 400, height);
      bLeftGrad2.addColorStop(0, "rgba(13, 148, 136, 0.7)");
      bLeftGrad2.addColorStop(1, "rgba(94, 234, 212, 0.4)");
      ctx.fillStyle = bLeftGrad2;
      ctx.fill();

      // Bottom right wave 1
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

      // Bottom right wave 2
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

      // 4. Radiant Cross Symbol at Top Center
      ctx.save();
      ctx.strokeStyle = "#0D9488";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(width / 2, 60);
      ctx.lineTo(width / 2, 126);
      ctx.moveTo(width / 2 - 20, 80);
      ctx.lineTo(width / 2 + 20, 80);
      ctx.stroke();

      // Sunburst Rays
      ctx.strokeStyle = "rgba(45, 212, 191, 0.75)";
      ctx.lineWidth = 2.5;
      [-70, -45, -20, 0, 20, 45, 70].forEach((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const cx = width / 2;
        const cy = 80;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * 36, cy + Math.sin(rad) * 36);
        ctx.lineTo(cx + Math.cos(rad) * 70, cy + Math.sin(rad) * 70);
        ctx.stroke();
      });
      ctx.restore();

      // 5. Gospels Logo
      try {
        const logoImg = new window.Image();
        logoImg.crossOrigin = "anonymous";
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
          logoImg.src = "/brand/gospels-logo-color.png";
        });
        if (logoImg.width > 0) {
          const logoW = 340;
          const logoH = (logoImg.height / logoImg.width) * logoW;
          ctx.drawImage(logoImg, (width - logoW) / 2, 142, logoW, logoH);
        }
      } catch (e) {
        // Fallback
        ctx.font = "bold 56px 'EB Garamond', Georgia, serif";
        ctx.fillStyle = "#0D9488";
        ctx.textAlign = "center";
        ctx.fillText("Gospels", width / 2, 205);
      }

      // 6. Subtitle Tagline
      ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#0D9488";
      ctx.textAlign = "center";
      ctx.fillText("◆   GOSPELS GOTHENBURG  •  OFFICIAL PASS   ◆", width / 2, 275);

      // 7. Event Title
      ctx.font = "bold 54px 'EB Garamond', Georgia, serif";
      ctx.fillStyle = "#042F2E";
      ctx.fillText(ticket.eventTitle || "Holy Spirit Worship 2026", width / 2, 350);

      // 8. Event Subtitle
      ctx.font = "italic 28px 'EB Garamond', Georgia, serif";
      ctx.fillStyle = "#334155";
      ctx.fillText(ticket.eventSubtitle || "Night of Adoration & Gospel Praise", width / 2, 400);

      // Diamond separator
      ctx.strokeStyle = "#5EEAD4";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 110, 432);
      ctx.lineTo(width / 2 - 16, 432);
      ctx.moveTo(width / 2 + 16, 432);
      ctx.lineTo(width / 2 + 110, 432);
      ctx.stroke();

      ctx.fillStyle = "#0D9488";
      ctx.font = "14px sans-serif";
      ctx.fillText("◆", width / 2, 436);

      // 9. Info Card (2x2 Grid)
      const cardX = 64;
      const cardY = 470;
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
          // Person head + body
          ctx.beginPath();
          ctx.arc(iconCx, iconCy - 7, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(iconCx, iconCy + 15, 12, Math.PI, 0, false);
          ctx.fill();
        } else if (type === "ticket") {
          // Ticket stub
          roundRectPolyfill(ctx, iconCx - 12, iconCy - 9, 24, 18, 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(iconCx - 12, iconCy, 3, -Math.PI / 2, Math.PI / 2);
          ctx.arc(iconCx + 12, iconCy, 3, Math.PI / 2, -Math.PI / 2);
          ctx.fillStyle = "#0D9488";
          ctx.fill();
        } else if (type === "calendar") {
          // Calendar
          roundRectPolyfill(ctx, iconCx - 11, iconCy - 10, 22, 20, 3);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(iconCx - 11, iconCy - 3);
          ctx.lineTo(iconCx + 11, iconCy - 3);
          ctx.stroke();
        } else if (type === "pin") {
          // Location pin
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
      const qrY = 760;
      const qrH = 780;
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

      ctx.restore(); // unclip

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
              max-width: 520px;
              background: linear-gradient(180deg, #DDFCF5 0%, #F0FDFA 18%, #FFFFFF 50%, #F0FDFA 85%, #CCFBF1 100%);
              border: 2px solid #5EEAD4;
              border-radius: 28px;
              padding: 32px 28px;
              box-shadow: 0 16px 36px rgba(13,148,136,0.12);
              overflow: hidden;
            }
            .radiant-cross {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 6px;
            }
            .radiant-cross svg {
              width: 44px;
              height: 44px;
              color: #0D9488;
            }
            .logo-wrap {
              text-align: center;
              margin-bottom: 4px;
            }
            .logo-wrap img {
              height: 44px;
              max-width: 240px;
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
              font-size: 32px;
              font-weight: 700;
              color: #042F2E;
              text-align: center;
              margin-top: 10px;
              line-height: 1.1;
              letter-spacing: -0.5px;
            }
            .event-subtitle {
              font-family: 'EB Garamond', Georgia, serif;
              font-style: italic;
              font-size: 17px;
              color: #334155;
              text-align: center;
              margin-top: 4px;
            }
            .diamond-divider {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin: 14px 0 18px 0;
            }
            .diamond-divider::before, .diamond-divider::after {
              content: "";
              height: 1px;
              width: 48px;
              background: #5EEAD4;
            }
            .diamond-divider span {
              color: #0D9488;
              font-size: 9px;
            }
            .info-box {
              background: #ffffff;
              border: 1.5px solid #99F6E4;
              border-radius: 18px;
              padding: 16px 18px;
              box-shadow: 0 4px 14px rgba(13,148,136,0.06);
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 14px;
              margin-bottom: 16px;
            }
            .info-item {
              display: flex;
              align-items: flex-start;
              gap: 10px;
            }
            .info-icon {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: #0D9488;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            .info-label {
              font-size: 10px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #64748B;
              display: block;
              margin-bottom: 2px;
            }
            .info-val {
              font-size: 14px;
              font-weight: 700;
              color: #0F172A;
              line-height: 1.2;
              display: block;
            }
            .info-sub {
              font-size: 11px;
              font-weight: 500;
              color: #64748B;
              margin-top: 2px;
              display: block;
            }
            .qr-box {
              background: #ffffff;
              border: 1.5px solid #99F6E4;
              border-radius: 20px;
              padding: 22px 18px;
              text-align: center;
              box-shadow: 0 6px 20px rgba(13,148,136,0.08);
            }
            .qr-img {
              width: 230px;
              height: 230px;
              margin: 0 auto;
              display: block;
            }
            .pass-code {
              font-family: monospace;
              font-size: 20px;
              font-weight: 800;
              color: #0D9488;
              letter-spacing: 2px;
              margin-top: 14px;
            }
            .gate-instruction {
              font-size: 12px;
              color: #64748B;
              margin-top: 6px;
              line-height: 1.4;
            }
            .bottom-waves {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 120px;
              pointer-events: none;
              z-index: 0;
            }
            @media print {
              body { background: white; padding: 0; }
              .pass-card { max-width: 100%; border: none; box-shadow: none; padding: 20px 10px; }
            }
          </style>
        </head>
        <body>
          <div class="pass-card">
            <!-- Radiant cross -->
            <div class="radiant-cross">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
              </svg>
            </div>

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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative w-full max-w-xl z-10 my-auto text-slate-900"
        >
          {/* Top Bar with Close button */}
          <div className="flex items-center justify-between pb-3 px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>{isSv ? "Officiellt Inträdespass" : "Official Event Pass"}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* THE EXACT PASS CARD MATCHING THE USER'S REFERENCE DESIGN */}
          {/* ======================================================== */}
          <div
            ref={passCardRef}
            className="relative w-full rounded-[28px] overflow-hidden border-2 border-[#5EEAD4] bg-gradient-to-b from-[#DDFCF5] via-white to-[#CCFBF1] shadow-[0_20px_60px_rgba(13,148,136,0.2)] p-5 sm:p-7 text-[#0F172A]"
          >
            {/* Top Radiant Background Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-44 bg-gradient-to-b from-[#2DD4BF]/30 via-[#14B8A6]/15 to-transparent rounded-full blur-2xl pointer-events-none z-0" />

            {/* Corner Decorative Ribbon Wave Flourishes */}
            <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none opacity-40 z-0">
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

            <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-40 z-0">
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
            <div className="absolute bottom-0 left-0 w-52 h-44 pointer-events-none z-0">
              <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
                <path
                  d="M-30,190 C30,100 120,110 170,190 Z"
                  fill="url(#bRibbon1)"
                  opacity="0.85"
                />
                <path
                  d="M-20,170 C50,60 160,80 200,190 Z"
                  fill="url(#bRibbon2)"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient id="bRibbon1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#5EEAD4" />
                  </linearGradient>
                  <linearGradient id="bRibbon2" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#99F6E4" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-52 h-44 pointer-events-none z-0">
              <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
                <path
                  d="M230,190 C170,100 80,110 30,190 Z"
                  fill="url(#bRibbon3)"
                  opacity="0.85"
                />
                <path
                  d="M220,170 C150,60 40,80 0,190 Z"
                  fill="url(#bRibbon4)"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient id="bRibbon3" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#5EEAD4" />
                  </linearGradient>
                  <linearGradient id="bRibbon4" x1="1" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#99F6E4" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Pass Foreground Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Radiant Cross Emblem */}
              <div className="relative flex flex-col items-center justify-center mb-1">
                <svg
                  className="w-8 h-8 text-[#0D9488] drop-shadow-[0_2px_8px_rgba(45,212,191,0.5)]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2V22M6 8H18"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  {/* Sunburst radiant rays */}
                  <path
                    d="M12 2L12 0M17 5L19 3M19 11L21 11M7 5L5 3M5 11L3 11"
                    stroke="#2DD4BF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Gospels Logo */}
              <div className="relative h-10 sm:h-12 w-44 sm:w-52 mb-1.5 flex items-center justify-center">
                <Image
                  src="/brand/gospels-logo-color.png"
                  alt="Gospels Gothenburg"
                  width={200}
                  height={50}
                  className="h-10 sm:h-12 w-auto object-contain mx-auto"
                  priority
                />
              </div>

              {/* Tagline */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold text-[#0D9488] tracking-[0.18em] uppercase mt-0.5">
                <span className="text-[8px]">◆</span>
                <span>GOSPELS GOTHENBURG</span>
                <span>•</span>
                <span>OFFICIAL PASS</span>
                <span className="text-[8px]">◆</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#042F2E] tracking-tight leading-tight mt-2.5">
                {ticket.eventTitle}
              </h1>

              {/* Subtitle */}
              <p className="font-serif italic text-sm sm:text-base text-slate-600 mt-0.5">
                {ticket.eventSubtitle}
              </p>

              {/* Diamond Divider */}
              <div className="flex items-center justify-center gap-2 my-3">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#2DD4BF]" />
                <span className="text-[#0D9488] text-[9px]">◆</span>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#2DD4BF]" />
              </div>

              {/* 2x2 Rounded Info Card */}
              <div className="w-full bg-white/95 backdrop-blur-xs rounded-2xl border border-[#99F6E4] shadow-[0_4px_16px_rgba(13,148,136,0.06)] p-3.5 sm:p-4 mb-3.5 text-left">
                <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-3.5">
                  {/* Attendee */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        ATTENDEE / DELTAGARE
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate mt-0.5 font-hanken">
                        {ticket.name}
                      </span>
                    </div>
                  </div>

                  {/* Admission */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.5c-1.25.78-2 2.17-2 3.5s.75 2.72 2 3.5V18H4v-2.5c1.25-.78 2-2.17 2-3.5s-.75-2.72-2-3.5V6h16v2.5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        ADMISSION / PLATSER
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate mt-0.5 font-hanken">
                        {ticket.guests} {ticket.guests > 1 ? "Seats" : "Seat"} (Complimentary)
                      </span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        DATE & TIME / DATUM
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5 leading-snug">
                        {ticket.dateString}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium leading-tight mt-0.5">
                        {ticket.timeString}
                      </span>
                    </div>
                  </div>

                  {/* Sanctuary */}
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        SANCTUARY / LOKAL
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5 leading-snug">
                        {ticket.venueName}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 block font-medium leading-tight mt-0.5">
                        {ticket.hall}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Container Box */}
              <div className="w-full bg-white/98 rounded-2xl border border-[#99F6E4] shadow-[0_6px_22px_rgba(13,148,136,0.08)] p-4 sm:p-5 text-center">
                <div className="inline-block p-2 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt={`Pass QR #${ticket.id}`}
                      className="w-44 h-44 sm:w-52 sm:h-52 object-contain mx-auto block"
                    />
                  ) : (
                    <div className="w-44 h-44 sm:w-52 sm:h-52 bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
                      Generating scannable QR...
                    </div>
                  )}
                </div>

                {/* Ticket ID # */}
                <div className="font-mono text-base sm:text-lg font-extrabold text-[#0D9488] tracking-widest mt-2.5">
                  #{ticket.id}
                </div>

                {/* Admission note */}
                <p className="text-[11px] sm:text-xs text-slate-500 max-w-[280px] mx-auto mt-1 leading-snug">
                  {isSv
                    ? "Visa denna QR-kod vid Entré B (Västra Narthex) för omedelbart inträde."
                    : "Show this QR code at Entrance B (West Narthex) for swift admission."}
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* ACTION BUTTONS (Save PNG to Phone, Print/PDF, Calendar) */}
          {/* ======================================================== */}
          <div className="mt-3.5 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* 1. Download Pass Image (.png) for direct phone saving */}
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isDownloadingImage}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                {isDownloadingImage ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{isSv ? "Genererar Bild..." : "Generating Pass..."}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                    <span>{isSv ? "Spara Biljettbild (.png)" : "Save Pass Image (.png)"}</span>
                  </>
                )}
              </button>

              {/* 2. Print / Save as PDF */}
              <button
                type="button"
                onClick={handlePrint}
                className="w-full bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px] text-[#0D9488]">print</span>
                <span>{isSv ? "Skriv ut / Spara PDF" : "Print / Save as PDF"}</span>
              </button>
            </div>

            {/* Calendar & Dismiss */}
            <div className="flex items-center justify-between px-1 pt-1">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[15px] text-[#2DD4BF]">
                  calendar_add_on
                </span>
                <span>{isSv ? "Lägg till i kalender" : "Add to Google Calendar"}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-white/70 hover:text-white font-medium cursor-pointer transition-colors"
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
