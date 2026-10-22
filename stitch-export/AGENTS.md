# Stitch Export Reference

## Overview

The Stitch export folder contains reference screens, design tokens, and layout blueprints for the Gospels ministry platform. It serves as a visual and structural reference only, not for direct copy paste.

## Key files

| File | Owns |
|---|---|
| `nordic_reverence/DESIGN.md` | Nordic Reverence design tokens, color scales, typography definitions, and elevations |
| `screen_1_design_system_sheet/code.html` | Visual sheet showing master design elements, buttons, badges, and inputs |
| `screen_2_homepage/` | Structural layout reference for the homepage |
| `screen_3_events_listing/` | Events listing layout reference |
| `screen_4_holy_spirit_worship_event_page/` | Event detail RSVP layout reference |
| `screen_7_partner_churches/` | Partner churches layout reference |
| `screen_8_give/` | Kingdom giving layout reference |
| `screen_9_need_prayer/` | Prayer intercession layout reference |
| `screen_10_admin_dashboard/` | Admin suite layout reference |

## Conventions

- Use these files to extract exact grid layouts, visual hierarchy, and component relationships
- Refactor all markup into clean Tailwind CSS classes and modular React components
- Keep colors aligned with the Nordic Reverence palette and brand tokens

## Gotchas

- Code inside screen folders is generated unoptimized HTML and must never be imported or pasted directly into production Next.js components

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
