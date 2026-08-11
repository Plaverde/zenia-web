# Política de exención de responsabilidad clínica (disclaimer)

Política general del sitio respecto a contenido de salud mental y la
autoevaluación. Define qué dice el sitio, cómo se presenta y qué reglas
editoriales aplican al publicar contenido sensible. La implementación técnica
se documenta en `PRIVACY-IMPLEMENTATION.md`.

## 1. Principios generales

1. **El contenido es educativo, no reemplaza atención profesional.**
   Todo material informativo del sitio (blog, especialidades, artículos) es de
   carácter educativo. No sustituye una evaluación psicológica profesional
   personalizada.
2. **La autoevaluación es orientativa, no diagnóstica.** Los cuestionarios
   PHQ-9 y GAD-7 se presentan como herramienta de reflexión. Sus resultados son
   un punto de partida para conversar, nunca un diagnóstico.
3. **No se prometen resultados garantizados.** El sitio no usa frases como
   "transforma tu vida" ni promesas absolutas de curación.
4. **En crisis: se orienta a líneas de ayuda.** El sitio no es un servicio de
   emergencia ni ofrece monitoreo permanente; ante crisis se dirige al usuario
   a líneas oficiales.

## 2. Textos vigentes usados en los componentes

Wording exacto actual (fuente: `src/components/screening/*`):

### Paso de consentimiento (`ConsentStep.tsx`)

> "Tus respuestas a las preguntas son **anónimas** y se calculan únicamente en
> tu dispositivo. No se envían a ningún servidor ni se almacenan en este
> sitio."
>
> "Al final, tendrás la opción de dejar tu nombre y un medio de contacto para
> que te pueda orientar. Esa información es **opcional**: si no deseas
> compartirla, puedes ver tu resultado igualmente."
>
> "Esta autoevaluación es orientativa y no constituye un diagnóstico ni
> reemplaza la atención de un profesional de la salud mental."

Checkbox de consentimiento:

> "Entiendo que mis respuestas son anónimas y orientativas, que no constituyen
> un diagnóstico y que solo compartiré mis datos de contacto si así lo decido
> al final."

### Pantalla de resultado (`ResultScreen.tsx`)

> "Esta autoevaluación es **orientativa**: no es un diagnóstico ni un consejo
> médico, y no reemplaza la evaluación de un profesional de la salud mental.
> Solo un profesional puede valorar tu situación de forma individual."

Resultados por nivel:

- **Bajo:** "Los malestares que consultaste aparecen con poca frecuencia en
  este momento…"
- **Moderado:** "Los malestares aparecen con una frecuencia que puede estar
  afectando tu día a día más de lo que parece…"
- **Elevado:** "Los malestares aparecen con frecuencia y pueden estar pesando
  mucho sobre tu día a día. Buscar acompañamiento profesional cuanto antes…"

### Formulario de lead (`LeadForm.tsx`)

> "Opcional: deja tu nombre y un medio de contacto para que pueda escribirte y
> orientarte sobre el proceso de acompañamiento. Tus respuestas de la
> autoevaluación no se guardan ni se envían."

### Pantalla de seguridad (`SafetyScreen.tsx`)

> "Lo que marcaste es importante y merece atención. Quiero que sepas que no
> estás solo/a y que hay personas y líneas de ayuda disponibles para
> acompañarte en este momento."
>
> "{resources.note} Este sitio no es un servicio de emergencia ni ofrece
> monitoreo permanente."

### Blog (`BlogDisclaimer.tsx`) y banner de emergencia (`EmergencyBanner.tsx`)

> "**Aviso importante:** Este artículo es de carácter educativo e informativo.
> No sustituye una evaluación psicológica profesional personalizada. Si sientes
> que lo que describes se parece a tu situación, considera agendar una sesión
> para conversarlo con una profesional."

> "Si estás en una crisis emocional o tienes ideas de hacerte daño, contacta
> inmediatamente la **Línea 106** (Salud Mental) o la **Línea 123** (Línea de
> la Vida). También puedes llamar al **125** (SAMU) o acudir a la sala de
> urgencias más cercana."

## 3. Rutas de emergencia en Colombia

El sitio referencia estas líneas oficiales (Colombia), definidas en
`src/lib/safety-resources.ts`:

| Línea | Descripción |
| --- | --- |
| **123** | Línea de emergencias |
| **106** | Línea de salud mental |
| **125** | SAMU (urgencias médicas) |

Nota: la lista es editable en `src/lib/safety-resources.ts` (único punto
oficial). Las líneas territoriales pueden variar; el profesional debe
actualizarlas según su ciudad.

## 4. Reglas editoriales para contenido sensible

Al publicar en el blog o piezas educativas:

- **No estigmatizar** trastornos ni usar lenguaje que juzgue a la persona.
- **No prometer** resultados garantizados ni curas absolutas.
- **No presentar el contenido como sustituto** de evaluación profesional
  individual.
- **Temas de crisis, autolesión o suicidio:** incluir advertencia responsable y
  orientación hacia rutas de ayuda (Línea 106, 123, 125, urgencias). Usar
  `EmergencyBanner` / `BlogDisclaimer` con `includeEmergency` en los artículos
  que lo requieran, en coherencia con el enfoque preventivo y pedagógico que
  refuerza la Ley 2460 de 2025.
- Mantener un tono cálido, claro y empático, sin lenguaje clínico excesivamente
  técnico.

## 5. Alcance de este documento

Este documento describe la política y el copy implementado. La validación legal
de los textos (consentimiento, avisos, artículos) corresponde a un abogado o
DPO — ver la sección "Revisión legal pendiente" en
`PRIVACY-IMPLEMENTATION.md`.
