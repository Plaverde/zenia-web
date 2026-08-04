import Image from "next/image";
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
