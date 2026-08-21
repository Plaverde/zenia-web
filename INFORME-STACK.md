# Informe de Stack Técnico — Zenia Web

Sitio web profesional de Zenia Álvarez Gulfo, psicóloga clínica en Montería, Córdoba, Colombia.
Informe generado el 21 de agosto de 2026 con base en el código real del repositorio.

---

## 1. Resumen general

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.3.1 |
| Lenguaje | TypeScript | 5.x |
| UI de base | React + React DOM | 19.2.8 |
| Estilos | Tailwind CSS (vía PostCSS) | 4.x |
| Base de datos | MariaDB (XAMPP local, puerto 3306) | 3.5.3 (driver) |
| ORM | Prisma (driver adapter MariaDB) | 7.9.1 |
| Autenticación | NextAuth v5 (beta) + bcryptjs | 5.0.0-beta.32 |
| Validación | Zod | 4.4.3 |
| Tests | Vitest + Testing Library | 4.1.11 |
| Lint | ESLint (flat config) + eslint-config-next | 9.x |
| Despliegue | Vercel (`https://zenia-web.vercel.app`, provisional) | — |

---

## 2. Frontend

- **Next.js 16 App Router**: páginas como Server Components por defecto; `"use client"` solo donde hace falta (formularios, widgets, flujo de autoevaluación).
- **Turbopack** como bundler de desarrollo.
- **Tailwind CSS v4** con tema personalizado definido en `src/app/globals.css` mediante tokens semánticos (`--color-*`). Los nombres de token se conservaron de la paleta original, pero sus valores actuales son la paleta de marca aprobada:
  - `ivory` → `#ede6dc` (crema, fondo base)
  - `sage` / `terracotta` → `#c97b5d` (cobre, acentos)
  - `sage-dark` / `charcoal` → `#2c3e50` (azul pizarra, color primario)
  - `terracotta-dark` → `#9d5036` (cobre oscuro)
  - `sand` → `#ddd2c2`, `warm-gray` → `#5a6068`
- **Tipografía** con `next/font/google`: *Instrument Serif* para titulares e *Inter* para cuerpo/UI.
- **Componentes propios**: 10 componentes de sección (`src/components/sections/`), 12 de UI (`src/components/ui/`), layout (Header con barra móvil fija de CTAs, Footer legal), botón flotante de WhatsApp y widget de Doctoralia.
- **Toasts** con `sonner`.
- **Accesibilidad WCAG AA**: contraste verificado por token, foco visible con outline, targets táctiles ≥44px, navegación mobile-first.

## 3. Contenido dinámico y markdown

- Blog renderizado con `react-markdown` + `remark-gfm` + `rehype-sanitize` (sin `dangerouslySetInnerHTML`).
- Especialidades hardcodeadas en `src/lib/constants.ts` (11 especialidades, 6 categorías); servicios leídos de la base de datos con fallback a constantes.
- Slugs únicos con sufijo incremental (`-2`, `-3`) al haber conflictos.

## 4. Base de datos

- **Motor**: MariaDB sobre XAMPP en desarrollo; base `zenia_db`.
- **ORM**: Prisma 7 con *driver adapters* (`@prisma/adapter-mariadb`); cliente generado en `src/generated/prisma`.
- **Esquema** (`prisma/schema.prisma`, provider `mysql`): 8 modelos sin relaciones entre ellos — separación deliberada entre capas de marketing/reservas/contacto/contenido:
  - `admin_users` — usuarios del panel (hash bcrypt, rol)
  - `patients_leads` — leads comerciales (con `marketing_consent`)
  - `appointments` — reservas/citas
  - `contact_messages` — mensajes de contacto (con consentimiento)
  - `services` — servicios (precio nullable → "Consultar valor")
  - `testimonials` — testimonios
  - `blog_posts` — artículos (SEO metadata incluida)
  - `faq_items` — preguntas frecuentes
- **Decisión de cumplimiento**: no hay capa de datos clínicos; la autoevaluación no persiste respuestas ni puntajes (ver §7).
- Semillas: `npm run db:seed` (FAQ + blog vía Prisma/tsx) y `node scripts/seed-phase2.js` (admin + servicios vía SQL crudo por CLI de MySQL/XAMPP).

## 5. Autenticación y seguridad

- **NextAuth v5 (beta)** con adaptador Prisma; configuración en `src/lib/auth.ts` usando **SQL crudo (`$queryRaw`)** porque el adaptador MariaDB no soporta los helpers estándar de auth de Prisma.
- **Guardia de rutas** en `src/proxy.ts` (convención proxy de Next.js 16, ex-`middleware.ts`) con `getToken()` de `next-auth/jwt` — nunca el wrapper `auth()`, que arrastra Prisma al runtime Edge. Solo el rol `admin` accede a `/admin/*` y `/api/admin/*`.
- Sesiones de 7 días; contraseñas con hash **bcryptjs**.
- **Rate limiting** propio (`src/lib/rate-limit.ts`, basado en Map): login 5 intentos/15 min por email; `/api/contact` y `/api/lead` 10 req/15 min por IP.
- **Cabeceras de seguridad** en `next.config.ts`: CSP (con excepciones mínimas para el widget Doctoralia), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy (cámara/mic/geolocalización bloqueadas).
- Sin PII en logs de autenticación; credenciales fuera del repositorio (variables de entorno).

