"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import type { ScaleId } from "@/lib/instruments";

interface ScaleSelectProps {
  onSelect: (scales: ScaleId[]) => void;
}

const options: { value: string; label: string; description: string; info?: string }[] = [
  {
    value: "phq9",
    label: "Estado de ánimo (PHQ-9)",
    description: "9 preguntas sobre cómo te has sentido en las últimas 2 semanas.",
    info: "El PHQ-9 mide la frecuencia de síntomas depresivos.",
  },
  {
    value: "gad7",
    label: "Ansiedad (GAD-7)",
    description: "7 preguntas sobre la frecuencia de malestares de ansiedad.",
    info: "El GAD-7 mide la frecuencia de síntomas de ansiedad generalizada.",
  },
  {
    value: "both",
    label: "Ambas escalas",
    description: "Completa el PHQ-9 y luego el GAD-7 para una visión más completa.",
  },
];

export function ScaleSelect({ onSelect }: ScaleSelectProps) {
  const [selected, setSelected] = useState<string>("");

  function handleContinue() {
    const scales: ScaleId[] =
      selected === "both" ? ["phq9", "gad7"] : [selected as ScaleId];
    onSelect(scales);
  }

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">
            ¿Qué te gustaría explorar?
          </h1>
          <p className="text-warm-gray leading-relaxed mb-6">
            Elige uno o ambos cuestionarios. Cada respuesta es anónima y se
            calcula en tu dispositivo.
          </p>

          <fieldset>
            <legend className="sr-only">Escalas de autoevaluación</legend>
            <div className="space-y-3" role="radiogroup" aria-label="Escalas de autoevaluación">
              {options.map((option) => (
                <label
                  key={option.value}
                  htmlFor={`scale-${option.value}`}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors min-h-[44px] ${
                    selected === option.value
                      ? "border-sage-dark bg-sage/5"
                      : "border-sand bg-white hover:border-sage"
                  }`}
                >
                  <input
                    type="radio"
                    id={`scale-${option.value}`}
                    name="scales"
                    value={option.value}
                    checked={selected === option.value}
                    onChange={() => setSelected(option.value)}
                    className="mt-1 h-5 w-5 accent-sage-dark"
                  />
                  <span>
                    <span className="block font-medium text-charcoal">
                      {option.label}
                      {option.info && (
                        <Tooltip content={option.info} className="ml-1 align-middle">
                          <span
                            tabIndex={0}
                            aria-label={`Qué mide ${option.label}`}
                            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-sage-dark text-[10px] font-semibold leading-none text-sage-dark cursor-help"
                          >
                            i
                          </span>
                        </Tooltip>
                      )}
                    </span>
                    <span className="block text-sm text-warm-gray mt-1">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {selected ? (
              <Button onClick={handleContinue} size="lg" className="w-full sm:w-auto">
                Continuar
              </Button>
            ) : (
              <Tooltip content="Selecciona una opción para continuar." disabled className="w-full sm:w-auto">
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
