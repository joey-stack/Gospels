# 0001. Stack and UI Architecture for Gospels Platform

**Date**: 2026-10-21
**Status**: In Progress

## Summary

This decision sets the core technology stack for the Gospels Ministry Platform. We choose Next.js 15 with App Router, TypeScript, Tailwind CSS, Framer Motion, and Prisma with PostgreSQL. This foundation allows fast server rendering, secure server actions for events and prayer requests, and fluid editorial motion matching the Nordic Reverence design blueprint.

## Context

The Gospels platform serves the gospel music and church community across Gothenburg. The application needs high performance public pages for concerts and worship events, fast RSVP registration, partner church listings, and administrative tools.

The user experience requires an editorial aesthetic inspired by Scandinavian minimalism and the Reunion design benchmark. The previous design work in Google Stitch established rich tokens and responsive layouts. We must build clean, production ready components without copying messy raw HTML from the prototype export.

Key constraints:
1. No pure black (#000000) or pure white (#FFFFFF) backgrounds.
2. The word free must never appear in copy.
3. Interactive elements need accessible pill shapes and soft ambient shadows.
4. Data interactions like RSVP and prayer requests require reliable server validation.

## Requirements

**User stories**:
- As a worship attendee or choir member, I want to explore upcoming Gothenburg ministry events, listen to media, and register for seats smoothly on mobile or desktop.
- As a prayer seeker or partner church leader, I want to submit intercession requests and join the ecumenical covenant with immediate confirmation.
- As a ministry administrator, I want to create and manage events with clean server validation.

**Acceptance criteria**:
- **AC-1**: Next.js 15 App Router boots with strict TypeScript and runs with zero build errors.
- **AC-2**: Tailwind CSS configuration defines brand colors (brand-50, brand-400, brand-500, brand-600), neutral tones (grey-50, grey-900, slate-900), and font families (font-hanken, font-inter, font-eb).
- **AC-3**: Backgrounds use subtle tinted tones (surface #f8f9ff, slate-900 #0F172A), never pure white or pure black.
- **AC-4**: Pill shaped buttons (rounded-full) and rounded-2xl cards provide smooth hover states and focus rings.
- **AC-5**: Prisma schema models Event, RSVP, PrayerRequest, and VolunteerApplication entities with relations and timestamps.
- **AC-6**: Next.js 15 Server Actions validate inputs and return type safe status responses.
- **AC-7**: Framer Motion powers scroll reveals, smooth section fades, and card micro interactions.

## Options considered

### Option 1: Next.js 15 App Router, Tailwind CSS, Prisma, Framer Motion

Modern full stack React architecture with React Server Components, server actions, and type safe database queries.

**Pros**:
- Zero client bundle overhead for static marketing sections.
- Server actions eliminate separate API boilerplate for forms.
- Rich ecosystem support for Tailwind v3 and Framer Motion.

**Cons**:
- Requires careful handling of client versus server component boundaries for motion.

### Option 2: Vite SPA with React and Express API

A decoupled single page application with an independent Node backend.

**Pros**:
- Simple mental model for client side state.

**Cons**:
- Poor initial page load and search engine indexing for public concert pages.
- Extra operational overhead maintaining two separate servers.

## Decision

**Chosen option**: Option 1: Next.js 15 App Router, Tailwind CSS, Prisma, Framer Motion

We build Gospels as a unified Next.js 15 application. Server components render fast editorial layouts, while focused client islands provide Framer Motion transitions and interactive forms.

**Implementation skills**: `architect` (`jsmastery-pro/skills`, `.agents/skills/architect/`), `develop` (`jsmastery-pro/skills`, `.agents/skills/develop/`), `check` (`jsmastery-pro/skills`, `.agents/skills/check/`)

## Rationale

Next.js 15 provides ideal support for liturgical and ministry content. Pages like the Holy Spirit Worship event require fast static or cached server rendering for public visitors, combined with immediate server action execution for RSVPs. Tailwind CSS paired with custom font tokens and Framer Motion delivers the exact Scandinavian warmth and high craft feel demonstrated in the Stitch Nordic Reverence export.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript 5 | End to end type safety across components and server actions |
| Framework | Next.js 15 (App Router) | High performance server rendering, metadata, and server actions |
| Styling | Tailwind CSS v3 | Utility first design token implementation with custom extended theme |
| Motion | Framer Motion | Smooth scroll reveals, page transitions, and interactive hover states |
| Primary DB & ORM | PostgreSQL with Prisma ORM | Relational schema integrity for events, RSVPs, and prayer requests |
| Typography | Plus Jakarta Sans, Inter, EB Garamond | Modern clean editorial interface paired with classic liturgical serif |
| Icons | Lucide React | Clean, consistent vector iconography |

## Build plan

- [x] Task 1 (AC-1, AC-2, AC-3, AC-4): Scaffold Next.js 15 project and configure `tailwind.config.ts` with brand, grey, slate palettes, typography, and pill radius tokens.
- [x] Task 2 (AC-4, AC-7): Create core UI component library in `/components/ui/` (`Button`, `EventCard`, `GlobalHeader`, `Input`, `Textarea`, `SectionHeader`).
- [x] Task 3 (AC-5, AC-6): Set up Prisma schema with PostgreSQL models and implement Next.js 15 server actions (`submitRSVP`, `submitPrayerRequest`).
- [x] Task 4 (AC-1, AC-3, AC-7): Implement Homepage (`/`) with cinematic hero, mission strip, dark media section, and scripture testimonials.
- [x] Task 5 (AC-4, AC-6): Implement Event Detail RSVP page (`/events/holy-spirit-worship`) with overlapping details and interactive RSVP form.
- [ ] Task 6 (AC-4): Implement Events Listing page (`/events`) with category filter pills and responsive grid.
- [ ] Task 7 (AC-3, AC-7): Implement Partner Churches (`/partners`) and About Heritage (`/about/story`) pages.
- [ ] Task 8 (AC-5, AC-6): Implement Admin Event creation flow (`/admin/events/new`).

## Consequences

- All interactive motion components must declare the `"use client"` directive at top of file.
- Form submissions will use progressive enhancement through native form actions or transition hooks.
- Copy must be screened to ensure the prohibited word free never appears.
