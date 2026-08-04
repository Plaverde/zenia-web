import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre terapia psicológica, sesiones, costos y confidencialidad con Zenia Álvarez Gulfo.",
};

type FaqItem = {
  id: number;
  question: string;
  answer: string;
  order: number;
  active: boolean;
};

async function getFaqs(): Promise<FaqItem[]> {
  try {
    const faqs = await prisma.faq_items.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    return faqs;
  } catch {
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFaqs();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Preguntas Frecuentes"
              subtitle="Resuelve tus dudas antes de agendar tu primera sesión"
            />

            <div className="bg-white rounded-2xl border border-sand/50 shadow-sm divide-y divide-sand">
              {faqs.length === 0 ? (
                <p className="p-8 text-center text-warm-gray">
                  Próximamente publicaremos respuestas a tus preguntas más
                  comunes.
                </p>
              ) : (
                faqs.map((faq) => (
                  <div key={faq.id} className="px-6 md:px-8">
                    <AccordionItem
                      question={faq.question}
                      answer={faq.answer}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="mt-12 text-center">
              <p className="text-warm-gray mb-4">
                ¿No encontraste la respuesta que buscabas?
              </p>
              <a
                href="/contacto"
                className="text-sage-dark font-medium hover:text-charcoal underline underline-offset-2 transition-colors"
              >
                Escríbeme y con gusto te respondo →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
