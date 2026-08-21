import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Recursos educativos de psicología: artículos, guías, ejercicios y meditaciones para cuidar tu salud mental.",
  alternates: {
    canonical: "/recursos",
  },
};

const resourceCategories = [
  {
    icon: "📝",
    title: "Artículos",
    description: "Contenido educativo sobre salud mental, ansiedad, depresión y bienestar emocional.",
    href: "/blog",
    cta: "Ver artículos",
  },
  {
    icon: "📄",
    title: "Guías PDF",
    description: "Material descargable con ejercicios prácticos, listas de hábitos saludables y herramientas de autoayuda.",
    href: "#",
    cta: "Próximamente",
    disabled: true,
  },
  {
    icon: "🎥",
    title: "Videos",
    description: "Contenido en video sobre técnicas de regulación emocional, mindfulness y bienestar.",
    href: "#",
    cta: "Próximamente",
    disabled: true,
  },
  {
    icon: "🧘",
    title: "Meditaciones",
    description: "Guías de meditación y mindfulness para el manejo del estrés, la ansiedad y el sueño.",
    href: "#",
    cta: "Próximamente",
    disabled: true,
  },
];

const suggestedTopics = [
  "Ansiedad",
  "Regulación emocional",
  "Autoestima",
  "Estrés",
  "Relaciones sanas",
  "Mindfulness",
  "Psicología basada en evidencia",
  "Terapia ACT",
  "Cuidado del bienestar",
];

export default function RecursosPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading as="h1"
              title="Recursos"
              subtitle="Herramientas y contenido educativo para cuidar tu salud mental"
            />
            <p className="text-center text-warm-gray max-w-2xl mx-auto mb-12">
              Encuentra artículos, guías, videos y meditaciones diseñados para
              acompañar tu proceso de bienestar emocional. Todo el contenido está
              basado en evidencia científica.
            </p>

            {/* Autoevaluación destacada */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand/50 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-sage/10 text-sage-dark text-sm font-medium mb-4">
                  Herramienta de autoconocimiento
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
                  Autoevaluación de ansiedad y depresión
                </h3>
                <p className="text-warm-gray leading-relaxed">
                  Cuestionarios orientativos PHQ-9 y GAD-7 para reflexionar sobre
                  cómo te has sentido en las últimas dos semanas. Tus respuestas
                  se calculan en tu dispositivo y no se guardan: el resultado es
                  informativo y no constituye un diagnóstico.
                </p>
              </div>
              <Button href="/autoevaluacion" size="lg" className="shrink-0">
                Hacer la autoevaluación
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {resourceCategories.map((category) => (
                <div
                  key={category.title}
                  className={`bg-white rounded-2xl p-8 border border-sand/50 ${
                    category.disabled ? "opacity-60" : ""
                  }`}
                >
                  <span className="text-4xl mb-4 block">{category.icon}</span>
                  <h3 className="font-serif text-2xl text-charcoal mb-3">
                    {category.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed mb-6">
                    {category.description}
                  </p>
                  {category.disabled ? (
                    <span className="text-warm-gray-light text-sm font-medium">
                      {category.cta}
                    </span>
                  ) : (
                    <Button href={category.href} variant="outline" size="sm">
                      {category.cta}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Temas sugeridos */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Temas que encontrarás"
              subtitle="Contenido educativo sobre las áreas más relevantes de la salud mental"
            />

            <div className="flex flex-wrap justify-center gap-3">
              {suggestedTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 bg-sage/10 text-sage-dark rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl text-charcoal mb-4">
              ¿Tienes preguntas?
            </h2>
            <p className="text-warm-gray mb-8 max-w-2xl mx-auto">
              Si encuentras un artículo que te interesa o tienes alguna pregunta
              sobre el contenido, no dudes en escribirme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/blog" variant="outline">
                Ver el blog
              </Button>
              <Button href="/contacto">
                Contactar
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
