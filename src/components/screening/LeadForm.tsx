"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";

interface LeadFormProps {
  onDismiss: () => void;
}

const modalityOptions = [
  { value: "", label: "Prefiero no indicarlo" },
  { value: "presencial", label: "Presencial en Montería" },
  { value: "virtual", label: "Virtual (videollamada)" },
];

const contactOptions = [
  { value: "", label: "Prefiero no indicarlo" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "llamada", label: "Llamada telefónica" },
  { value: "email", label: "Correo electrónico" },
];

export function LeadForm({ onDismiss }: LeadFormProps) {
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setConsentError(
        "Debes autorizar el uso de tus datos para poder contactarte."
      );
      return;
    }
    setConsentError("");
    setError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.get("full_name"),
          phone: formData.get("phone"),
          email: (formData.get("email") as string) || "",
          preferred_modality:
            (formData.get("preferred_modality") as string) || "",
          preferred_contact:
            (formData.get("preferred_contact") as string) || "",
          marketing_consent: consent,
        }),
      });

      if (!res.ok) throw new Error("Error");

      setIsSubmitted(true);
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-sage bg-sage/5 p-8 text-center mt-10">
        <h3 className="font-serif text-2xl text-charcoal mb-3">
          Gracias por dejarme tus datos
        </h3>
        <p className="text-warm-gray leading-relaxed mb-6">
          Te contactaré pronto para orientarte. Si prefieres, también puedes
          agendar tu primera sesión directamente.
        </p>
        <Button onClick={onDismiss} variant="outline">
          Finalizar
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sand bg-ivory p-6 md:p-8 mt-10">
      <h3 className="font-serif text-2xl text-charcoal mb-2">
        ¿Quieres que te oriente?
      </h3>
      <p className="text-warm-gray leading-relaxed mb-6">
        Opcional: deja tu nombre y un medio de contacto para que pueda escribirte
        y orientarte sobre el proceso de acompañamiento. Tus respuestas de la
        autoevaluación no se guardan ni se envían.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="lead-full-name"
          name="full_name"
          label="Tu nombre"
          placeholder="¿Cómo te llamas?"
          required
          autoComplete="name"
        />
        <Input
          id="lead-phone"
          name="phone"
          label="Teléfono o WhatsApp"
          placeholder="Tu número"
          type="tel"
          required
          autoComplete="tel"
        />
        <Input
          id="lead-email"
          name="email"
          label="Correo electrónico (opcional)"
          placeholder="tu@email.com"
          type="email"
          autoComplete="email"
        />
        <div className="grid md:grid-cols-2 gap-5">
          <Select
            id="lead-modality"
            name="preferred_modality"
            label="Modalidad preferida (opcional)"
            options={modalityOptions}
          />
          <Select
            id="lead-contact"
            name="preferred_contact"
            label="¿Cómo prefieres que te contacte? (opcional)"
            options={contactOptions}
          />
        </div>

        <ConsentCheckbox
          id="lead-marketing-consent"
          checked={consent}
          onChange={(val) => {
            setConsent(val);
            setConsentError("");
          }}
          error={consentError || undefined}
          label="Autorizo que mis datos de contacto sean usados únicamente para que Zenia Álvarez Gulfo me escriba y oriente sobre el acompañamiento psicológico. Conozco y acepto la Política de Tratamiento de Datos Personales."
        />

        <p className="text-sm text-warm-gray leading-relaxed">
          Al enviar, aceptas nuestra{" "}
          <a
            href="/politica-datos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors"
          >
            política de tratamiento de datos
          </a>
          . Tus datos no se comparten con terceros.
        </p>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar y que me oriente"}
          </Button>
          <button
            type="button"
            onClick={onDismiss}
            className="w-full sm:w-auto min-h-[44px] text-sm text-sage-dark underline underline-offset-2 hover:text-charcoal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            No, solo quiero ver mi resultado
          </button>
        </div>
      </form>
    </div>
  );
}
