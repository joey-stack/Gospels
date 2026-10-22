import { NextRequest, NextResponse } from "next/server";
import { getTicketById, checkInTicket, undoCheckInTicket } from "@/lib/rsvpStore";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get("ticket") || searchParams.get("code") || "";

  if (!ticketId) {
    return NextResponse.json({ success: false, message: "Missing ticket parameter" }, { status: 400 });
  }

  const ticket = getTicketById(ticketId);
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
    const { ticketId, action } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "Missing ticketId" }, { status: 400 });
    }

    if (action === "undo") {
      const result = undoCheckInTicket(ticketId);
      return NextResponse.json(result);
    }

    const result = checkInTicket(ticketId);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
