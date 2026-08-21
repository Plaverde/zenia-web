"use client";

import { ContactForm } from "@/components/ui/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TriageAssistant() {
  return (
    <section className="py-16 bg-sage/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="¿Cómo puedo ayudarte?"
          subtitle="Cuéntame brevemente tu situación y te orientaré sobre el mejor camino"
        />

        <ContactForm
          idPrefix="triage"
          showModality
          submitLabel="Enviar y orientarme"
          consentLabel="Acepto el tratamiento de mis datos personales conforme a la Política de tratamiento de datos personales. Mis datos serán utilizados únicamente para gestionar mi consulta y no serán compartidos con terceros."
          successTitle="Gracias por escribirme"
          successText="Me comunicaré contigo pronto para orientarte y ayudarte a encontrar el mejor camino para tu bienestar."
        />
      </div>
    </section>
  );
}
