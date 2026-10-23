import { NextRequest, NextResponse } from "next/server";
import { getTicketById, checkInTicket, undoCheckInTicket, upsertTicket, TicketPass } from "@/lib/rsvpStore";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get("ticket") || searchParams.get("code") || "";

  if (!ticketId) {
    return NextResponse.json({ success: false, message: "Missing ticket parameter" }, { status: 400 });
  }

  // 1. Try in-memory / local persistent store first
  let ticket = getTicketById(ticketId);

  // 2. If not found locally, query InsForge PostgreSQL database via Prisma
  if (!ticket && prisma) {
    try {
      const dbRecord = await prisma.rSVP.findFirst({
        where: {
          OR: [
            { ticketCode: ticketId },
            { id: ticketId },
          ],
        },
      });

      if (dbRecord) {
        ticket = {
          id: dbRecord.ticketCode || dbRecord.id,
          eventId: dbRecord.eventId || "holy-spirit-worship-2026",
          eventTitle: dbRecord.eventTitle || "Gothenburg Worship Night",
          eventSubtitle: "Night of Adoration & Gospel Praise",
          dateString: "Datum meddelas inom kort",
          timeString: "Tid meddelas inom kort",
          venueName: "Göteborg (Plats meddelas)",
          venueAddress: "Göteborg, Sverige",
          hall: "Sanctuary Floor - Central Nave",
          name: dbRecord.name,
          email: dbRecord.email,
          guests: dbRecord.guests || 1,
          church: dbRecord.church || undefined,
          checkedIn: Boolean(dbRecord.checkedIn),
          checkedInAt: dbRecord.checkedInAt ? dbRecord.checkedInAt.toISOString() : undefined,
          createdAt: dbRecord.createdAt.toISOString(),
        };
        // Cache into local store
        upsertTicket(ticket);
      }
    } catch (e) {
      console.warn("Prisma lookup error:", e);
    }
  }

  if (!ticket) {
    return NextResponse.json(
      { success: false, status: "NOT_FOUND", message: `Ticket #${ticketId} is not registered.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    status: ticket.checkedIn ? "ALREADY_CHECKED_IN" : "VALID",
    ticket,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketId, action, ticket: payloadTicket } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "Missing ticketId" }, { status: 400 });
    }

    if (action === "sync" && payloadTicket) {
      const synced = upsertTicket(payloadTicket);
      // Persist to InsForge database
      if (prisma) {
        try {
          await prisma.rSVP.upsert({
            where: { ticketCode: payloadTicket.id },
            create: {
              ticketCode: payloadTicket.id,
              eventId: payloadTicket.eventId || "holy-spirit-worship-2026",
              eventTitle: payloadTicket.eventTitle || "Holy Spirit Worship 2026",
              name: payloadTicket.name,
              email: payloadTicket.email,
              guests: payloadTicket.guests || 1,
              church: payloadTicket.church || null,
              checkedIn: Boolean(payloadTicket.checkedIn),
            },
            update: {
              name: payloadTicket.name,
              email: payloadTicket.email,
              guests: payloadTicket.guests || 1,
              church: payloadTicket.church || null,
              checkedIn: Boolean(payloadTicket.checkedIn),
            },
          });
        } catch (e) {
          console.warn("Prisma sync error:", e);
        }
      }
      return NextResponse.json({ success: true, ticket: synced });
    }

    if (action === "undo") {
      const result = undoCheckInTicket(ticketId);
      if (prisma) {
        try {
          await prisma.rSVP.updateMany({
            where: { ticketCode: ticketId },
            data: { checkedIn: false, checkedInAt: null },
          });
        } catch (e) {
          console.warn("Prisma undo error:", e);
        }
      }
      return NextResponse.json(result);
    }

    const result = checkInTicket(ticketId, payloadTicket);
    if (result.success && prisma) {
      try {
        await prisma.rSVP.updateMany({
          where: { ticketCode: ticketId },
          data: { checkedIn: true, checkedInAt: new Date() },
        });
      } catch (e) {
        console.warn("Prisma checkin error:", e);
      }
    }
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
