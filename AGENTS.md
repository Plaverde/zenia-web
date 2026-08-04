# Zenia Web

## Project

Professional website for Zenia Alvarez Gulfo, clinical psychologist in Monteria, Colombia. Next.js 16 App Router + Tailwind v4 + MariaDB + Prisma 7.9.1 + NextAuth v5 beta. Spanish-language site deployed to Vercel.

## Commands

```bash
cd zenia-web
npm run dev          # Dev server (requires XAMPP MariaDB on port 3306)
npm run build        # Production build (postbuild generates public/llms-full.txt)
npx tsc --noEmit     # Typecheck (more reliable than lint — spaces in path break ESLint on Windows)
npm run lint         # ESLint (may fail due to spaces in Windows path)
npm run db:push      # Push Prisma schema to MariaDB
npm run db:seed      # Seed FAQ + blog posts (prisma/seed.ts via tsx)
npm run db:studio    # Prisma Studio GUI
node scripts/seed-phase2.js  # Seed admin user + services (raw SQL via XAMPP mysql CLI)
```

No test framework is configured. Verify changes with `npx tsc --noEmit` then `npm run build`.

## Environment

XAMPP MariaDB required. Database: `zenia_db`. `.env` has two sets of DB vars:
- `DB_HOST`/`DB_PORT`/`DB_USER`/`DB_PASSWORD`/`DB_NAME` — used by runtime driver adapter
- `DATABASE_URL` — used by Prisma CLI

Both must be set. `NEXTAUTH_SECRET`/`AUTH_SECRET` for sessions.

Admin login: `admin@zenia.com` / `Z3n!a_S3gur@2025#Px`

**Password hash bug**: the seed script hashes via bcrypt and writes SQL to a file piped to mysql CLI. After seeding, always verify with `bcrypt.compareSync()`. If hash doesn't match, regenerate and re-insert (the `$` in bcrypt hashes break shell escaping — use file-based SQL, never inline).

## Architecture

Path alias: `@/*` → `./src/*`. Pages are server components by default; `"use client"` only where needed.

```
src/app/                  # Pages (App Router)
src/components/           # layout/Header, Footer; sections/ (10 section comps); ui/ (12 UI comps); WhatsAppButton, DoctoraliaWidget
src/lib/auth.ts           # NextAuth config — uses raw SQL ($queryRaw) because of MariaDB adapter
src/lib/db.ts             # Prisma singleton with MariaDB driver adapter
src/lib/constants.ts      # SITE (with [PLACEHOLDER]s), SERVICES, SPECIALTIES (11), SPECIALTY_CATEGORIES, BLOG_CATEGORIES, FAQS
src/lib/rate-limit.ts     # Generic Map-based rate limiter
src/middleware.ts          # Auth guard using getToken() from next-auth/jwt (NOT the auth() wrapper)
src/generated/prisma/     # Generated Prisma client
prisma/schema.prisma      # 8 models, no relations between them
```

Key public routes: `/` (homepage), `/terapia-online`, `/tarifas` (pricing + Doctoralia widget), `/especialidades/[slug]` (11 specialties, static params from constants), `/blog/[slug]` (SSR markdown via react-markdown), `/recursos` (hub), `/servicios`, `/sobre-mi`, `/contacto`, `/faq`, `/consentimiento-informado`, plus 4 legal pages.

Admin routes under `/admin/`: login, dashboard stats, blog CRUD, citas, pacientes, faq, testimonios, mensajes, servicios. Each has corresponding API routes under `/api/admin/`.

## Critical patterns

### Middleware does NOT use auth() wrapper
`src/middleware.ts` uses `getToken()` from `next-auth/jwt` directly. The `auth()` wrapper from NextAuth imports Prisma which uses `node:path`/`node:url` — these don't exist in Edge Runtime. Never change middleware back to `auth()` wrapper.

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
All "Agendar"/"Reservar" CTAs point to `https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo` (external). The `/tarifas` page embeds the Doctoralia widget via `src/components/DoctoraliaWidget.tsx` (client component that injects `platform.docplanner.com/js/widget.js` with a duplicate-guard). The Doctoralia profile URL is hardcoded in that component and in `Header.tsx`/`Footer.tsx` — update in all three if it changes.

## Quirks

- **Blog content** rendered via `react-markdown` + `rehype-sanitize` + `remark-gfm` (no dangerouslySetInnerHTML).
- **Specialties hardcoded** in `constants.ts` (11 items, 6 categories). Services are DB-driven with constants as fallback.
- **Slug uniqueness**: `uniqueSlug()` appends `-2`, `-3` on conflict. Regenerates on title change.
- **Image uploads**: `/api/upload` saves to `public/uploads/` (auth required, 5MB max, JPEG/PNG/WebP/GIF).
- **Sitemap is dynamic** (`src/app/sitemap.ts`) — pulls published blog posts + specialties from DB/constants. DB failure silently omits blog routes.
- **Postbuild**: `scripts/build-llms-full.js` generates `public/llms-full.txt` after each build.
- **Placeholders**: Professional data in `constants.ts` (NIT, REPS, colegiado, WhatsApp, email, tariff values) uses `[PLACEHOLDER]` format. Complete before production deploy.
- **BLOG_CATEGORIES** is NOT `as const` — Select component expects mutable `{ value: string; label: string }[]`.
- **Admin sidebar** label is "Recursos" (not "Blog"). Route path `/admin/blog` unchanged.
- **Session maxAge**: 7 days. `trustHost` removed. `debug` only in development.
- **Orphaned code**: `/api/reserve` route and `ConsentModal`/`ConsentCheckbox` UI comps still exist but are no longer wired to any page after the Doctoralia migration. Safe to remove if not repurposed for admin appointment management.
- **Mobile CTA bar**: Header renders a fixed bottom bar (WhatsApp + Agendar) on mobile (`md:hidden`). WhatsApp floating button is offset (`bottom-20` on mobile) to avoid overlapping it.

## Accessibility (WCAG AA)

- Primary color for text/links on light backgrounds is `sage-dark` (#5C8070), NOT `sage` (#7A9E8E) — the latter fails 4.5:1 contrast. `sage` is reserved for large text, backgrounds (`bg-sage/5`), and hover states.
- `warm-gray` is #595959 (darkened from #6B6B6B) to meet contrast on `ivory`/`white`.
- `<html>` carries `data-scroll-behavior="smooth"` so Next.js can disable smooth scroll during route transitions while keeping it for in-page anchor clicks.
- Focus outlines use `sage`; outline-offset 2px.

## Security

- Rate limiting on login: Map-based, 5 attempts per 15 min per email (`src/lib/rate-limit.ts`).
- Security headers in `next.config.ts`: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, X-XSS-Protection, Permissions-Policy.
- Middleware role check: only `admin` role can access `/admin/*` and `/api/admin/*`.
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
- `ConsentModal` (telepsicología consent) is currently orphaned — rewire if virtual-modality consent flow is restored.
