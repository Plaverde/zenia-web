import type {
  AnswersMap,
  InstrumentDefinition,
  ScaleResult,
  ScreeningItem,
} from "./types"

export const PHQ9_RISK_ITEM_ID = 9

// Contenido oficial del PHQ-9 en español para Colombia (Pfizer/MAPI).
// Los textos son inmutables: no parafrasear ni modificar.
export const PHQ9: InstrumentDefinition = {
  id: "phq9",
  title: "Cuestionario sobre la Salud del Paciente-9 (PHQ-9)",
  shortTitle: "Estado de ánimo (PHQ-9)",
  instruction:
    "Durante las últimas 2 semanas, ¿con qué frecuencia ha sentido molestias por los siguientes problemas?",
  items: [
    { id: 1, text: "Poco interés o placer en hacer las cosas" },
    { id: 2, text: "Sentirse desanimado/a, deprimido/a o sin esperanzas" },
    {
      id: 3,
      text: "Problemas para dormir o mantenerse el sueño o dormir demasiado",
    },
    { id: 4, text: "Sentirse cansado/a o con poca energía" },
    { id: 5, text: "Sentir poco apetito o comer en exceso" },
    {
      id: 6,
      text: "Sentirse mal acerca de sí mismo o tener un sentimiento de fracaso o de abandono propio o de la familia",
    },
    {
      id: 7,
      text: "Dificultad para concentrarse en diferentes actividades tales como leer el periódico o ver televisión",
    },
    {
      id: 8,
      text: "Moverse o hablar tan despacio que otras personas lo han notado o bien, por el contrario, estar tan inquieto/a o intranquilo/a que se mueve mucho más de lo normal",
    },
    {
      id: PHQ9_RISK_ITEM_ID,
      text: "Pensamientos acerca de que sería mejor estar muerto/a o deseos de lastimarse de alguna forma",
    },
  ],
  options: [
    { value: 0, label: "Para nada" },
    { value: 1, label: "Varios días" },
    { value: 2, label: "Más de la mitad de los días" },
    { value: 3, label: "Casi todos los días" },
  ],
  attribution:
    "Desarrollado por los Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke y colegas a través de una beca educativa de Pfizer Inc. No se requiere autorización para reproducir, traducir, exhibir o distribuir este material.",
  maxScore: 27,
}

// Ítem adicional sin puntuación (solo para uso futuro en la interfaz,
// no participa en el puntaje). Respuestas: No ha sido difícil / Algo difícil /
// Muy difícil / Extremadamente difícil.
export const PHQ9_DIFFICULTY_ITEM: ScreeningItem = {
  id: 0,
  text: "Si marcó cualquier problema, ¿qué grado de dificultad le generaron estos problemas para realizar su trabajo, encargarse de las tareas domésticas o relacionarse con otras personas?",
}

export const PHQ9_CUTPOINTS: { label: string; range: [number, number] }[] = [
  { label: "Ninguno–mínimo (0–4)", range: [0, 4] },
  { label: "Leve (5–9)", range: [5, 9] },
  { label: "Moderado (10–14)", range: [10, 14] },
  { label: "Moderadamente severo (15–19)", range: [15, 19] },
  { label: "Severo (20–27)", range: [20, 27] },
]

const REQUIRED_ITEM_IDS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function assertCompletePhq9(answers: AnswersMap): void {
  const keys = Object.keys(answers).map(Number)
  for (const id of REQUIRED_ITEM_IDS) {
    if (!keys.includes(id)) {
      throw new Error(
        `scorePhq9: falta el ítem ${id} del PHQ-9. Se requieren los ítems 1 a 9.`
      )
    }
  }
  for (const [key, value] of Object.entries(answers)) {
    if (!REQUIRED_ITEM_IDS.includes(Number(key))) {
      throw new Error(`scorePhq9: el ítem ${key} no pertenece al PHQ-9.`)
    }
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3) {
      throw new Error(
        `scorePhq9: valor inválido ${value} para el ítem ${key}. Solo se aceptan 0, 1, 2 o 3.`
      )
    }
  }
}

export function scorePhq9(answers: AnswersMap): ScaleResult {
  assertCompletePhq9(answers)
  let total = 0
  for (const id of REQUIRED_ITEM_IDS) {
    total += answers[id]
  }
  const level =
    total <= 4 ? "baja" : total <= 14 ? "moderada" : "elevada"
  return {
    scale: "phq9",
    total,
    max: PHQ9.maxScore,
    level,
    officialCutpoints: PHQ9_CUTPOINTS,
  }
}

export function isSuicideRisk(answers: AnswersMap): boolean {
  return (answers[PHQ9_RISK_ITEM_ID] ?? 0) > 0
}
