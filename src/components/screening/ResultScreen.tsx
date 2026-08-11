"use client";

import { Button } from "@/components/ui/Button";
import { LeadForm } from "./LeadForm";
import { SITE } from "@/lib/constants";
import type { OrientativeLevel, ScaleResult } from "@/lib/instruments";

interface ResultScreenProps {
  results: ScaleResult[];
  onRestart: () => void;
  onFinish: () => void;
}

const DOCTORALIA_URL = "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo";

const LEVEL_ORDER: OrientativeLevel[] = ["baja", "moderada", "elevada"];

const LEVEL_LABEL: Record<OrientativeLevel, string> = {
  baja: "Nivel orientativo bajo",
  moderada: "Nivel orientativo moderado",
  elevada: "Nivel orientativo elevado",
};

const LEVEL_COPY: Record<
  OrientativeLevel,
  { title: string; text: string }
> = {
  baja: {
    title: "Tus respuestas sugieren que te sientes bien en general",
    text: "Los malestares que consultaste aparecen con poca frecuencia en este momento. Es un buen punto de partida para seguir cuidando tu bienestar emocional. Si en algún momento cambia, siempre puedes buscar acompañamiento.",
  },
  moderada: {
    title: "Tus respuestas sugieren un malestar moderado",
    text: "Los malestares aparecen con una frecuencia que puede estar afectando tu día a día más de lo que parece. Conversar con una profesional puede ayudarte a entenderlos, ponerles palabras y manejarlos mejor.",
  },
  elevada: {
    title: "Tus respuestas sugieren un malestar significativo",
    text: "Los malestares aparecen con frecuencia y pueden estar pesando mucho sobre tu día a día. Buscar acompañamiento profesional cuanto antes puede ayudarte a sentirte mejor y recuperar tu equilibrio.",
  },
};

export function ResultScreen({ results, onRestart, onFinish }: ResultScreenProps) {
  const combinedLevel = results.reduce<OrientativeLevel>(
    (acc, r) =>
      LEVEL_ORDER.indexOf(r.level) > LEVEL_ORDER.indexOf(acc) ? r.level : acc,
    "baja"
  );
  const combinedCopy = LEVEL_COPY[combinedLevel];
  const whatsappUrl = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(
    SITE.whatsappMessage
  )}`;

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm">
          <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage-dark text-sm font-medium mb-5">
            Resultado orientativo
          </span>
          <h1 className="font-serif text-4xl text-charcoal mb-6">
            {combinedCopy.title}
          </h1>
          <p className="text-warm-gray leading-relaxed mb-8">
            {combinedCopy.text}
          </p>

          <div className="grid gap-6 mb-8">
            {results.map((result) => {
              const instrumentTitle =
                result.scale === "phq9"
                  ? "Estado de ánimo (PHQ-9)"
                  : "Ansiedad (GAD-7)";
              return (
                <div
                  key={result.scale}
                  className="rounded-xl border border-sand bg-ivory p-6"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <h2 className="font-serif text-xl text-charcoal">
                      {instrumentTitle}
                    </h2>
                    <span className="text-sm font-medium text-sage-dark">
                      {LEVEL_LABEL[result.level]}
                    </span>
                  </div>
                  <p className="text-warm-gray mb-4">
                    <strong>
                      Total orientativo: {result.total} de {result.max}
                    </strong>
                  </p>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    Banderas oficiales de referencia:{" "}
                    {result.officialCutpoints
                      .map((c) => c.label)
                      .join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-terracotta/30 bg-terracotta/5 p-5 mb-8">
            <p className="text-sm text-warm-gray leading-relaxed">
              Esta autoevaluación es <strong>orientativa</strong>: no es un
              diagnóstico ni un consejo médico, y no reemplaza la evaluación de
              un profesional de la salud mental. Solo un profesional puede
              valorar tu situación de forma individual.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button href={DOCTORALIA_URL} size="lg" className="w-full sm:w-auto">
              Agendar mi primera sesión
            </Button>
            <Button href={whatsappUrl} variant="outline" size="lg" className="w-full sm:w-auto">
              Escribir por WhatsApp
            </Button>
          </div>

          <LeadForm onDismiss={onFinish} />

          <div className="text-center mt-10">
            <button
              onClick={onRestart}
              className="min-h-[44px] px-4 text-sm text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              Reiniciar la evaluación
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
