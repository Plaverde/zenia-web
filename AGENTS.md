# Zenia Web

## Project

Professional website for Zenia Alvarez Gulfo, clinical psychologist in Monteria, Colombia. Next.js 16 App Router + Tailwind v4 + MariaDB + Prisma 7.9.1 + NextAuth v5 beta. Spanish-language site deployed to Vercel.

## Commands

Run all commands from this repo root (`zenia-web/`). The parent folder (`ZENIA APLICACION WEB`) contains the project brief and is NOT part of this repo.

```bash
npm run dev          # Dev server (requires XAMPP MariaDB on port 3306)
npm run build        # Production build (postbuild generates public/llms-full.txt)
npx tsc --noEmit     # Typecheck (more reliable than lint — spaces in path break ESLint on Windows)
npm run lint         # ESLint (flat config via eslint .)
npm run db:push      # Push Prisma schema to MariaDB
npm run db:seed      # Seed FAQ + blog posts (prisma/seed.ts via tsx)
npm run db:studio    # Prisma Studio GUI
node scripts/seed-phase2.js  # Seed admin user + services (raw SQL via XAMPP mysql CLI)
npm test             # vitest run (37 tests: 22 scoring + 15 screening flow)
npm run test:watch   # vitest watch mode
```

vitest is configured (`vitest.config.ts` + `vitest.setup.ts`). `npm test` runs
`vitest run` — 37 tests across `src/lib/instruments/__tests__/scoring.test.ts`
and `src/components/screening/__tests__/flow.test.tsx`. Still verify with
`npx tsc --noEmit` and `npm run build`; a vitest configLoader ESM/CJS warning
is non-blocking.

## Environment

XAMPP MariaDB required. Database: `zenia_db`. `.env` has two sets of DB vars:
- `DB_HOST`/`DB_PORT`/`DB_USER`/`DB_PASSWORD`/`DB_NAME` — used by runtime driver adapter
- `DATABASE_URL` — used by Prisma CLI

Both must be set. `NEXTAUTH_SECRET`/`AUTH_SECRET` for sessions.

Admin login: `admin@zenia.com` (password comes from the `ADMIN_PASSWORD` env var, seeded via `scripts/seed-phase2.js`; do not commit credentials)

**Password hash bug**: the seed script hashes via bcrypt and writes SQL to a file piped to mysql CLI. After seeding, always verify with `bcrypt.compareSync()`. If hash doesn't match, regenerate and re-insert (the `$` in bcrypt hashes break shell escaping — use file-based SQL, never inline).

## Architecture

Path alias: `@/*` → `./src/*`. Pages are server components by default; `"use client"` only where needed.

```
src/app/                  # Pages (App Router)
src/components/           # layout/Header, Footer; sections/ (10 section comps); ui/ (12 UI comps); WhatsAppButton, DoctoraliaWidget
src/components/screening/ # Self-screening flow (/autoevaluacion): Intro, ScaleSelect, ConsentStep, QuestionStep, SafetyScreen, ResultScreen, LeadForm
src/lib/auth.ts           # NextAuth config — uses raw SQL ($queryRaw) because of MariaDB adapter
src/lib/db.ts             # Prisma singleton with MariaDB driver adapter
src/lib/constants.ts      # SITE (with [PLACEHOLDER]s), SERVICES, SPECIALTIES (11), SPECIALTY_CATEGORIES, BLOG_CATEGORIES, FAQS
src/lib/rate-limit.ts     # Generic Map-based rate limiter
src/lib/instruments/      # Immutable official PHQ-9/GAD-7 items + pure scoring (scorePhq9, scoreGad7, isSuicideRisk)
src/lib/safety-resources.ts # Editable emergency lines per region (CO: 123, 106, 125)
src/proxy.ts            # Auth guard using getToken() from next-auth/jwt (NOT the auth() wrapper)
src/generated/prisma/     # Generated Prisma client
prisma/schema.prisma      # 8 models, no relations between them
```

