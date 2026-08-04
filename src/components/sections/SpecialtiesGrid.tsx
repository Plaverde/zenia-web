import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SPECIALTIES } from "@/lib/constants";

export function SpecialtiesGrid() {
  const displaySpecialties = SPECIALTIES.slice(0, 8);

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Especialidades"
          subtitle="Áreas de enfoque terapéutico con respaldo científico"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displaySpecialties.map((specialty) => (
            <Link
              key={specialty.slug}
              href={`/especialidades/${specialty.slug}`}
            >
              <Card variant="hover" className="h-full" as="div">
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {specialty.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed line-clamp-3">
                  {specialty.summary}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/especialidades"
            className="text-sage-dark font-medium hover:text-sage underline underline-offset-2 transition-colors"
          >
            Ver todas las especialidades →
          </Link>
        </div>
      </div>
    </section>
  );
}
