import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/db";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Conoce los servicios de terapia psicológica de Zenia Álvarez Gulfo: terapia individual, atención para ansiedad y depresión, presencial y virtual en Montería.",
};

async function getServices() {
  try {
    const dbServices = await prisma.services.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        duration: true,
        price: true,
      },
    });

    if (dbServices.length > 0) {
      return dbServices.map((s) => ({
        id: s.slug || String(s.id),
        title: s.title,
        description: s.description,
        duration: s.duration || undefined,
        price: s.price || undefined,
      }));
    }
  } catch {
    // Fall through to constants
  }

  return SERVICES.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    duration: undefined,
    price: undefined,
  }));
}

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Servicios"
              subtitle="Acompañamiento profesional adaptado a tus necesidades. Cada servicio es un espacio seguro para trabajar tu bienestar emocional."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-8 border border-sand/50 shadow-sm"
                >
                  <h3 className="font-serif text-2xl text-charcoal mb-4">
                    {service.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed mb-4">
                    {service.description}
                  </p>
                  {(service.duration || service.price) && (
                    <div className="flex gap-4 text-sm text-warm-gray mb-6">
                      {service.duration && <span>⏱ {service.duration}</span>}
                      {service.price && <span>💰 {service.price}</span>}
                    </div>
                  )}
                  <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" variant="outline" size="sm">
                    Agendar Sesión
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-sage-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              ¿No estás seguro/a de qué servicio necesitas?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              En la primera sesión evaluaremos tu situación juntos y
              determinaremos el mejor camino a seguir. No necesitas tener todas
              las respuestas para empezar.
            </p>
            <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" variant="secondary" size="lg">
              Reservar Primera Sesión
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
