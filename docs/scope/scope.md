# Scope: Gospels Platform

A sacred, modern digital platform for the Gospels Ministry Hub in Gothenburg, Sweden, connecting worshipers, choirs, partner churches, and community members through events, prayer, giving, and volunteer ministry.

**Build approach:** Tracer Bullet (vertical end to end slices, thin but complete through every layer).
**Workflow:** Beta (check verify, then test). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & UI Foundation | Foundation | in-progress |
| 2 | Component Architecture | Foundation | planned |
| 3 | Database & Server Actions | Foundation | planned |
| 4 | Homepage | Phase 1 Core | in-progress |
| 5 | Events Listing | Phase 1 Core | planned |
| 6 | Event Detail RSVP | Phase 1 Core | in-progress |
| 7 | Partner Churches | Phase 1 Core | planned |
| 8 | About & Heritage | Phase 1 Core | planned |
| 9 | Admin Create Event | Phase 1 Core | planned |

## Foundations

### 1. Stack & UI Foundation · in-progress
Lock the Next.js 15, Tailwind CSS, and Framer Motion stack, extracting the Nordic Reverence design tokens from Stitch into `tailwind.config.ts`.
**Done when:** `tailwind.config.ts` reflects the exact brand, grey, and slate tokens, and the project builds cleanly.
- [x] Decide the stack (spec): `/architect stack & UI foundation`
- [ ] Scaffold from the decision: `/develop stack & UI foundation`
- [ ] Smoke-check it runs: `/test`
Spec 0001 · code in `./`

### 2. Component Architecture
Refactor Stitch exports into a clean `/components/ui/` library benchmarked against the editorial Reunion standard.
**Done when:** `Button`, `EventCard`, `GlobalHeader`, `Input`, `Textarea`, and `SectionHeader` are implemented with pill shapes, micro-interactions, and accessibility.
- [ ] Design it (spec): `/architect component architecture`
- [ ] Build it: `/develop component architecture`
- [ ] Verify it: `/check verify component architecture`
- [ ] Test it: `/test component architecture`

### 3. Database & Server Actions
Set up Prisma models for Event, RSVP, PrayerRequest, and VolunteerApplication, plus Next.js 15 Server Actions.
**Done when:** Prisma schema is generated and `submitRSVP` and `submitPrayerRequest` validate and persist cleanly.
- [ ] Design it (spec): `/architect database & server actions`
- [ ] Build it: `/develop database & server actions`
- [ ] Verify it: `/check verify database & server actions`
- [ ] Test it: `/test database & server actions`

## Phase 1 Core

### 4. Homepage · in-progress
Cinematic full bleed hero with dark gradient overlay, Mission Strip 3-column grid, Dark Media section, and Scripture quotes in EB Garamond.
**Done when:** Homepage `/` renders responsive with scroll reveals, negative margin event card, and no pure white/black backgrounds.
- [x] Build it: `/develop homepage`
- [x] Verify it: `/check verify homepage`
- [ ] Test it: `/test homepage`
Spec 0001 · code in `app/page.tsx`, `components/home/`

### 5. Events Listing
Interactive events catalog with category pill filter bar and a 3-column grid of EventCards.
**Done when:** `/events` filters active events by ministry type with smooth layout transitions and responsive grid.
- [ ] Build it: `/develop events listing`
- [ ] Verify it: `/check verify events listing`
- [ ] Test it: `/test events listing`

### 6. Event Detail RSVP · in-progress
Event showcase page for Holy Spirit Worship with overlapping details bar and centered RSVP form.
**Done when:** `/events/holy-spirit-worship` submits via `submitRSVP` and displays the instant confirmation state.
- [x] Build it: `/develop event detail rsvp`
- [x] Verify it: `/check verify event detail rsvp`
- [ ] Test it: `/test event detail rsvp`
Spec 0001 · code in `app/events/holy-spirit-worship/page.tsx`, `components/events/`

### 7. Partner Churches
Ecumenical covenant and church directory highlighting Swedish fellowship churches.
**Done when:** `/partners` renders partner church cards, map/location context, and covenant registration call to action.
- [ ] Build it: `/develop partner churches`
- [ ] Verify it: `/check verify partner churches`
- [ ] Test it: `/test partner churches`

### 8. About & Heritage
Story page detailing the Gothenburg Gospel movement, choir roots, and ecumenical mission.
**Done when:** `/about/story` renders editorial storytelling, leadership choir profiles, and liturgical scripture callouts.
- [ ] Build it: `/develop about & heritage`
- [ ] Verify it: `/check verify about & heritage`
- [ ] Test it: `/test about & heritage`

### 9. Admin Create Event
Administrative dashboard event creation form with validation for dates, venues, and RSVP toggles.
**Done when:** `/admin/events/new` allows authorized ministry staff to publish an event with preview.
- [ ] Build it: `/develop admin create event`
- [ ] Verify it: `/check verify admin create event`
- [ ] Test it: `/test admin create event`

## Deferred
- **Swish QR Giving Flow**: Live BankID Swish payment integration · needs a decision · Beta
- **Volunteer Auditions**: Voice clip recording and conductor audition scoring · needs a decision · Beta
- **Choir Conductor Portal**: Live rehearsal attendance and vocal sheet music portal · needs a decision · Beta
- **NFC Volunteer Pass**: Digital backstage pass and attendance check in · needs a decision · Alpha

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`.
_Drafted by /scope, living document._
