import { Button } from "@/components/ui/Button";

export function SelfAssessmentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-sage/30 bg-sage/5 p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-sage/15 text-sage-dark text-sm font-medium mb-4">
              Autoconocimiento
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="text-warm-gray leading-relaxed mb-6">
              Responde un breve cuestionario orientativo y obtén una lectura
              clara, en lenguaje sencillo, sobre tu estado de ánimo y tu
              ansiedad en las últimas dos semanas.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sage/15 shrink-0">
                  <svg
                    className="w-4 h-4 text-sage-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                </span>
                <span className="text-warm-gray leading-relaxed pt-1">
                  Solo toma <strong className="text-charcoal font-medium">2 a 3 minutos</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sage/15 shrink-0">
                  <svg
                    className="w-4 h-4 text-sage-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <span className="text-warm-gray leading-relaxed pt-1">
                  <strong className="text-charcoal font-medium">Anónimo</strong>: tus
                  respuestas no se guardan ni salen de tu dispositivo.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sage/15 shrink-0">
                  <svg
                    className="w-4 h-4 text-sage-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" d="M12 16v-4" />
                    <path strokeLinecap="round" d="M12 8h.01" />
                  </svg>
                </span>
                <span className="text-warm-gray leading-relaxed pt-1">
                  <strong className="text-charcoal font-medium">Orientativo</strong>: no es
                  un diagnóstico ni reemplaza la atención profesional.
                </span>
              </li>
            </ul>
            <Button href="/autoevaluacion" size="lg">
              Hacer la autoevaluación
            </Button>
          </div>

          {/* Ejemplo ilustrativo del resultado */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-sand/60 shadow-sm p-6">
              <p className="text-sm text-warm-gray mb-4 font-medium">
                Así se verá tu resultado
              </p>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-charcoal">
                      Estado de ánimo (PHQ-9)
                    </span>
                    <span className="text-xs text-warm-gray">11 de 27</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-sand overflow-hidden">
                    <div
                      className="h-2.5 rounded-full bg-sage"
                      style={{ width: "41%" }}
                    />
                  </div>
                  <p className="text-xs text-warm-gray-light mt-1.5">
                    Nivel orientativo moderado
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-charcoal">
                      Ansiedad (GAD-7)
                    </span>
                    <span className="text-xs text-warm-gray">13 de 21</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-sand overflow-hidden">
                    <div
                      className="h-2.5 rounded-full bg-terracotta"
                      style={{ width: "62%" }}
                    />
                  </div>
                  <p className="text-xs text-warm-gray-light mt-1.5">
                    Nivel orientativo elevado
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-warm-gray-light mt-4">
                Ejemplo ilustrativo de cómo se ve la lectura de resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
