"use client";

import { useState } from "react";
import { ScreeningIntro } from "./ScreeningIntro";
import { ScaleSelect } from "./ScaleSelect";
import { ConsentStep } from "./ConsentStep";
import { QuestionStep } from "./QuestionStep";
import { SafetyScreen } from "./SafetyScreen";
import { ResultScreen } from "./ResultScreen";
import { Button } from "@/components/ui/Button";
import {
  PHQ9,
  GAD7,
  PHQ9_RISK_ITEM_ID,
  scorePhq9,
  scoreGad7,
  isSuicideRisk,
} from "@/lib/instruments";
import type {
  AnswersMap,
  AnswerValue,
  InstrumentDefinition,
  ScaleId,
  ScaleResult,
  ScreeningItem,
} from "@/lib/instruments";

type Step =
  | { name: "intro" }
  | { name: "select" }
  | { name: "consent" }
  | { name: "questions"; index: number }
  | { name: "safety"; index: number }
  | { name: "result" }
  | { name: "done" };

interface FlatQuestion {
  scale: ScaleId;
  item: ScreeningItem;
}

const EMPTY_ANSWERS: Record<ScaleId, AnswersMap> = { phq9: {}, gad7: {} };

function instrumentFor(scale: ScaleId): InstrumentDefinition {
  return scale === "phq9" ? PHQ9 : GAD7;
}

function buildQuestions(scales: ScaleId[]): FlatQuestion[] {
  return scales.flatMap((scale) =>
    instrumentFor(scale).items.map((item) => ({ scale, item }))
  );
}

function computeResults(
  scales: ScaleId[],
  answers: Record<ScaleId, AnswersMap>
): ScaleResult[] {
  return scales.map((scale) =>
    scale === "phq9" ? scorePhq9(answers.phq9) : scoreGad7(answers.gad7)
  );
}

export function ScreeningFlow() {
  const [step, setStep] = useState<Step>({ name: "intro" });
  const [scales, setScales] = useState<ScaleId[]>([]);
  const [answers, setAnswers] =
    useState<Record<ScaleId, AnswersMap>>(EMPTY_ANSWERS);
  const [questions, setQuestions] = useState<FlatQuestion[]>([]);

  const currentQuestion =
    step.name === "questions" ? questions[step.index] : null;

  function handleSelectScales(selected: ScaleId[]) {
    setScales(selected);
    setStep({ name: "consent" });
  }

  function handleAcceptConsent() {
    setQuestions(buildQuestions(scales));
    setStep({ name: "questions", index: 0 });
  }

  function handleAnswer(value: AnswerValue["value"]) {
    if (!currentQuestion) return;
    const { scale, item } = currentQuestion;
    setAnswers((prev) => ({
      ...prev,
      [scale]: { ...prev[scale], [item.id]: value },
    }));
  }

  function advanceFrom(index: number) {
    if (index < questions.length - 1) {
      setStep({ name: "questions", index: index + 1 });
    } else {
      setStep({ name: "result" });
    }
  }

  function handleNext() {
    if (!currentQuestion) return;
    const { scale, item } = currentQuestion;
    const value = answers[scale][item.id];
    if (value === undefined) return;

    if (scale === "phq9" && item.id === PHQ9_RISK_ITEM_ID && value > 0) {
      setStep({ name: "safety", index: step.name === "questions" ? step.index : 0 });
      return;
    }
    advanceFrom(step.name === "questions" ? step.index : 0);
  }

  function handleContinueFromSafety() {
    if (step.name !== "safety") return;
    advanceFrom(step.index);
  }

  function handleBack() {
    if (step.name !== "questions") return;
    if (step.index > 0) {
      setStep({ name: "questions", index: step.index - 1 });
    } else {
      setStep({ name: "consent" });
    }
  }

  function handleRestart() {
    setScales([]);
    setAnswers(EMPTY_ANSWERS);
    setQuestions([]);
    setStep({ name: "intro" });
  }

  if (step.name === "intro") {
    return <ScreeningIntro onStart={() => setStep({ name: "select" })} />;
  }

  if (step.name === "select") {
    return <ScaleSelect onSelect={handleSelectScales} />;
  }

  if (step.name === "consent") {
    return (
      <ConsentStep
        onAccept={handleAcceptConsent}
        onBack={() => setStep({ name: "select" })}
      />
    );
  }

  if (step.name === "questions" && currentQuestion) {
    const instrument = instrumentFor(currentQuestion.scale);
    return (
      <QuestionStep
        instrument={instrument}
        item={currentQuestion.item}
        index={step.index}
        total={questions.length}
        value={answers[currentQuestion.scale][currentQuestion.item.id]}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
      />
    );
  }

  if (step.name === "safety") {
    return (
      <SafetyScreen
        onContinue={handleContinueFromSafety}
        onRestart={handleRestart}
      />
    );
  }

  if (step.name === "result") {
    const results = computeResults(scales, answers);
    return (
      <ResultScreen
        results={results}
        onRestart={handleRestart}
        onFinish={() => setStep({ name: "done" })}
      />
    );
  }

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage-dark text-sm font-medium mb-5">
            Autoevaluación completada
          </span>
          <h1 className="font-serif text-4xl text-charcoal mb-4">
            Has completado la autoevaluación
          </h1>
          <p className="text-warm-gray leading-relaxed max-w-lg mx-auto mb-8">
            Gracias por dedicarte este momento. Recuerda que estos resultados
            son orientativos y no constituyen un diagnóstico. Si tienes dudas o
            quieres conversar, estoy aquí para acompañarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" size="lg">
              Agendar mi primera sesión
            </Button>
            <Button onClick={handleRestart} variant="outline" size="lg">
              Reiniciar la evaluación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
