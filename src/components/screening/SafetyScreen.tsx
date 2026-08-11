"use client";

import { Button } from "@/components/ui/Button";
import { getSafetyResources } from "@/lib/safety-resources";

interface SafetyScreenProps {
  onContinue: () => void;
  onRestart: () => void;
}

const DOCTORALIA_URL = "https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo";

export function SafetyScreen({ onContinue, onRestart }: SafetyScreenProps) {
  const resources = getSafetyResources("CO");

  return (
    <section className="py-16 bg-ivory">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 shadow-sm">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-5">
            Gracias por responder con honestidad
          </h1>
          <p className="text-warm-gray leading-relaxed mb-4">
            Lo que marcaste es importante y merece atención. Quiero que sepas
            que no estás solo/a y que hay personas y líneas de ayuda
            disponibles para acompañarte en este momento.
          </p>
          <p className="text-warm-gray leading-relaxed mb-8">
            Si sientes que no puedes esperar, habla ahora con alguien de
            confianza o comunícate con alguna de las líneas de atención:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {resources.numbers.map((number) => (
              <a
                key={number.value}
                href={`tel:${number.tel ?? number.value}`}
                className="block p-4 rounded-xl border-2 border-sage bg-sage/5 text-center hover:bg-sage/10 transition-colors min-h-[88px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                <span className="block font-serif text-3xl text-sage-dark">
                  {number.value}
                </span>
                <span className="block text-sm text-warm-gray mt-1">
                  {number.label}
                </span>
              </a>
            ))}
          </div>

          <p className="text-sm text-warm-gray leading-relaxed mb-8">
            {resources.note} Este sitio no es un servicio de emergencia ni
            ofrece monitoreo permanente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={DOCTORALIA_URL} size="lg" className="w-full sm:w-auto">
              Buscar ayuda profesional ahora
            </Button>
            <Button
              onClick={onContinue}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Continuar y ver mi resultado
            </Button>
          </div>
          <button
            onClick={onRestart}
            className="mt-6 text-sm text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            Reiniciar la evaluación
          </button>
        </div>
      </div>
    </section>
  );
}
