"use client";

import { Button } from "@/components/ui/Button";

interface ScreeningIntroProps {
  onStart: () => void;
}

export function ScreeningIntro({ onStart }: ScreeningIntroProps) {
  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm">
          <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage-dark text-sm font-medium mb-5">
            Autoevaluación orientativa
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">
            ¿Cómo te has sentido últimamente?
          </h1>
          <div className="space-y-4 text-warm-gray leading-relaxed mb-8">
            <p>
              Este cuestionario te invita a reflexionar sobre cómo te has
              sentido en las últimas dos semanas. Usa dos instrumentos
              ampliamente utilizados en el ámbito clínico: el PHQ-9 (estado de
              ánimo) y el GAD-7 (ansiedad).
            </p>
            <p>
              Es una herramienta <strong>orientativa</strong>: te ayuda a poner
              en palabras lo que sientes, pero{" "}
              <strong>no es un diagnóstico</strong> ni reemplaza una evaluación
              profesional. Solo un profesional de la salud mental puede hacer
              una valoración individual.
            </p>
            <p>
              Tus respuestas se procesan de forma anónima en tu propio
              dispositivo: no se guardan en este sitio ni se envían a ningún
              servidor.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-warm-gray mb-8">
            <li>• Tomará entre 3 y 5 minutos.</li>
            <li>• Puedes elegir responder una o ambas escalas.</li>
            <li>• Puedes dejar la autoevaluación cuando quieras.</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onStart} size="lg" className="w-full sm:w-auto">
              Empezar autoevaluación
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
