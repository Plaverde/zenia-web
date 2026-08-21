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
            <p className="text-sage-dark font-medium mb-4">Psicóloga clínica en Montería</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 leading-tight">
              Acompañamiento psicológico para ansiedad y depresión
            </h1>
            <p className="text-lg md:text-xl text-warm-gray mb-8 leading-relaxed">
              Terapias de tercera generación, como ACT y mindfulness, para personas
              en Montería y modalidad virtual. Un espacio seguro donde explorar
              lo que sientes y construir herramientas concretas para tu bienestar
              emocional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" size="lg">
                Agendar primera sesión
              </Button>
              <Button href="/terapia-online" variant="outline" size="lg">
                Terapia online
              </Button>
            </div>
            {/* Invitación a la autoevaluación: tarjeta de bajo peso visual,
                por debajo de los dos CTA principales en la jerarquía. */}
            <Link
              href="/autoevaluacion"
              className="group mt-8 flex max-w-md items-stretch overflow-hidden rounded-xl border border-sand bg-sand-light transition-colors hover:border-terracotta-dark/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark"
            >
              <span className="w-1 shrink-0 bg-terracotta-dark" aria-hidden="true" />
              <span className="flex flex-1 items-center gap-4 px-4 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-dark text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 14 2 2 4-4" />
                  </svg>
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-charcoal">
                    ¿Cómo te sientes últimamente?
                  </span>
                  <span className="block text-sm text-warm-gray">
                    2 minutos, anónimo, sin registro
                  </span>
                </span>
                <svg
                  className="h-5 w-5 shrink-0 text-terracotta-dark transition-transform group-hover:translate-x-1"
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
              </span>
            </Link>
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
