export type ScaleId = "phq9" | "gad7";

export interface ScreeningItem {
  id: number;
  text: string;
  needsSourceVerification?: boolean;
}

export interface AnswerValue {
  value: 0 | 1 | 2 | 3;
  label: string;
}

export type AnswersMap = Record<number, 0 | 1 | 2 | 3>;

export type OrientativeLevel = "baja" | "moderada" | "elevada";

export interface ScaleResult {
  scale: ScaleId;
  total: number;
  max: number;
  level: OrientativeLevel;
  officialCutpoints: { label: string; range: [number, number] }[];
}

export interface InstrumentDefinition {
  id: ScaleId;
  title: string;
  shortTitle: string;
  instruction: string;
  items: ScreeningItem[];
  options: AnswerValue[];
  attribution: string;
  maxScore: number;
}
