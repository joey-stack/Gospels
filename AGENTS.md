# Gospels

## Stack

- **Language / Runtime**: TypeScript, Node.js 20+
- **Framework**: Next.js 15 App Router
- **Key dependencies**: Tailwind CSS, Framer Motion, Prisma, PostgreSQL
- **Package manager**: npm

## Build approach

Tracer Bullet (vertical end to end slices, thin but complete through every layer)

## Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Test
npm test
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Rules

- Follow clean Tailwind CSS and JSM component architecture
- Local Stitch export is a structural blueprint only, never copy paste raw code
- Never use the word free in any copy
- Do not use pure black (#000000) or pure white (#FFFFFF) for backgrounds
- Border radius: Subtle, architectural, refined border radius only (rounded-md to rounded-lg, 6px-10px max). Never use bubbly rounded-2xl, rounded-3xl, or rounded-full pills for buttons, cards, or navbars
- Use Framer Motion for scroll reveals, smooth transitions, and hover states
- Brand palette: brand-50 (#F0FDFA), brand-400 (#2DD4BF), brand-500 (#14B8A6), brand-600 (#0D9488)
- Neutral palette: grey-50 (#F9FAFB), grey-900 (#111827), slate-900 (#0F172A)
- Typography: font-hanken for headings, font-inter for body, font-eb for scripture and quotes
- Layout width: Full-width edge-to-edge layout for all sections and screens (no restrictive max-w-7xl). Outer padding left and right is strictly 10px (px-2.5) on mobile and 20px (sm:px-5) on desktop, matching Morrow Church. Hero section is styled as a rounded card with 10px/20px padding around it.

## Agent skills

- [architect](.agents/skills/architect/): `jsmastery-pro/skills`, technical decision making and build specs in docs/specs/
- [audit](.agents/skills/audit/): `jsmastery-pro/skills`, context bootstrapping and AGENTS.md maintenance
- [check](.agents/skills/check/): `jsmastery-pro/skills`, behavior verification and code review
- [debug](.agents/skills/debug/): `jsmastery-pro/skills`, root cause investigation and minimal bug fixes
- [develop](.agents/skills/develop/): `jsmastery-pro/skills`, feature implementation from approved specs
- [document](.agents/skills/document/): `jsmastery-pro/skills`, release notes and documentation
- [github](.agents/skills/github/): repository, pull request, and release management via gh and MCP
- [scope](.agents/skills/scope/): `jsmastery-pro/skills`, product slice and scope planning in docs/scope/
- [sync](.agents/skills/sync/): `jsmastery-pro/skills`, documentation reconciliation after changes
- [test](.agents/skills/test/): `jsmastery-pro/skills`, test suite authoring and execution
MCP servers: stitch, github (configured)

## Context files

- [stitch-export/AGENTS.md](stitch-export/AGENTS.md): Stitch export design tokens, layout hierarchy, and reference screens (linked from `C:\Users\user\Desktop\stitch_gospels_ministry_ui_design_system` as the permanent blueprint reference)

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
