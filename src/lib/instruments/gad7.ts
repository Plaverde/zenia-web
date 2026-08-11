import type {
  AnswersMap,
  InstrumentDefinition,
  ScaleResult,
} from "./types"

// Contenido oficial del GAD-7 en español (Pfizer). Textos inmutables.
export const GAD7: InstrumentDefinition = {
  id: "gad7",
  title: "Cuestionario de Trastorno de Ansiedad General (GAD-7)",
  shortTitle: "Ansiedad (GAD-7)",
  instruction:
    "Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?",
  items: [
    {
      id: 1,
      // VERIFICACIÓN DE FUENTE: la impresión del PDF oficial en español muestra
      // "nervioso o nervioso", lo que parece un artefacto de impresión. La
      // redacción oficial es "tenso" (nervous, anxious, or on edge). Confirmar
      // contra phqscreeners.com antes de usar este ítem en producción.
      text: "Sentirse nervioso, ansioso o tenso",
      needsSourceVerification: true,
    },
    {
      id: 2,
      text: "No poder detenerse o controlar la preocupación",
    },
    { id: 3, text: "Preocuparse demasiado por cosas diferentes" },
    { id: 4, text: "Dificultad para relajarse" },
    { id: 5, text: "Ser tan inquieto que es difícil quedarse quieto" },
    { id: 6, text: "Molestarse o irritarse con facilidad" },
    { id: 7, text: "Sentir miedo, como si algo horrible pudiera suceder" },
  ],
  options: [
    { value: 0, label: "De nada" },
    { value: 1, label: "Varios días" },
    { value: 2, label: "Más de la mitad de los días" },
    { value: 3, label: "Casi todos los días" },
  ],
  attribution:
    "GAD-7. Desarrollado por Spitzer RL, Kroenke K, Williams JBW, Löwe B. Referencia: Spitzer RL, et al. Arch Intern Med. 2006;166(10):1092-1097.",
  maxScore: 21,
}

export const GAD7_CUTPOINTS: { label: string; range: [number, number] }[] = [
  { label: "Mínimo (1–4)", range: [1, 4] },
  { label: "Leve (5–9)", range: [5, 9] },
  { label: "Moderado (10–14)", range: [10, 14] },
  { label: "Moderado a severo (15–21)", range: [15, 21] },
]

const REQUIRED_ITEM_IDS: number[] = [1, 2, 3, 4, 5, 6, 7]

function assertCompleteGad7(answers: AnswersMap): void {
  const keys = Object.keys(answers).map(Number)
  for (const id of REQUIRED_ITEM_IDS) {
    if (!keys.includes(id)) {
      throw new Error(
        `scoreGad7: falta el ítem ${id} del GAD-7. Se requieren los ítems 1 a 7.`
      )
    }
  }
  for (const [key, value] of Object.entries(answers)) {
    if (!REQUIRED_ITEM_IDS.includes(Number(key))) {
      throw new Error(`scoreGad7: el ítem ${key} no pertenece al GAD-7.`)
    }
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3) {
      throw new Error(
        `scoreGad7: valor inválido ${value} para el ítem ${key}. Solo se aceptan 0, 1, 2 o 3.`
      )
    }
  }
}

export function scoreGad7(answers: AnswersMap): ScaleResult {
  assertCompleteGad7(answers)
  let total = 0
  for (const id of REQUIRED_ITEM_IDS) {
    total += answers[id]
  }
  // Un total de 0 corresponde al nivel "baja": la banda oficial "Mínimo (1–4)"
  // empieza en 1, por lo que un puntaje de 0 queda por debajo del nivel mínimo.
  const level =
    total <= 4 ? "baja" : total <= 14 ? "moderada" : "elevada"
  return {
    scale: "gad7",
    total,
    max: GAD7.maxScore,
    level,
    officialCutpoints: GAD7_CUTPOINTS,
  }
}
