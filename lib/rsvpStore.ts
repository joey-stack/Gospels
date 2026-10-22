import fs from "fs";
import path from "path";

export interface TicketPass {
  id: string; // e.g. "HSW26-NAV-8842"
  eventId: string; // "holy-spirit-worship-2026"
  eventTitle: string; // "Holy Spirit Worship 2026"
  eventSubtitle: string; // "Night of Adoration & Gospel Praise"
  dateString: string; // "Saturday, 28 March 2026"
  timeString: string; // "18:30 CET • Doors open 17:45 CET"
  venueName: string; // "Smyrna Frihamnskyrkan"
  venueAddress: string; // "Frihamnsgatan 20, 417 55 Göteborg"
  hall: string; // "Sanctuary Floor - Central Nave"
  name: string;
  email: string;
  guests: number;
  church?: string;
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
}

// Initial realistic seed tickets for Gothenburg Hub
const SEED_TICKETS: TicketPass[] = [
  {
    id: "HSW26-NAV-0418",
    eventId: "holy-spirit-worship-2026",
    eventTitle: "Holy Spirit Worship 2026",
    eventSubtitle: "Night of Adoration & Gospel Praise",
    dateString: "Saturday, 28 March 2026",
    timeString: "18:30 CET • Doors open 17:45 CET",
    venueName: "Smyrna Frihamnskyrkan",
    venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
    hall: "Sanctuary Floor - Central Nave",
    name: "Astrid Lindgren",
    email: "astrid.lindgren@kyrka.se",
    guests: 2,
    church: "Smyrna Göteborg",
    checkedIn: true,
    checkedInAt: "2026-03-28T17:50:12Z",
    createdAt: "2026-03-15T10:14:00Z",
  },
  {
    id: "HSW26-NAV-1092",
    eventId: "holy-spirit-worship-2026",
    eventTitle: "Holy Spirit Worship 2026",
    eventSubtitle: "Night of Adoration & Gospel Praise",
    dateString: "Saturday, 28 March 2026",
    timeString: "18:30 CET • Doors open 17:45 CET",
    venueName: "Smyrna Frihamnskyrkan",
    venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
    hall: "Sanctuary Floor - Central Nave",
    name: "Lukas Bergström",
    email: "lukas.bergstrom@hillsong.se",
    guests: 1,
    church: "Hillsong Göteborg",
    checkedIn: false,
    createdAt: "2026-03-18T14:22:00Z",
  },
  {
    id: "HSW26-BAL-2301",
    eventId: "holy-spirit-worship-2026",
    eventTitle: "Holy Spirit Worship 2026",
    eventSubtitle: "Night of Adoration & Gospel Praise",
    dateString: "Saturday, 28 March 2026",
    timeString: "18:30 CET • Doors open 17:45 CET",
    venueName: "Smyrna Frihamnskyrkan",
    venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
    hall: "Balcony East Gallery",
    name: "Miriam Ndayizeye",
    email: "miriam.ndayizeye@gospel.se",
    guests: 3,
    church: "Betlehemskyrkan",
    checkedIn: true,
    checkedInAt: "2026-03-28T18:02:44Z",
    createdAt: "2026-03-19T09:40:00Z",
  },
  {
    id: "HSW26-NAV-3450",
    eventId: "holy-spirit-worship-2026",
    eventTitle: "Holy Spirit Worship 2026",
    eventSubtitle: "Night of Adoration & Gospel Praise",
    dateString: "Saturday, 28 March 2026",
    timeString: "18:30 CET • Doors open 17:45 CET",
    venueName: "Smyrna Frihamnskyrkan",
    venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
    hall: "Sanctuary Floor - Central Nave",
    name: "Elias Lindgren",
    email: "elias.lindgren@svenskakyrkan.se",
    guests: 2,
    church: "Domkyrkan Göteborg",
    checkedIn: false,
    createdAt: "2026-03-20T11:05:00Z",
  },
  {
    id: "HSW26-CHO-4911",
    eventId: "holy-spirit-worship-2026",
    eventTitle: "Holy Spirit Worship 2026",
    eventSubtitle: "Night of Adoration & Gospel Praise",
    dateString: "Saturday, 28 March 2026",
    timeString: "18:30 CET • Doors open 17:45 CET",
    venueName: "Smyrna Frihamnskyrkan",
    venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
    hall: "Choir Platform Section B",
    name: "Hannah Samuelsson",
    email: "hannah.samuelsson@gmail.com",
    guests: 1,
    church: "Pingstkyrkan Västra Frölunda",
    checkedIn: false,
    createdAt: "2026-03-21T16:30:00Z",
  },
];

// Persistent file path
const DATA_DIR = path.join(process.cwd(), "data");
const TICKETS_FILE = path.join(DATA_DIR, "tickets.json");

