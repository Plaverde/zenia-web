# Lista de verificación de pruebas (QA)

Flujo de verificación del sitio **antes de cada despliegue**. Ejecutar desde la
raíz del repo (`zenia-web/`).

## 1. Verificación automatizada

### TypeScript
```bash
npx tsc --noEmit
```
- Debe terminar sin errores.
- Más confiable que `npm run lint` (ESLint CLI sobre `next lint`, eliminado en
  Next.js 16; `eslint .` usa la flat config).

### Pruebas unitarias / de flujo (vitest)
```bash
npm test          # equivale a `vitest run`
```
- Deben pasar **37 pruebas** (2 archivos de test).
- `npm run test:watch` para modo observación.

**Cobertura de las 37 pruebas:**

| Archivo | Cantidad | Qué cubre |
| --- | --- | --- |
| `src/lib/instruments/__tests__/scoring.test.ts` | 22 | Opciones oficiales PHQ-9/GAD-7, puntajes totales, niveles orientativos (baja/moderada/elevada), puntos de corte oficiales, validación de ítems (falta de ítem, ítems de otra escala, valores fuera de rango), `isSuicideRisk`, `getSafetyResources`/`SAFETY_RESOURCES`. |
| `src/components/screening/__tests__/flow.test.tsx` | 15 | Flujo completo de `/autoevaluacion`: pregunta obligatoria, puntajes PHQ-9/GAD-7 coinciden con scoring, no mezcla de escalas, lenguaje orientativo (no diagnóstico), pantalla de seguridad con ítem 9 del PHQ-9, sin analítica ni endpoints, navegación por teclado, lead opcional, resultado visible sin lead, sin puntajes en URL, error genérico en fallo de red del lead, una pregunta por pantalla, consentimiento obligatorio, reinicio limpio. |

**Nota:** vitest puede mostrar un warning de config (configLoader ESM/CJS).
Es **no bloqueante**; las pruebas siguen ejecutándose y pasando.

### Build de producción
```bash
npm run build
```
- Debe completar con éxito (requiere la base de datos MariaDB levantada, porque
  `sitemap.ts` y páginas consultan `zenia_db`).
- El `postbuild` genera `public/llms-full.txt` automáticamente.
- Si falla **solo** porque la DB no está disponible, reportar como pendiente,
  no como error de código.

### Base de datos
```bash
npm run db:push      # sincroniza prisma/schema.prisma con MariaDB
```
- Necesario si cambió el schema. Verificar conectividad con XAMPP (puerto 3306).

## 2. QA manual — `/autoevaluacion`

- [ ] Se muestra **una pregunta por pantalla** (radio 0–3 + "Continuar").
- [ ] No avanza sin responder; muestra alerta "Selecciona una opción…".
- [ ] Navegación por teclado: botones y radios alcanzables con `Tab`, activables
      con `Enter`/`Espacio`.
- [ ] Ítem 9 del PHQ-9 con valor > 0 muestra la **pantalla de seguridad** con
      líneas 123, 106 y 125 (enlaces `tel:`), y permite continuar a resultados.
- [ ] Los puntajes **no aparecen en la URL** (ni respuestas, ni totales) en
      ningún paso.
- [ ] La URL no cambia de query a lo largo del flujo.
- [ ] El lead es **opcional**: se puede ver el resultado sin enviarlo.
- [ ] Fallo de red del lead muestra error **genérico** ("Ocurrió un error.
      Intenta de nuevo."), no el error técnico.
- [ ] El resultado usa lenguaje **orientativo** (nunca "usted tiene", "sufre
      de", etc.).
- [ ] El consentimiento debe aceptarse antes de las preguntas.
- [ ] "Reiniciar la evaluación" vuelve al inicio con estado limpio.
- [ ] En móvil: legible, botones ≥ 44×44, barra de CTA no tapa contenido.
- [ ] Hacer ambas escalas (PHQ-9 + GAD-7): los resultados no se mezclan.

## 3. QA manual — resto del sitio

### Formularios
- [ ] `/contacto`: validación de campos, consentimiento obligatorio, error
      genérico si falla, mensaje de éxito.
- [ ] Triage de la home (`TriageAssistant`): consentimiento de datos.
- [ ] `/autoevaluacion` lead: envía a `/api/lead` y persiste en `patients_leads`.

### Rate limiting
- [ ] Más de 10 envíos a `/api/contact` en 15 min → `429` con `Retry-After`.
- [ ] Más de 10 envíos a `/api/lead` en 15 min → `429`.
- [ ] Más de 5 intentos de login admin → bloqueo temporal.

### Admin (`/admin`)
- [ ] Login con `admin@zenia.com` + `ADMIN_PASSWORD` (re-sembrar con
      `node scripts/seed-phase2.js` tras desplegar).
- [ ] CRUD de blog, citas, pacientes, FAQ, testimonios, mensajes, servicios.
- [ ] Cada fetch admin verifica `res.ok` (no crashea ante 401/500).
- [ ] Roles: solo `admin` accede a `/admin/*` y `/api/admin/*`.

### Blog y contenido
- [ ] Artículos con react-markdown + sanitizado (sin XSS).
- [ ] Artículos de ansiedad/depresión/crisis muestran `EmergencyBanner` /
      `BlogDisclaimer`.
- [ ] Slugs únicos (`uniqueSlug` agrega `-2`, `-3` en conflictos).
- [ ] Subida de imágenes (`/api/upload`): autenticado, 5MB máx, formatos
      permitidos.

### SEO
- [ ] `/sitemap.xml` incluye `/autoevaluacion`, blog y especialidades.
- [ ] `/robots.txt` referencia el sitemap.
- [ ] Metadata de `/autoevaluacion`: title único, description, robots
      index/follow, canonical.

## 4. Antes de desplegar

- [ ] `npx tsc --noEmit` sin errores.
- [ ] `npm test` con 37/37 aprobadas.
- [ ] `npm run build` exitoso.
- [ ] `npm run db:push` aplicado si cambió el schema.
- [ ] Re-seed del admin si se desplegó en entorno nuevo
      (`node scripts/seed-phase2.js`).
- [ ] Revisar que no quedaron datos inventados: los valores reales faltantes
      siguen como `[PLACEHOLDER]` (buscar `\[[A-Z_Á-Ú]` en `src/`).
