import { NextResponse } from "next/server";
import { getAllTickets } from "@/lib/rsvpStore";

export async function GET() {
  try {
    const tickets = getAllTickets();
    return NextResponse.json({ success: true, tickets });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