Key public routes: `/` (homepage), `/terapia-online`, `/tarifas` (pricing + Doctoralia widget), `/especialidades/[slug]` (11 specialties, static params from constants), `/blog/[slug]` (SSR markdown via react-markdown), `/recursos` (hub), `/servicios`, `/sobre-mi`, `/contacto`, `/faq`, `/consentimiento-informado`, `/autoevaluacion` (self-screening, see Compliance), plus 4 legal pages.

Admin routes under `/admin/`: login, dashboard stats, blog CRUD, citas, pacientes, faq, testimonios, mensajes, servicios. Each has corresponding API routes under `/api/admin/`.

## Critical patterns

### Proxy does NOT use auth() wrapper
`src/proxy.ts` uses `getToken()` from `next-auth/jwt` directly. The `auth()` wrapper from NextAuth imports Prisma which uses `node:path`/`node:url` — these don't exist in Edge Runtime. Never change proxy back to `auth()` wrapper. (Next.js 16 convention: `middleware` was renamed to `proxy`; proxy runs on the Node.js runtime.)

### Admin fetch must check res.ok
Every `fetch()` call in admin pages must check `res.ok` before calling `res.json()`. Without this, error responses (401, 500) get stored as data and `.map()` crashes:
```ts
const res = await fetch("/api/admin/services");
if (!res.ok) throw new Error("Error");
const data = await res.json();
setServices(data);
```

### Auth uses raw SQL
`$queryRaw` and `$executeRaw` in `src/lib/auth.ts` — MariaDB adapter doesn't support Prisma's standard auth helpers. If you change auth queries, use raw SQL tagged templates, not Prisma client methods.

### Button supports external links
`src/components/ui/Button.tsx` auto-detects `href` starting with `http://`/`https://`/`//` and renders an `<a target="_blank" rel="noopener noreferrer">` instead of a Next.js `<Link>`. Pass external URLs directly; no need to hand-roll `<a>` tags for CTA buttons.

### Reservations go through Doctoralia
All "Agendar"/"Reservar" CTAs point to `https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo` (external). The `/tarifas` page embeds the Doctoralia widget via `src/components/DoctoraliaWidget.tsx` (client component that injects `platform.docplanner.com/js/widget.js` with a duplicate-guard). **The profile URL is a hardcoded literal in 10 files** (Hero, CTASection, ServicesGrid, terapia-online ×2, servicios ×2, blog/[slug], sobre-mi, especialidades/[slug]) plus the `DOCTORALIA_URL`/`DOCTORALIA_PROFILE` consts in `Header.tsx`, `Footer.tsx`, `DoctoraliaWidget.tsx`. If it changes, search the whole `src/` for `doctoralia.co/perfil` — do not rely on the three consts alone.

## Quirks

- **Blog content** rendered via `react-markdown` + `rehype-sanitize` + `remark-gfm` (no dangerouslySetInnerHTML).
- **Specialties hardcoded** in `constants.ts` (11 items, 6 categories). Services are DB-driven with constants as fallback.
- **Slug uniqueness**: `uniqueSlug()` appends `-2`, `-3` on conflict. Regenerates on title change.
- **Image uploads**: `/api/upload` saves to `public/uploads/` (auth required, 5MB max, JPEG/PNG/WebP/GIF).
- **Sitemap is dynamic** (`src/app/sitemap.ts`) — pulls published blog posts + specialties from DB/constants. DB failure silently omits blog routes.
- **Postbuild**: `scripts/build-llms-full.js` generates `public/llms-full.txt` after each build.
- **Placeholders**: Real professional data is still missing, marked as `[PLACEHOLDER]` strings across several files: `constants.ts` SITE (phone, email, colegiado, REPS), `tarifas/page.tsx` (`[VALOR_SESIÓN]`, `[VALOR_PAREJA]`), `sobre-mi/page.tsx` (`[UNIVERSIDAD]`, `[ESPECIALIZACIÓN]`, foto), `Footer.tsx` (`[NIT_O_DNI]`), `contacto/page.tsx` (mapa), `ProfessionalProfile.tsx`/`AboutPreview.tsx` (foto), `ArticlesPreview.tsx` + blog pages (imagen de artículo). Search `\[[A-Z_Á-Ú]` in `src/` to find them all. Do not invent these values.
- **Provisional Vercel URL**: `https://zenia-web.vercel.app` is hardcoded in 3 places — `src/app/sitemap.ts` (`baseUrl`), `src/app/layout.tsx` (`metadataBase` + Psychologist schema), `src/app/robots.ts` (sitemap URL). Update all three when a real domain is configured.
- **BLOG_CATEGORIES** is NOT `as const` — Select component expects mutable `{ value: string; label: string }[]`.
- **Admin sidebar** label is "Recursos" (not "Blog"). Route path `/admin/blog` unchanged.
- **Session maxAge**: 7 days. `trustHost` removed. `debug` only in development.

