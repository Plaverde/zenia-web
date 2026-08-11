# Implementación de privacidad y protección de datos

Documento técnico que describe **qué hace el sitio en la práctica** frente al
tratamiento de datos personales y datos sensibles, según la implementación
actual. No es una declaración de cumplimiento legal: ver la sección
[Revisión legal pendiente](#revisión-legal-pendiente) para lo que un abogado o
delegado de protección de datos (DPO) debe validar.

## 1. Minimización de datos

El sitio sigue el principio de minimización: solo se solicitan los datos
estrictamente necesarios para cada finalidad.

### Formulario de contacto (`/contacto` → `POST /api/contact`)
- Campos: `name`, `email`, `phone` (opcional), `message` (opcional), `consent`.
- Sin consentimiento (`consent: false`) la API rechaza la solicitud con 400.
- Se persiste en la tabla `contact_messages` (`prisma.contact_messages`).
- Validación con Zod en `src/app/api/contact/route.ts`.

### Formulario de lead de la autoevaluación (`/autoevaluacion` → `POST /api/lead`)
- Campos: `full_name`, `phone`, `email` (**opcional**), `preferred_modality`
  (opcional), `preferred_contact` (opcional), `marketing_consent`.
- `marketing_consent` es obligatorio y se valida tanto en el cliente
  (`LeadForm.tsx`) como en el servidor (`src/app/api/lead/route.ts`).
- Se persiste en la tabla `patients_leads`.
- No se almacena ningún dato clínico ni las respuestas de la autoevaluación
  (ver sección 2).

### Reglas
- No se solicitan datos de salud en formularios públicos.
- Los formularios de contacto comercial (contacto y lead) están separados de
  cualquier futura capa clínica.
- Los datos de los formularios solo se usan para responder la consulta o
  contactar al interesado.

## 2. Autoevaluación: cálculo local, sin almacenamiento de respuestas

El flujo de `/autoevaluacion` (`src/components/screening/ScreeningFlow.tsx`)
está diseñado para que **ninguna respuesta clínica salga del dispositivo**:

- Los cuestionarios (PHQ-9, GAD-7) se renderizan como componentes React puros;
  los ítems y puntos de corte inmutables viven en `src/lib/instruments/`.
- El cálculo de puntajes ocurre **solo en el cliente** con funciones puras
  (`scorePhq9`, `scoreGad7`). No hay llamada a la API para calificar.
- Las respuestas se guardan únicamente en estado local de React (`useState`);
  no se usan `localStorage`, `sessionStorage`, cookies ni URL para persistirlas.
- No se envía nada a analítica: no hay `dataLayer`, gtag ni endpoints de
  analítica en el flujo (verificado por pruebas).
- La **única** petición opcional es el lead (nombre + contacto), y ocurre solo
  si el usuario decide dejarlos. Es información de contacto de marketing, no
  información clínica.
- El resultado se muestra como **orientativo**, nunca como diagnóstico
  (ver `CLINICAL-DISCLAIMER.md`).

## 3. Limitación de tasa (rate limiting)

Limitador genérico `Map`-based en `src/lib/rate-limit.ts`, en memoria por
proceso:

| Endpoint | Clave | Límite | Ventana |
| --- | --- | --- | --- |
| `POST /api/contact` | `contact:{ip}` | 10 peticiones | 15 minutos |
| `POST /api/lead` | `lead:{ip}` | 10 peticiones | 15 minutos |
| Login de admin | `login:{email}` | 5 intentos | 15 minutos |

- Al superar el límite se responde `429` con cabecera `Retry-After`.
- Nota de escala: al ser en memoria, se reinicia en cada despliegue y no
  funciona de forma distribuida. Suficiente para el uso actual; si se escala a
  múltiples instancias, migrar a un almacén compartido (Redis, DB).

## 4. Seguridad de transporte y cabeceras (CSP)

`next.config.ts` aplica cabeceras de seguridad globales:

- `Content-Security-Policy`: `default-src 'self'`; scripts solo de `'self'`,
  `'unsafe-inline'` (JSON-LD inline y widget de Doctoralia) y
  `platform.docplanner.com`; `connect-src` solo a `'self'` y
  `platform.docplanner.com`; `frame-ancestors 'none'`; `base-uri 'self'`;
  `form-action 'self'`; `object-src 'none'`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-XSS-Protection: 1; mode=block`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Nota: `'unsafe-inline'` en `script-src` es una debilidad conocida
  (JSON-LD inline + widget de Doctoralia). Endurecer con nonces/hashes es
  hardening futuro; queda anotado como deuda.

## 5. Autenticación de administración sin registros con PII

`src/lib/auth.ts` (NextAuth v5 beta + Credentials, consultas con `$queryRaw`
por compatibilidad con MariaDB):

- El acceso admin usa credencial: `admin@zenia.com` y la contraseña viene de la
  variable de entorno `ADMIN_PASSWORD` (sembrada por `scripts/seed-phase2.js`).
- Los registros de autenticación **no incluyen PII**: solo mensajes genéricos
  como `[AUTH] Login rate limit exceeded`, `[AUTH] Login failed:
  unknown credentials`, `[AUTH] Login successful`. No se loguea el correo ni la
  contraseña.
- Las contraseñas se almacenan con hash bcrypt.
- Sesiones con `maxAge` de 7 días.

## 6. Separación de datos de marketing vs. datos clínicos

Diseño por capas:

- **Capa actual (marketing/leads/contacto):** `patients_leads`,
  `contact_messages`, `appointments`, `blog_posts`, `faq_items`, `services`,
  `testimonials`, `admin_users`.
- **Capa clínica: no existe todavía.** No hay historia clínica ni datos de
  salud almacenados en el sitio. Las respuestas de la autoevaluación no se
  persisten.

Si en el futuro se implementa historia clínica o registro de atención, debe
hacerse en una capa separada con cumplimiento reforzado (acceso por roles,
logs de trazabilidad, cifrado, reserva profesional, interoperabilidad IHCE
según corresponda). No mezclar datos clínicos sensibles con tablas de
marketing.

## 7. Enlaces a documentación relacionada

- `CLINICAL-DISCLAIMER.md` — política de exención de responsabilidad clínica y
  manejo editorial de contenido sensible.
- `TESTING-CHECKLIST.md` — flujo de verificación y QA manual.

---

## Revisión legal pendiente

La implementación técnica de arriba es **lo que hace el código**. Un abogado o
delegado de protección de datos (DPO) debe validar y confirmar, al menos:

1. **Textos de consentimiento (Ley 1581 de 2012).** Que los textos de
   consentimiento y la Política de Tratamiento de Datos Personales
   (`/politica-datos`) cumplan los requisitos de información previa, expresa e
   informada, y que el aviso de privacidad esté disponible antes de la
   recolección.
2. **Ley 2460 de 2025** (salud mental) y **Ley 1616 de 2013**: enfoque de
   derechos humanos, no estigmatización y lenguaje responsable en el contenido
   del blog y piezas educativas.
3. **Resolución 1995 de 1999** (historia clínica) y **Resolución 1888 de 2025**
   (Resumen Digital de Atención en Salud / interoperabilidad): aplicables **solo
   si** en una fase futura el sistema administra historia clínica o datos
   clínicos. Hoy no se almacenan datos clínicos.
4. **REPS / número colegiado.** El sitio usa placeholders
   `[REGISTRO_REPS]` y `[NUMERO_COLEGIADO]` en `src/lib/constants.ts`. Los
   valores reales deben revisarse y la habilitación verificarse antes de
   publicar información profesional al público.
5. **Derechos del titular.** Que la Política de Datos explique cómo ejercer
   derechos (consulta, actualización, supresión, revocación) y exista canal
   para recibir y tramitar solicitudes.
6. **Base de legitimación y finalidad** de cada formulario público, y revisión
   de la retención de datos de leads/mensajes.
7. **Endurecimiento de CSP** (`'unsafe-inline'` en `script-src`) como
   recomendación de seguridad.
8. **Rate limiting en memoria**: suficiente para uso actual, pero sin
   persistencia entre reinicios ni distribución multi-instancia.

Nada de esto constituye asesoría legal; es una lista de puntos técnicos y
normativos que el profesional legal correspondiente debe confirmar.
