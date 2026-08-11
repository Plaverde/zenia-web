"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { SectionHeading } from "@/components/ui/SectionHeading";

const modalityOptions = [
  { value: "", label: "Selecciona una opción" },
  { value: "presencial", label: "Presencial en Montería" },
  { value: "virtual", label: "Virtual (videollamada)" },
  { value: "ambas", label: "Ambas me sirven" },
];

export function TriageAssistant() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setConsentError("Debes aceptar el tratamiento de datos personales.");
      toast.error("Consentimiento requerido", {
        description: "Debes aceptar el tratamiento de datos personales para continuar.",
      });
      return;
    }
    setConsentError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: (formData.get("message") as string) || "",
          consent,
        }),
      });

      if (!res.ok) throw new Error("Error");

      setIsSubmitted(true);
      toast.success("Mensaje enviado", {
        description: "Te contactaré pronto para orientarte.",
      });
    } catch {
      toast.error("Error", {
        description: "No se pudo enviar. Intenta escribirme por WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-sage/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-charcoal mb-3">
            Gracias por escribirme
          </h3>
          <p className="text-warm-gray mb-6">
            Me comunicaré contigo pronto para orientarte y ayudarte a encontrar
            el mejor camino para tu bienestar.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Enviar otro mensaje
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-sage/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="¿Cómo puedo ayudarte?"
          subtitle="Cuéntame brevemente tu situación y te orientaré sobre el mejor camino"
        />

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-sand/50 shadow-sm space-y-6">
          <Input
            id="name"
            name="name"
            label="Tu nombre"
            placeholder="¿Cómo te llamas?"
            required
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              id="email"
              name="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              type="email"
              required
            />
            <Input
              id="phone"
              name="phone"
              label="Teléfono (opcional)"
              placeholder="Tu número"
              type="tel"
            />
          </div>

          <Select
            id="modality"
            name="modality"
            label="¿Cómo prefieres la atención?"
            options={modalityOptions}
            required
          />

          <Textarea
            id="message"
            name="message"
            label="Cuéntame un poco más (opcional)"
            placeholder="¿Qué te gustaría trabajar? ¿Hay algo que quieras que sepa antes de la primera sesión?"
          />

          <ConsentCheckbox
            id="triage-consent"
            checked={consent}
            onChange={(val) => { setConsent(val); setConsentError(""); }}
            error={consentError || undefined}
            label="Acepto el tratamiento de mis datos personales conforme a la Política de Tratamiento de Datos Personales. Mis datos serán utilizados únicamente para gestionar mi consulta y no serán compartidos con terceros."
          />

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar y orientarme"}
          </Button>
        </form>
      </div>
    </section>
  );
}
