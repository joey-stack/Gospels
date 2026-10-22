import { NextResponse } from "next/server";
import { getAllTickets, TicketPass } from "@/lib/rsvpStore";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let tickets: TicketPass[] = getAllTickets();

    if (prisma) {
      try {
        const dbRsvps = await prisma.rSVP.findMany({
          orderBy: { createdAt: "desc" },
        });

        if (dbRsvps.length > 0) {
          const dbTickets: TicketPass[] = dbRsvps.map((r) => ({
            id: r.ticketCode || r.id,
            eventId: r.eventId || "holy-spirit-worship-2026",
            eventTitle: r.eventTitle || "Holy Spirit Worship 2026",
            eventSubtitle: "Night of Adoration & Gospel Praise",
            dateString: "Saturday, 28 March 2026",
            timeString: "18:30 CET • Doors open 17:45 CET",
            venueName: "Smyrna Frihamnskyrkan",
            venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
            hall: "Sanctuary Floor - Central Nave",
            name: r.name,
            email: r.email,
            guests: r.guests || 1,
            church: r.church || undefined,
            checkedIn: Boolean(r.checkedIn),
            checkedInAt: r.checkedInAt ? r.checkedInAt.toISOString() : undefined,
            createdAt: r.createdAt.toISOString(),
          }));

          const seen = new Set<string>();
          const merged: TicketPass[] = [];
          for (const t of [...dbTickets, ...tickets]) {
            if (!seen.has(t.id)) {
              seen.add(t.id);
              merged.push(t);
            }
          }
          tickets = merged;
        }
      } catch (e) {
        console.warn("Prisma fetch tickets error:", e);
      }
    }

    return NextResponse.json({ success: true, tickets });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
