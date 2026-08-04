import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Conversemos sobre lo que te trae",
    description:
      "Tendrás un espacio seguro para contar, en tus palabras, qué te preocupa y qué esperas del acompañamiento. No necesitas tenerlo todo claro.",
  },
  {
    number: "02",
    title: "Exploramos tu situación sin juicio",
    description:
      "Juntos entendemos cómo se presenta lo que estás viviendo, desde un enfoque biopsicosocial que integra tu historia, emociones y contexto.",
  },
  {
    number: "03",
    title: "Definimos si este acompañamiento es adecuado",
    description:
      "Evaluamos si mi enfoque terapéutico tiene sentido para ti. Si no es el caso, te oriento hacia la mejor alternativa.",
  },
  {
    number: "04",
    title: "Acordamos el siguiente paso",
    description:
      "Si decidimos continuar, organizamos la frecuencia, modalidad y objetivos iniciales del proceso terapéutico.",
  },
];

export function FirstSession() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="¿Qué puedes esperar en tu primera sesión?"
          subtitle="Un primer encuentro claro, respetuoso y orientado a entender lo que necesitas"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-ivory rounded-2xl p-6 border border-sand/50"
            >
              <span className="text-sage-dark font-serif text-3xl mb-4 block">
                {step.number}
              </span>
              <h3 className="font-serif text-xl text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
