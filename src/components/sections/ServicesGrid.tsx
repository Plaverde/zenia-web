import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/db";
import { SERVICES } from "@/lib/constants";

export async function ServicesGrid() {
  let services: { id: string; title: string; description: string }[] = [];

  try {
    const dbServices = await prisma.services.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
      },
    });

    if (dbServices.length > 0) {
      services = dbServices.map((s) => ({
        id: s.slug || String(s.id),
        title: s.title,
        description: s.description,
      }));
    }
  } catch {
    // Fall through to constants
  }

  if (services.length === 0) {
    services = SERVICES.slice(0, 3).map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
    }));
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Servicios"
          subtitle="Acompañamiento profesional adaptado a tus necesidades"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-ivory rounded-2xl p-6 border border-sand/50"
            >
              <h3 className="font-serif text-xl text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <Link
                href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo"
                className="text-sage-dark font-medium text-sm hover:text-sage underline underline-offset-2 transition-colors"
              >
                Agendar sesión →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/servicios" variant="outline">
            Ver todos los servicios
          </Button>
        </div>
      </div>
    </section>
  );
}
