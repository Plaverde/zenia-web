import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce a Zenia Álvarez Gulfo, psicóloga clínica en Montería, Córdoba. Especialista en ansiedad y depresión con terapias de tercera generación.",
};

export default function SobreMiPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Foto */}
              <div className="md:w-1/3">
                <div className="sticky top-28 w-full aspect-square bg-sand rounded-2xl flex items-center justify-center">
                  <span className="text-warm-gray-light text-sm">[Foto profesional]</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="md:w-2/3">
                <SectionHeading as="h1"
                  title="Sobre mí"
                  subtitle="Conoce mi enfoque y trayectoria profesional"
                />

                <div className="space-y-8 text-warm-gray leading-relaxed">
                  <p className="text-lg">
                    Soy {SITE.name}, {SITE.profession} con enfoque en terapias de
                    tercera generación. Mi acompañamiento se centra en la persona,
                    no solo en el síntoma.
                  </p>

                  {/* Formación */}
                  <div>
                    <h2 className="font-serif text-2xl text-charcoal mb-4">
                      Formación y Experiencia
                    </h2>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">•</span>
                        <span>Psicología clínica, [UNIVERSIDAD]</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">•</span>
                        <span>Especialización en [ESPECIALIZACIÓN]</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">•</span>
                        <span>Diplomado en Terapia de Aceptación y Compromiso (ACT)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">•</span>
                        <span>Formación en mindfulness y terapias contextuales</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">•</span>
                        <span>Actualización permanente en nuevas tecnologías aplicadas a la salud mental</span>
                      </li>
                    </ul>
                  </div>

                  {/* Filosofía */}
                  <div>
                    <h2 className="font-serif text-2xl text-charcoal mb-4">
                      Mi Filosofía de Trabajo
                    </h2>
                    <div className="bg-sage/5 rounded-2xl p-6 border border-sage/20">
                      <p className="italic text-lg">
                        «No trabajo únicamente el síntoma; trabajo la raíz del
                        problema para lograr cambios duraderos.»
                      </p>
                    </div>
                    <p className="mt-4">
                      Mi enfoque se basa en la evidencia científica y en la
                      comprensión integral de cada persona. Creo que el bienestar
                      emocional no es la ausencia de dificultades, sino la capacidad
                      de enfrentarlas con herramientas, sentido y acompañamiento.
                    </p>
                  </div>

                  {/* Enfoque */}
                  <div>
                    <h2 className="font-serif text-2xl text-charcoal mb-4">
                      Mi Enfoque
                    </h2>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">✓</span>
                        <span>Terapias de tercera generación (ACT, Mindfulness, TCC)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">✓</span>
                        <span>Enfoque basado en evidencia científica</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">✓</span>
                        <span>Atención sin juicio y con empatía</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">✓</span>
                        <span>Modalidad presencial y virtual</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-sage-dark mt-1">✓</span>
                        <span>Confidencialidad estricta</span>
                      </li>
                    </ul>
                  </div>

                  {/* Acreditación */}
                  <div className="bg-ivory rounded-2xl p-6 border border-sand">
                    <h3 className="font-serif text-xl text-charcoal mb-3">
                      Acreditación y Habilitación
                    </h3>
                    <p className="text-sm">
                      {SITE.licenseInfo}. Como profesional de la salud, mantengo
                      actualización permanente en nuevas tecnologías aplicadas a la
                      atención en salud mental, conforme a la Ley 2460 de 2025.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button href="https://www.doctoralia.co/perfil/zenia-maria-alvarez-gulfo" size="lg">
                      Agendar primera sesión
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
