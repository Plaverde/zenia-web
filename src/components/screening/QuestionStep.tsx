"use client";

import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import type { AnswerValue, InstrumentDefinition, ScreeningItem } from "@/lib/instruments";

interface QuestionStepProps {
  instrument: InstrumentDefinition;
  item: ScreeningItem;
  index: number;
  total: number;
  value?: AnswerValue["value"];
  onAnswer: (value: AnswerValue["value"]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionStep({
  instrument,
  item,
  index,
  total,
  value,
  onAnswer,
  onNext,
  onBack,
}: QuestionStepProps) {
  const questionNumber = index + 1;
  const isAnswered = value !== undefined;

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm">
          {/* Encabezado de página para lectores de pantalla: cada paso del
              flujo debe exponer un h1 aunque la pregunta use <legend>. */}
          <h1 className="sr-only">
            Autoevaluación: {instrument.title}
          </h1>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-sage-dark">
              {instrument.shortTitle}
            </span>
            <span className="text-sm text-warm-gray">
              Pregunta {questionNumber} de {total}
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Progreso de la autoevaluación"
            aria-valuenow={questionNumber}
            aria-valuemin={1}
            aria-valuemax={total}
            className="h-2 w-full bg-sand rounded-full mb-8"
          >
            <div
              className="h-2 bg-sage rounded-full transition-all"
              style={{ width: `${(questionNumber / total) * 100}%` }}
            />
          </div>

          <Button onClick={onBack} variant="ghost" size="sm">
            Anterior
          </Button>

          <p className="text-warm-gray leading-relaxed mb-6 mt-6">
            {instrument.instruction}
          </p>

          <fieldset>
            <legend className="font-serif text-2xl text-charcoal leading-snug mb-6">
              {item.text}
            </legend>
            <div className="space-y-3">
              {instrument.options.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`${instrument.id}-q-${item.id}-${option.value}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors min-h-[44px] ${
                    value === option.value
                      ? "border-sage-dark bg-sage/5"
                      : "border-sand bg-white hover:border-sage"
                  }`}
                >
                  <input
                    type="radio"
                    id={`${instrument.id}-q-${item.id}-${option.value}`}
                    name={`${instrument.id}-q-${item.id}`}
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => onAnswer(option.value)}
                    className="mt-1 h-5 w-5 accent-sage-dark"
                  />
                  <span className="font-medium text-charcoal">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {isAnswered ? (
              <Button onClick={onNext} size="lg" className="w-full sm:w-auto">
                Continuar
              </Button>
            ) : (
              <Tooltip
                content="Selecciona una opción para continuar."
                disabled
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full" disabled>
                  Continuar
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