// In-memory cache for fast responsive lookups
let inMemoryTickets: TicketPass[] | null = null;

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(TICKETS_FILE)) {
      fs.writeFileSync(TICKETS_FILE, JSON.stringify(SEED_TICKETS, null, 2), "utf-8");
      inMemoryTickets = [...SEED_TICKETS];
    }
  } catch (err) {
    console.warn("Unable to write tickets.json to filesystem, using memory cache", err);
    if (!inMemoryTickets) {
      inMemoryTickets = [...SEED_TICKETS];
    }
  }
}

function loadTickets(): TicketPass[] {
  if (inMemoryTickets) return inMemoryTickets;
  ensureDataFile();
  try {
    if (fs.existsSync(TICKETS_FILE)) {
      const raw = fs.readFileSync(TICKETS_FILE, "utf-8");
      inMemoryTickets = JSON.parse(raw);
      return inMemoryTickets || SEED_TICKETS;
    }
  } catch {
    inMemoryTickets = [...SEED_TICKETS];
  }
  return inMemoryTickets || SEED_TICKETS;
}

function saveTickets(tickets: TicketPass[]) {
  inMemoryTickets = tickets;
  ensureDataFile();
  try {
    fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to persist tickets to disk, saved in memory", err);
  }
}

export function getAllTickets(): TicketPass[] {
  return loadTickets();
}

export function getTicketById(id: string): TicketPass | null {
  const tickets = loadTickets();
  const normalizedId = id.trim().toUpperCase();
  const found = tickets.find(
    (t) => t.id.toUpperCase() === normalizedId || t.id.replace(/-/g, "").toUpperCase() === normalizedId.replace(/-/g, "")
  );
  return found || null;
}

export function registerTicket(params: {
  name: string;
  email: string;
  guests?: number;
  church?: string;
  eventId?: string;
  eventTitle?: string;
}): TicketPass {
  const tickets = loadTickets();
  
  // Format unique human-readable ticket code e.g. HSW26-NAV-8492
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `HSW26-NAV-${randomNum}`;

  const newTicket: TicketPass = {
    id: ticketId,
    eventId: params.eventId || "holy-spirit-worship-2026",
    eventTitle: params.eventTitle || "Holy Spirit Worship 2026",
    eventSubtitle: "Night of Adoration & Gospel Praise",
    dateString: "Saturday, 28 March 2026",
    timeString: "18:30 CET • Doors open 17:45 CET",
    venueName: "Smyrna Frihamnskyrkan",
    venueAddress: "Frihamnsgatan 20, 417 55 Göteborg",
    hall: "Sanctuary Floor - Central Nave",
    name: params.name,
    email: params.email,
    guests: params.guests && params.guests > 0 ? params.guests : 1,
    church: params.church || "Gothenburg Fellowship",
    checkedIn: false,
    createdAt: new Date().toISOString(),
  };

  tickets.unshift(newTicket);
  saveTickets(tickets);
  return newTicket;
}

export function checkInTicket(id: string): {
  success: boolean;
  status: "CHECKED_IN_NOW" | "ALREADY_CHECKED_IN" | "NOT_FOUND";
  message: string;
  ticket?: TicketPass;
} {
  const tickets = loadTickets();
  const normalizedId = id.trim().toUpperCase();
  const index = tickets.findIndex(
    (t) => t.id.toUpperCase() === normalizedId || t.id.replace(/-/g, "").toUpperCase() === normalizedId.replace(/-/g, "")
  );

  if (index === -1) {
    return {
      success: false,
      status: "NOT_FOUND",
      message: `Ticket "${id}" not found in registered attendee database.`,
    };
  }

  const ticket = tickets[index];

  if (ticket.checkedIn) {
    return {
      success: false,
      status: "ALREADY_CHECKED_IN",
      message: `Ticket already admitted at ${new Date(ticket.checkedInAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      ticket,
    };
  }

  const updatedTicket: TicketPass = {
    ...ticket,
    checkedIn: true,
    checkedInAt: new Date().toISOString(),
  };

  tickets[index] = updatedTicket;
  saveTickets(tickets);

  return {
    success: true,
    status: "CHECKED_IN_NOW",
    message: `Attendee ${ticket.name} (${ticket.guests} seat${ticket.guests > 1 ? "s" : ""}) successfully admitted.`,
    ticket: updatedTicket,
  };
}

export function undoCheckInTicket(id: string): { success: boolean; ticket?: TicketPass } {
  const tickets = loadTickets();
  const normalizedId = id.trim().toUpperCase();
  const index = tickets.findIndex(
    (t) => t.id.toUpperCase() === normalizedId || t.id.replace(/-/g, "").toUpperCase() === normalizedId.replace(/-/g, "")
  );

  if (index === -1) return { success: false };

  const updatedTicket: TicketPass = {
    ...tickets[index],
    checkedIn: false,
    checkedInAt: undefined,
  };

  tickets[index] = updatedTicket;
  saveTickets(tickets);
  return { success: true, ticket: updatedTicket };
}
