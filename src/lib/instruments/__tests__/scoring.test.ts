import { describe, expect, it } from "vitest"
import {
  PHQ9,
  GAD7,
  scorePhq9,
  scoreGad7,
  isSuicideRisk,
} from "../index"
import { getSafetyResources, SAFETY_RESOURCES } from "../../safety-resources"
import type { AnswersMap } from "../types"

function fullPhq9(values: Record<number, 0 | 1 | 2 | 3>): AnswersMap {
  return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, ...values }
}

function fullGad7(values: Record<number, 0 | 1 | 2 | 3>): AnswersMap {
  return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, ...values }
}

describe("opciones oficiales", () => {
  it("PHQ-9 tiene exactamente los 4 valores/labels oficiales", () => {
    expect(PHQ9.options).toEqual([
      { value: 0, label: "Para nada" },
      { value: 1, label: "Varios días" },
      { value: 2, label: "Más de la mitad de los días" },
      { value: 3, label: "Casi todos los días" },
    ])
  })

  it("GAD-7 tiene exactamente los 4 valores/labels oficiales", () => {
    expect(GAD7.options).toEqual([
      { value: 0, label: "De nada" },
      { value: 1, label: "Varios días" },
      { value: 2, label: "Más de la mitad de los días" },
      { value: 3, label: "Casi todos los días" },
    ])
  })
})

describe("scorePhq9", () => {
  it("todo 0 → total 0, nivel baja", () => {
    const r = scorePhq9(fullPhq9({}))
    expect(r.total).toBe(0)
    expect(r.level).toBe("baja")
    expect(r.max).toBe(27)
    expect(r.scale).toBe("phq9")
  })

  it("todo 3 → total 27, nivel elevada", () => {
    const r = scorePhq9(
      fullPhq9({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3 })
    )
    expect(r.total).toBe(27)
    expect(r.level).toBe("elevada")
  })

  it("caso mixto conocido → total 12, nivel moderada", () => {
    const answers: AnswersMap = {
      1: 1,
      2: 2,
      3: 3,
      4: 0,
      5: 1,
      6: 2,
      7: 3,
      8: 0,
      9: 0,
    }
    const r = scorePhq9(answers)
    expect(r.total).toBe(12)
    expect(r.level).toBe("moderada")
  })

  it("límites: 4 → baja, 5 → moderada, 14 → moderada, 15 → elevada", () => {
    expect(scorePhq9(fullPhq9({ 1: 1, 2: 1, 3: 1, 4: 1 })).level).toBe("baja")
    expect(scorePhq9(fullPhq9({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 })).level).toBe(
      "moderada"
    )
    expect(
      scorePhq9(fullPhq9({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 })).level
    ).toBe("moderada")
    expect(
      scorePhq9(fullPhq9({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 })).level
    ).toBe("elevada")
  })

  it("cutpoints oficiales presentes", () => {
    expect(scorePhq9(fullPhq9({})).officialCutpoints).toEqual([
      { label: "Ninguno–mínimo (0–4)", range: [0, 4] },
      { label: "Leve (5–9)", range: [5, 9] },
      { label: "Moderado (10–14)", range: [10, 14] },
      { label: "Moderadamente severo (15–19)", range: [15, 19] },
      { label: "Severo (20–27)", range: [20, 27] },
    ])
  })

  it("lanza si falta algún ítem 1-9", () => {
    expect(() => scorePhq9({ 1: 0, 2: 0 })).toThrow(/ítem/)
  })

  it("lanza si recibe ítems de otra escala (solo 1-7)", () => {
    const gad7Style: AnswersMap = { 1: 1, 2: 2, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1 }
    expect(() => scorePhq9(gad7Style)).toThrow(/ítem 8/)
  })

  it("lanza si un valor no es 0|1|2|3", () => {
    expect(() => scorePhq9(fullPhq9({ 1: 5 as 0 }))).toThrow(/valor/)
  })
})

describe("scoreGad7", () => {
  it("todo 0 → total 0, nivel baja", () => {
    const r = scoreGad7(fullGad7({}))
    expect(r.total).toBe(0)
    expect(r.level).toBe("baja")
    expect(r.max).toBe(21)
    expect(r.scale).toBe("gad7")
  })

  it("todo 3 → total 21, nivel elevada", () => {
    const r = scoreGad7(fullGad7({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 }))
    expect(r.total).toBe(21)
    expect(r.level).toBe("elevada")
  })

  it("caso mixto conocido → total 10, nivel moderada", () => {
    const answers: AnswersMap = { 1: 1, 2: 2, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1 }
    const r = scoreGad7(answers)
    expect(r.total).toBe(10)
    expect(r.level).toBe("moderada")
  })

  it("límites: 4 → baja, 5 → moderada, 14 → moderada, 15 → elevada", () => {
    expect(scoreGad7(fullGad7({ 1: 1, 2: 1, 3: 1, 4: 1 })).level).toBe("baja")
    expect(scoreGad7(fullGad7({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 })).level).toBe(
      "moderada"
    )
    expect(
      scoreGad7(fullGad7({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 })).level
    ).toBe("moderada")
    expect(
      scoreGad7(fullGad7({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 })).level
    ).toBe("elevada")
  })

  it("lanza si recibe ítems 8 o 9 (de otra escala)", () => {
    const phq9Style: AnswersMap = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1, 9: 1,
    }
    expect(() => scoreGad7(phq9Style)).toThrow(/no pertenece/)
  })
})

describe("isSuicideRisk", () => {
  it("ítem 9 = 0 → false", () => {
    expect(isSuicideRisk(fullPhq9({ 9: 0 }))).toBe(false)
  })

  it("ítem 9 = 1 → true", () => {
    expect(isSuicideRisk(fullPhq9({ 9: 1 }))).toBe(true)
  })

  it("ítem 9 = 3 → true", () => {
    expect(isSuicideRisk(fullPhq9({ 9: 3 }))).toBe(true)
  })
})

describe("getSafetyResources", () => {
  it("Colombia incluye la línea 123", () => {
    const co = getSafetyResources("CO")
    expect(co.region).toBe("CO")
    expect(co.numbers.map((n) => n.value)).toContain("123")
    expect(co.numbers.map((n) => n.value)).toContain("106")
  })

  it("región desconocida devuelve el placeholder editable OTRO", () => {
    const fallback = getSafetyResources("ZZ")
    expect(fallback.region).toBe("OTRO")
    expect(fallback.numbers).toEqual([])
  })

  it("por defecto usa Colombia", () => {
    expect(getSafetyResources().region).toBe("CO")
  })

  it("OTRO existe en SAFETY_RESOURCES para edición", () => {
    expect(SAFETY_RESOURCES.some((r) => r.region === "OTRO")).toBe(true)
  })
})