## 6. Integraciones externas

- **Doctoralia** (Docplanner): todas las CTAs "Agendar/Reservar" apuntan al perfil público; `/tarifas` embebe el widget oficial (`platform.docplanner.com`). URL del perfil aparece como literal en ~10 archivos — buscar `doctoralia.co/perfil` en todo `src/` si cambia.
- **WhatsApp**: botón flotante + barra móvil fija (enlace pendiente de número real, `[NUMERO_DE_WHATSAPP]`).

## 7. Módulo de autoevaluación (/autoevaluacion)

- Instrumentos oficiales **PHQ-9 y GAD-7** como datos inmutables en `src/lib/instruments/` con funciones puras de puntaje (`scorePhq9`, `scoreGad7`, `isSuicideRisk`).
- Flujo: Intro → Selección de escala → Consentimiento → Preguntas → Tamizaje de crisis (ítem 9 del PHQ-9) → Resultado (+ formulario opcional de lead).
- **Privacidad por diseño**: respuestas y puntajes viven solo en estado de React (cliente); nada clínico viaja al servidor, ni se persiste, ni va a analytics. Única llamada de red: `POST /api/lead` (opcional, rate-limited) que guarda solo campos de contacto/marketing.
- Recursos de crisis editables en `src/lib/safety-resources.ts` (líneas Colombia: 123, 106, 125).
- Cobertura: 37 tests (22 de puntaje + 15 del flujo) con Vitest + Testing Library.

## 8. SEO y cumplimiento normativo

- Metadata API de Next.js con `metadataBase`; sitemap **dinámico** (`sitemap.ts`, incluye blog publicado y especialidades), `robots.ts`, URLs limpias.
- JSON-LD: schemas Person/Psychologist, Article, FAQPage según página.
- Postbuild: `scripts/build-llms-full.js` genera `public/llms-full.txt`.
- **Normativa colombiana**: Ley 2460/2025 y Ley 1581/2012 reflejadas en consentimiento explícito en formularios, disclaimers clínicos en blog (`EmergencyBanner`, `BlogDisclaimer`), lenguaje orientativo (nunca "diagnóstico"), 4 páginas legales estáticas (aviso de privacidad, política de datos, derechos de las personas, términos de uso) y números de emergencia en footer.
- Documentos de soporte: `PRIVACY-IMPLEMENTATION.md`, `CLINICAL-DISCLAIMER.md`, `TESTING-CHECKLIST.md`.

## 9. Rutas principales

- **Públicas**: `/`, `/terapia-online`, `/tarifas`, `/especialidades/[slug]`, `/blog/[slug]`, `/recursos`, `/servicios`, `/sobre-mi`, `/contacto`, `/faq`, `/consentimiento-informado`, `/autoevaluacion` + 4 legales.
- **Admin**: login, dashboard, blog CRUD, citas, pacientes, FAQ, testimonios, mensajes, servicios — cada una con sus API bajo `/api/admin/`.

## 10. Comandos de desarrollo

```bash
npm run dev          # Servidor de desarrollo (requiere MariaDB/XAMPP en 3306)
npm run build        # Build de producción (+ genera llms-full.txt)
npm run db:push      # Sincronizar esquema Prisma → MariaDB
npm run db:seed      # Seed de FAQ y blog
npm run db:studio    # Prisma Studio (GUI de datos)
npm test             # Vitest (37 tests)
npx tsc --noEmit     # Typecheck (más fiable que lint en Windows/ruta con espacios)
```

## 11. Estado actual y pendientes conocidos

- **Desplegado** en Vercel con dominio provisional `zenia-web.vercel.app` (hardcodeado en `sitemap.ts`, `layout.tsx` y `robots.ts` — actualizar al tener dominio real).
- **Placeholders pendientes**: número de WhatsApp, email, colegiado COLPSIC, REPS, NIT/DNI, universidad/especialización, tarifas específicas, mapa, fotografías profesionales.
- **Deuda menor de accesibilidad**: variante secondary de `Button.tsx` usa `bg-terracotta text-white` (3.2:1, bajo AA) y anillo de foco genérico `outline-sage` — cambio de 1 línea cada uno.
- **Documentación por actualizar** con la paleta nueva: sección Design System de AGENTS.md aún muestra los hex antiguos.
