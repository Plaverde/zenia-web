import { SITE } from "@/lib/constants";

export function ProfessionalProfile() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Foto */}
          <div className="w-48 h-48 rounded-full bg-sand flex-shrink-0 flex items-center justify-center overflow-hidden">
            <span className="text-warm-gray-light text-sm">[Foto profesional]</span>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-2">
              {SITE.name}
            </h2>
            <p className="text-sage-dark font-medium mb-1">{SITE.profession}</p>
            <p className="text-warm-gray text-sm mb-3">
              Reg. Profesional: {SITE.registrationNumber}
            </p>
            <p className="text-warm-gray leading-relaxed">
              Especialista en ansiedad y depresión con terapias de tercera generación.
              Acompaño a personas en Montería y virtualmente que buscan herramientas
              concretas para manejar la ansiedad, la depresión y el estrés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
