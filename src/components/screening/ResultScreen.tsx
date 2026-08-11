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

const LEVEL_WORD: Record<OrientativeLevel, string> = {
  baja: "bajo",
  moderada: "moderado",
  elevada: "elevado",
};

// Colores por nivel: el texto sigue siendo accesible (charcoal/warm-gray),
// el color es un apoyo visual, no la única señal.
const LEVEL_THEME: Record<
  OrientativeLevel,
  { badge: string; dot: string; bar: string }
> = {
  baja: { badge: "bg-sage/15", dot: "bg-sage", bar: "bg-sage" },
  moderada: {
    badge: "bg-terracotta/20",
    dot: "bg-terracotta",
    bar: "bg-terracotta",
  },
  elevada: {
    badge: "bg-terracotta-dark/25",
    dot: "bg-terracotta-dark",
    bar: "bg-terracotta-dark",
  },
};

const LEVEL_COPY: Record<OrientativeLevel, { title: string; text: string }> = {
  baja: {
    title: "Tu bienestar emocional se ve estable en este momento",
    text: "Los malestares que mencionaste aparecen poco y no parecen estar afectando tu día a día. Es un buen momento para seguir cuidándote: lo que haces hoy sostiene tu bienestar mañana.",
  },
  moderada: {
    title: "Hay señales de malestar que vale la pena atender",
    text: "Algunos malestares aparecen con una frecuencia que puede estar pesándote más de lo que parece. Reconocerlo es un primer paso importante, y conversarlo con una profesional puede ayudarte a manejarlos mejor.",
  },
  elevada: {
    title: "Las señales indican que estás pasando por un momento difícil",
    text: "Estos malestares aparecen con frecuencia y pueden estar afectando tu día a día. Buscar acompañamiento profesional es una decisión valiosa: no tienes que atravesarlo solo/a.",
  },
};

// Explicación en lenguaje cotidiano, escala por escala.
const LEVEL_MEANING: Record<
  OrientativeLevel,
  Record<"phq9" | "gad7", string>
> = {
  baja: {
    phq9:
      "Tu estado de ánimo se ve estable en este momento. Sigue con lo que te está funcionando: descanso, movimiento suave y momentos de pausa.",
    gad7:
      "La ansiedad parece estar en un nivel manejable ahora mismo. Mantener hábitos que te dan calma te ayuda a seguir así.",
  },
  moderada: {
    phq9:
      "Hay señales de que el ánimo te está pesando más de lo habitual. Ponerle palabras a lo que sientes, con alguien de confianza o con una profesional, es un buen primer paso.",
    gad7:
      "La ansiedad aparece con más frecuencia de lo cómodo. Aprender a reconocerla y entenderla puede devolverte sensación de control.",
  },
  elevada: {
    phq9:
      "Las señales indican que el estado de ánimo está afectando bastante tu día a día. Buscar apoyo profesional es una decisión valiente y útil: no tienes que atravesarlo solo/a.",
    gad7:
      "La ansiedad parece estar ocupando mucho espacio en tu vida. Un acompañamiento profesional puede ayudarte a recuperar la calma paso a paso.",
  },
};

// Pasos sencillos y sin presión, según el nivel.
const NEXT_STEPS: Record<OrientativeLevel, string[]> = {
  baja: [
    "Sigue cuidando tus rutinas: descanso, movimiento suave y pausas durante el día.",
    "Si en algún momento empiezas a sentirte peor, no dudes en buscar ayuda.",
    "Puedes repetir esta autoevaluación cuando quieras para notar cómo evolucionas.",
  ],
  moderada: [
    "Conversa sobre cómo te sientes: con alguien de confianza o con una profesional.",
    "Observa tu sueño, tu actividad y tu alimentación: pequeños ajustes suman.",
    "Considera agendar una primera sesión para explorar lo que está pasando.",
  ],
  elevada: [
    "Prioriza buscar apoyo profesional: una primera conversación puede darte alivio.",
    "Cuida tu seguridad: si sientes que no puedes controlar un impulso de hacerte daño, llama a la Línea 106 o al 123.",
    "Pedir ayuda no es debilidad: es una decisión valiente y un paso importante.",
  ],
};

function ScoreBar({
  total,
  max,
  barClass,
}: {
  total: number;
  max: number;
  barClass: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round((total / max) * 100)));
  return (
    <div className="mt-2" aria-hidden="true">
      <div className="h-2.5 rounded-full bg-sand overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${barClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-warm-gray-light mt-1">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: ScaleResult }) {
  const theme = LEVEL_THEME[result.level];
  const instrumentTitle =
    result.scale === "phq9" ? "Estado de ánimo" : "Ansiedad";
  const meaning = LEVEL_MEANING[result.level][result.scale];

  return (
    <div className="rounded-xl border border-sand bg-ivory p-6">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="font-serif text-xl text-charcoal">{instrumentTitle}</h2>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-charcoal ${theme.badge}`}
        >
          <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
          {LEVEL_LABEL[result.level]}
        </span>
      </div>

      <p className="text-warm-gray">
        <strong className="text-charcoal font-semibold">
          Total orientativo: {result.total} de {result.max}
        </strong>
      </p>
      <ScoreBar total={result.total} max={result.max} barClass={theme.bar} />

      <p className="text-sm text-warm-gray leading-relaxed mt-4">
        <strong className="text-charcoal font-medium">Qué significa: </strong>
        {meaning}
      </p>
      <p className="text-xs text-warm-gray-light leading-relaxed mt-2">
        Referencia oficial del cuestionario:{" "}
        {result.officialCutpoints.map((c) => c.label).join(" · ")}
      </p>
    </div>
  );
}

export function ResultScreen({ results, onRestart, onFinish }: ResultScreenProps) {
  const combinedLevel = results.reduce<OrientativeLevel>(
    (acc, r) =>
      LEVEL_ORDER.indexOf(r.level) > LEVEL_ORDER.indexOf(acc) ? r.level : acc,
    "baja"
  );
  const combinedCopy = LEVEL_COPY[combinedLevel];
  const combinedTheme = LEVEL_THEME[combinedLevel];
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
          <p className="text-sm text-sage-dark font-medium mb-2">
            Gracias por dedicarte este momento para ti.
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            {combinedCopy.title}
          </h1>
          <p className="text-warm-gray leading-relaxed mb-4">
            {combinedCopy.text}
          </p>

          {/* Resumen general */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              className={`w-3 h-3 rounded-full ${combinedTheme.dot}`}
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-warm-gray">
              Resultado general: nivel {LEVEL_WORD[combinedLevel]}
            </span>
          </div>

          {/* Desglose por escala */}
          <div className="grid gap-6 mb-8">
            {results.map((result) => (
              <ResultCard key={result.scale} result={result} />
            ))}
          </div>

          {/* Qué puedes hacer ahora */}
          <div className="rounded-xl border border-sage/30 bg-sage/5 p-6 mb-8">
            <h2 className="font-serif text-xl text-charcoal mb-1">
              Qué puedes hacer ahora
            </h2>
            <p className="text-sm text-warm-gray mb-4">
              Ideas sencillas, sin presión. Elige la que te haga sentido.
            </p>
            <ol className="space-y-3">
              {NEXT_STEPS[combinedLevel].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sage/20 text-sage-dark text-xs font-semibold mt-0.5 shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-warm-gray leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Aclaración */}
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
            <Button
              href={whatsappUrl}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
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
