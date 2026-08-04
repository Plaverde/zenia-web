import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmergencyBanner } from "@/components/ui/EmergencyBanner";

export const metadata: Metadata = {
  title: "Derechos de las Personas en Salud Mental",
  description:
    "Conoce tus derechos como persona en el ámbito de la salud mental, conforme a la Ley 2460 de 2025 en Colombia.",
};

const derechos = [
  {
    numero: "1",
    titulo: "Derecho a la salud mental como derecho fundamental",
    descripcion:
      "La salud mental es parte del derecho fundamental a la salud. Tienes derecho a recibir atención integral que promueva tu bienestar emocional, prevenga trastornos y provea tratamiento cuando sea necesario.",
  },
  {
    numero: "2",
    titulo: "Derecho a recibir atención libre de estigma y discriminación",
    descripcion:
      "Nadie puede ser discriminado, estigmatizado o sometido a tratos crueles por su condición de salud mental. La Ley 2460 de 2025 protege tu dignidad en todo momento.",
  },
  {
    numero: "3",
    titulo: "Derecho a la confidencialidad",
    descripcion:
      " toda información que compartas en el proceso terapéutico es estrictamente confidencial. Tu psicóloga está obligada a proteger la reserva de lo que se converse en sesión, salvo excepciones previstas por la ley.",
  },
  {
    numero: "4",
    titulo: "Derecho a la información clara",
    descripcion:
      "Tienes derecho a recibir información completa y comprensible sobre los procesos, tratamientos, técnicas que se utilizarán, sus alcances, limitaciones y costos, antes de iniciar cualquier intervención.",
  },
  {
    numero: "5",
    titulo: "Derecho al consentimiento informado",
    descripcion:
      "Ningún tratamiento psicológico puede iniciar sin tu consentimiento libre, previo e informado. Tienes derecho a preguntar, dudar y decidir conociendo todas las condiciones del proceso.",
  },
  {
    numero: "6",
    titulo: "Derecho a la autonomía",
    descripcion:
      "Tienes derecho a tomar decisiones sobre tu proceso terapéutico. Tu psicóloga acompañará tus decisiones sin imponer juicios ni condicionamientos, respetando tu libertad y valores personales.",
  },
  {
    numero: "7",
    titulo: "Derecho a presentar quejas y reclamos",
    descripcion:
      "Si consideras que no estás recibiendo una atención adecuada, tienes derecho a presentar quejas ante la Superintendencia Nacional de Salud o las autoridades competentes.",
  },
  {
    numero: "8",
    titulo: "Derecho a interrumpir voluntariamente el tratamiento",
    descripcion:
      "Puedes decidir en cualquier momento interrumpir el proceso terapéutico. Tu psicóloga debe informarte sobre las implicaciones de esta decisión de manera respetuosa.",
  },
  {
    numero: "9",
    titulo: "Derecho a un enfoque diferencial",
    descripcion:
      "La atención debe considerar tu contexto cultural, territorial, de género, etnia, edad y condiciones particulares. La Ley 2460 de 2025 garantiza un trato adaptado a tu realidad.",
  },
  {
    numero: "10",
    titulo: "Derecho a la educación emocional",
    descripcion:
      "Tienes derecho a acceder a información y herramientas que te permitan desarrollar habilidades para el manejo de tus emociones, la resolución de conflictos y el autocuidado.",
  },
];

export default function DerechosPersonasPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Tus derechos en salud mental"
              subtitle="Conforme a la Ley 2460 de 2025, que modifica la Ley 1616 de 2013, estas son tus derechos como persona en el ámbito de la salud mental en Colombia."
              align="center"
            />

            <div className="mt-4 p-4 rounded-xl bg-sage/5 border border-sage/20 text-center">
              <p className="text-sm text-warm-gray">
                <strong className="text-charcoal">Artículo 6, Ley 2460 de 2025:</strong>{" "}
                Este catálogo de derechos debe publicarse en un lugar visible y accesible, así como en los espacios de atención virtual de las instituciones que brindan atención en salud mental.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {derechos.map((derecho) => (
                <div
                  key={derecho.numero}
                  className="flex gap-6 p-6 rounded-2xl bg-ivory/50 border border-sand"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center">
                    <span className="text-sage-dark font-medium text-lg">
                      {derecho.numero}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-charcoal mb-2">
                      {derecho.titulo}
                    </h3>
                    <p className="text-warm-gray leading-relaxed">
                      {derecho.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-ivory">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <EmergencyBanner />

            <div className="mt-8 p-6 rounded-2xl bg-white border border-sand">
              <h3 className="font-serif text-xl text-charcoal mb-3">
                Referencia legal
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                Los derechos aquí enumerados corresponden al Artículo 6 de la Ley 2460 de 2025, que modifica la Ley 1616 de 2013, en materia de prevención y atención de trastornos y/o enfermedades mentales, así como medidas para la promoción y cuidado de la salud mental. Esta ley fue sancionada el 16 de junio de 2025 por el Congreso de la República de Colombia.
              </p>
              <p className="text-warm-gray text-sm leading-relaxed mt-3">
                Si consideras que alguno de estos derechos ha sido vulnerado, puedes contactar a la{" "}
                <strong>Superintendencia Nacional de Salud</strong> o a las autoridades competentes en tu territorio.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
