import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SPECIALTIES, SPECIALTY_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Especialidades",
  description:
    "Conoce las especialidades de Zenia Álvarez Gulfo: ansiedad, depresión, estrés, duelo, autoestima, terapia de pareja y más. Enfoques basados en evidencia científica.",
};

export default function EspecialidadesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Especialidades"
              subtitle="Áreas de enfoque terapéutico con respaldo científico"
            />

            {SPECIALTY_CATEGORIES.map((category) => {
              const categorySpecialties = SPECIALTIES.filter(
                (s) => s.category === category.id
              );
              if (categorySpecialties.length === 0) return null;

              return (
                <div key={category.id} className="mb-12">
                  <h2 className="font-serif text-2xl text-charcoal mb-6">
                    {category.label}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySpecialties.map((specialty) => (
                      <Link
                        key={specialty.slug}
                        href={`/especialidades/${specialty.slug}`}
                      >
                        <article className="bg-white rounded-2xl p-6 border border-sand/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                          <h3 className="font-serif text-xl text-charcoal mb-3">
                            {specialty.title}
                          </h3>
                          <p className="text-warm-gray text-sm leading-relaxed mb-4 line-clamp-3">
                            {specialty.summary}
                          </p>
                          <span className="text-sage-dark font-medium text-sm underline underline-offset-2">
                            Conocer más →
                          </span>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
