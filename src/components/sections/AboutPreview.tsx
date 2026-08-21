import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="aspect-[4/5] bg-sand rounded-2xl flex items-center justify-center">
            <span className="text-warm-gray-light text-sm">
              [Foto profesional]
            </span>
          </div>

          {/* Content */}
          <div>
            <p className="text-sage-dark font-medium mb-2">Sobre mí</p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
              Zenia Álvarez Gulfo
            </h2>
            <div className="space-y-4 text-warm-gray leading-relaxed">
              <p>
                Soy psicóloga clínica con especialización en terapias de tercera
                generación. Mi enfoque se centra en ayudarte a desarrollar
                habilidades reales para manejar la ansiedad, la depresión y las
                dificultades emocionales de la vida cotidiana.
              </p>
              <p>
                Creo que la terapia no se trata de eliminarse el dolor, sino de
                aprender a vivir con mayor flexibilidad, sentido y conexión con
                lo que realmente importa para ti.
              </p>
              <p>
                Mi consultorio se encuentra en el centro de Montería, pero
                también ofrezco sesiones virtuales para quienes no pueden
                asistir presencialmente.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/sobre-mi" variant="outline">
                Conocer más sobre mí
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
