import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Consentimiento Informado - Terapia Online",
  description:
    "Consentimiento informado para el servicio de telepsicología con Zenia Álvarez Gulfo, conforme a la normativa vigente en Colombia.",
};

export default function ConsentimientoInformadoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Consentimiento Informado"
              subtitle="Terapia Online / Telepsicología"
            />

            <div className="bg-white rounded-2xl p-8 border border-sand/50 shadow-sm prose prose-lg max-w-none">
              <h2 className="font-serif text-2xl text-charcoal">
                Consentimiento Informado para Telepsicología
              </h2>

              <p className="text-warm-gray">
                El presente documento establece los términos y condiciones del servicio
                de atención psicológica a distancia (telepsicología) ofrecido por
                <strong> Zenia Álvarez Gulfo</strong>,Psicóloga Clínica.
              </p>

              <h3 className="font-serif text-xl text-charcoal">
                1. ¿Qué es la telepsicología?
              </h3>
              <p className="text-warm-gray">
                La telepsicología es la prestación de servicios psicológicos a través
                de tecnologías de la información y la comunicación, específicamente por
                videollamada. Esta modalidad está reconocida por la Ley 2460 de 2025 y
                la Resolución 1888 de 2025 como una forma válida de atención en salud mental.
              </p>

              <h3 className="font-serif text-xl text-charcoal">
                2. Limitaciones de la terapia online
              </h3>
              <p className="text-warm-gray">
                Aunque la terapia online es efectiva para la mayoría de situaciones,
                existen limitaciones que debo conocer:
              </p>
              <ul className="text-warm-gray">
                <li>No sustituye la atención de emergencias psiquiátricas agudas.</li>
                <li>Requiere una conexión estable de internet y un ambiente privado.</li>
                <li>En algunos casos, puede ser necesaria la valoración presencial.</li>
                <li>No aplica para procedimientos que requieran contacto físico directo.</li>
              </ul>

              <h3 className="font-serif text-xl text-charcoal">
                3. Privacidad y confidencialidad
              </h3>
              <p className="text-warm-gray">
                Las sesiones se realizan a través de plataformas con cifrado de extremo
                a extremo (Doxy.me o Zoom for Healthcare). Toda la información
                compartida durante las sesiones es estrictamente confidencial, conforme
                a las normas éticas de la psicología en Colombia y la Ley 1581 de 2012
                sobre protección de datos personales.
              </p>

              <h3 className="font-serif text-xl text-charcoal">
                4. Derecho de revocación
              </h3>
              <p className="text-warm-gray">
                Usted puede retirarse del servicio de terapia online en cualquier momento,
                sin necesidad de justificación y sin penalización. Al hacerlo, se
                respetará la confidencialidad de toda la información compartida.
              </p>

              <h3 className="font-serif text-xl text-charcoal">
                5. Responsabilidades del paciente
              </h3>
              <ul className="text-warm-gray">
                <li>Contar con un espacio privado durante la sesión.</li>
                <li>Garantizar una conexión a internet estable.</li>
                <li>Comunicar con anticipación cualquier inconveniente técnico.</li>
                <li>Comunicar cualquier cambio en su estado de salud que pueda afectar el proceso terapéutico.</li>
              </ul>

              <h3 className="font-serif text-xl text-charcoal">
                6. Datos de contacto de emergencia
              </h3>
              <p className="text-warm-gray">
                En caso de crisis emocional, autolesión o ideación suicida durante
                fuera de la sesión:
              </p>
              <ul className="text-warm-gray">
                <li>Línea de emergencias Colombia: <strong>123</strong></li>
                <li>Línea 106 (Salud Mental): <strong>106</strong></li>
                <li>SAMU: <strong>125</strong></li>
              </ul>

              <h3 className="font-serif text-xl text-charcoal">
                7. Marco normativo
              </h3>
              <p className="text-warm-gray">
                Este consentimiento se fundamenta en:
              </p>
              <ul className="text-warm-gray">
                <li>Ley 2460 de 2025 (Salud Mental)</li>
                <li>Ley 1616 de 2013 (Salud Mental)</li>
                <li>Ley 1581 de 2012 (Protección de Datos Personales)</li>
                <li>Resolución 1888 de 2025 (Historia Clínica Electrónica)</li>
                <li>Resolución 3100 de 2019 (Habilitación de Servicios de Salud)</li>
              </ul>

              <div className="mt-8 p-6 rounded-2xl bg-sage/5 border border-sage/20">
                <p className="text-warm-gray text-sm italic">
                  <strong>Aclaración:</strong> Este consentimiento informado es un
                  documento de carácter informativo que forma parte del proceso de
                  contratación del servicio de terapia online. El consentimiento
                  electrónico se formaliza al momento de agendar y confirmar la primera
                  sesión virtual.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
