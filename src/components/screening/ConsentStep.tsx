"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";

interface ConsentStepProps {
  onAccept: () => void;
  onBack: () => void;
}

export function ConsentStep({ onAccept, onBack }: ConsentStepProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            Antes de empezar
          </h1>
          <div className="space-y-4 text-warm-gray leading-relaxed mb-6">
            <p>
              Tus respuestas a las preguntas son <strong>anónimas</strong> y se
              calculan únicamente en tu dispositivo. No se envían a ningún
              servidor ni se almacenan en este sitio.
            </p>
            <p>
              Al final, tendrás la opción de dejar tu nombre y un medio de
              contacto para que te pueda orientar. Esa información es{" "}
              <strong>opcional</strong>: si no deseas compartirla, puedes ver tu
              resultado igualmente.
            </p>
            <p>
              Esta autoevaluación es orientativa y no constituye un diagnóstico
              ni reemplaza la atención de un profesional de la salud mental.
            </p>
          </div>

          <label
            htmlFor="screening-consent"
            className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-sand bg-ivory"
          >
            <input
              type="checkbox"
              id="screening-consent"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-5 w-5 rounded accent-sage-dark"
            />
            <span className="text-sm text-warm-gray leading-relaxed">
              Entiendo que mis respuestas son anónimas y orientativas, que no
              constituyen un diagnóstico y que solo compartiré mis datos de
              contacto si así lo decido al final.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full sm:w-auto"
            >
              Anterior
            </Button>
            {accepted ? (
              <Button onClick={onAccept} size="lg" className="w-full sm:w-auto">
                Continuar
              </Button>
            ) : (
              <Tooltip
                content="Debes aceptar el tratamiento de datos para continuar."
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
