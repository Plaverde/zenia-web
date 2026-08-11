import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative bg-ivory py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <p className="text-sage-dark font-medium mb-4">Psicóloga Clínica en Montería</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 leading-tight">
              Acompañamiento psicológico para ansiedad y depresión
            </h1>
            <p className="text-lg md:text-xl text-warm-gray mb-8 leading-relaxed">
              Terapias de tercera generación — ACT y mindfulness — para personas
              en Montería y modalidad virtual. Un espacio seguro donde explorar
              lo que sientes y construir herramientas concretas para tu bienestar
              emocional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" size="lg">
                Agendar Primera Sesión
              </Button>
              <Button href="/terapia-online" variant="outline" size="lg">
                Terapia Online
              </Button>
            </div>
            <p className="mt-6">
              <Link
                href="/autoevaluacion"
                className="inline-flex items-center gap-1.5 text-sage-dark font-medium hover:text-charcoal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage rounded"
              >
                ¿Quieres entender cómo te sientes? Haz una autoevaluación
                orientativa
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-zenia.webp"
                alt="Psicóloga Zenia Álvarez Gulfo - Consultorio de psicología en Montería"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
