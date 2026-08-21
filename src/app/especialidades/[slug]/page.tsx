import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { EmergencyBanner } from "@/components/ui/EmergencyBanner";
import { SPECIALTIES, FAQS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const specialty = SPECIALTIES.find((s) => s.slug === slug);
  if (!specialty) return {};

  return {
    title: `${specialty.title} | Terapia psicológica en Montería con Zenia Álvarez Gulfo`,
    description: specialty.summary,
    alternates: {
      canonical: `/especialidades/${slug}`,
    },
    openGraph: {
      title: `${specialty.title} | Terapia psicológica en Montería`,
      description: specialty.summary,
      type: "article",
      images: [
        {
          url: "/images/hero-zenia.webp",
          width: 1200,
          height: 630,
          alt: specialty.title,
        },
      ],
    },
  };
}

export default async function EspecialidadPage({ params }: Props) {
  const { slug } = await params;
  const specialty = SPECIALTIES.find((s) => s.slug === slug);

  if (!specialty) {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sage-dark font-medium mb-2">Especialidad</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-8">
              {specialty.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-warm-gray leading-relaxed mb-8">
                {specialty.summary}
              </p>

              <div className="text-warm-gray leading-relaxed space-y-6">
                {specialty.description.split(". ").reduce(
                  (acc: string[], sentence, i, arr) => {
                    if (i % 3 === 0) {
                      const chunk = arr.slice(i, i + 3).join(". ");
                      acc.push(chunk.endsWith(".") ? chunk : chunk + ".");
                    }
                    return acc;
                  },
                  []
                ).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Técnicas utilizadas */}
              {"techniques" in specialty && (
                <div className="mt-8 p-6 rounded-2xl bg-sand/30 border border-sand/50">
                  <h3 className="font-serif text-xl text-charcoal mb-3">
                    Técnicas utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(specialty as { techniques: readonly string[] }).techniques.map((technique) => (
                      <span
                        key={technique}
                        className="px-3 py-1 bg-sage/10 text-sage-dark rounded-full text-sm font-medium"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Enfoque biopsicosocial */}
              {"biopsychosocial" in specialty && (
                <div className="mt-8 p-6 rounded-2xl bg-sage/5 border border-sage/20">
                  <h3 className="font-serif text-xl text-charcoal mb-3">
                    Enfoque biopsicosocial
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {(specialty as { biopsychosocial: string }).biopsychosocial}
                  </p>
                </div>
              )}
            </div>

            {/* Emergency Banner */}
            {specialty.showEmergencyBanner && (
              <div className="mt-8">
                <EmergencyBanner />
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" size="lg">
                Agendar sesión
              </Button>
              <Button href="/especialidades" variant="outline" size="lg">
                Ver otras especialidades
              </Button>
            </div>
          </div>
        </section>

        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.slice(0, 4).map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