- **Mobile CTA bar**: Header renders a fixed bottom bar (WhatsApp + Agendar) on mobile (`md:hidden`). WhatsApp floating button is offset (`bottom-20` on mobile) to avoid overlapping it.

## Accessibility (WCAG AA)

- Primary color for text/links on light backgrounds is `sage-dark` (#5C8070), NOT `sage` (#7A9E8E) — the latter fails 4.5:1 contrast. `sage` is reserved for large text, backgrounds (`bg-sage/5`), and hover states.
- `warm-gray` is #595959 (darkened from #6B6B6B) to meet contrast on `ivory`/`white`.
- `<html>` carries `data-scroll-behavior="smooth"` so Next.js can disable smooth scroll during route transitions while keeping it for in-page anchor clicks.
- Focus outlines use `sage`; outline-offset 2px.

## Security

- Rate limiting (Map-based, `src/lib/rate-limit.ts`): login 5 attempts/15 min per email; `/api/contact` and `/api/lead` 10 requests/15 min per IP.
- Security headers in `next.config.ts`: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, X-XSS-Protection, Permissions-Policy.
- Proxy role check: only `admin` role can access `/admin/*` and `/api/admin/*`.
- Password must be re-seeded after deploy: `node scripts/seed-phase2.js`.

## Design System

Tailwind v4 custom theme in `src/app/globals.css`:
- Colors: `ivory` (#FAF7F2), `sage` (#7A9E8E), `sage-dark` (#5C8070), `terracotta` (#C4956A), `sand` (#E8DFD0), `charcoal` (#2D2D2D), `warm-gray` (#595959)
- Fonts via `next/font/google`: `Instrument Serif` (headings), `Inter` (body)
- CTA sections use `bg-sage-dark` (not `bg-sage`) for white-text contrast.

## Legal Compliance

Colombian health data regulations (Ley 2460/2025, Ley 1616/2013) baked into components:
- `EmergencyBanner` + `BlogDisclaimer` — on blog posts touching anxiety/depression/crisis
- Footer: legal ID placeholders, emergency numbers (Línea 106 Salud Mental, 123 Emergencias, SAMU 125), rights & duties link
- Contact form (`/contacto`) and triage form (homepage `TriageAssistant`) include data treatment consent checkbox
- 4 static legal pages: aviso-privacidad, politica-datos, derechos-personas, terminos-de-uso

### Self-screening `/autoevaluacion` compliance design
- **Local-only scoring**: answers live in React state only; scores computed client-side via pure fns in `src/lib/instruments/`. No clinical answers or scores are sent to the server, written to localStorage, appended to the URL, or sent to analytics (covered by tests).
- **No clinical data persisted**: nothing about the screening is stored server-side. The only server call is the *optional* lead form (`POST /api/lead`, rate-limited 10/15min per IP), which stores only contact/marketing fields in `patients_leads` (full_name, phone, email optional, preferred_modality, preferred_contact, marketing_consent). See `PRIVACY-IMPLEMENTATION.md`, `CLINICAL-DISCLAIMER.md`, `TESTING-CHECKLIST.md`.
- **Safety screen**: PHQ-9 item 9 > 0 triggers a crisis screen with emergency lines (123/106/125) before results.
- **Orientative only**: results and copy always say "orientativo", never "diagnóstico" (Ley 2460/2025, no guaranteed results, no stigmatization).
- The telepsicología `ConsentModal` was **removed** (file deleted from the working tree); consent is now handled inside the screening flow (`ConsentStep.tsx`). Rewire a modal only if a separate virtual-modality consent flow is restored.
