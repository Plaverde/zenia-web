"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { ConsentCheckbox } from "./ConsentCheckbox";

const modalityOptions = [
  { value: "", label: "Selecciona una opción" },
  { value: "presencial", label: "Presencial en Montería" },
  { value: "virtual", label: "Virtual (videollamada)" },
  { value: "ambas", label: "Ambas me sirven" },
];

interface ContactFormProps {
  idPrefix?: string;
  showModality?: boolean;
  messageRequired?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  consentLabel?: string;
  successTitle?: string;
  successText?: string;
  className?: string;
}

export function ContactForm({
  idPrefix = "contact",
  showModality = false,
  messageRequired = false,
  submitLabel = "Enviar mensaje",
  submittingLabel = "Enviando...",
  consentLabel = "Acepto el tratamiento de mis datos personales conforme a la Política de tratamiento de datos personales.",
  successTitle = "Mensaje enviado",
  successText = "Gracias por escribirme. Te responderé lo antes posible.",
  className = "",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setConsentError("Debes aceptar el tratamiento de datos personales.");
      toast.error("Consentimiento requerido", {
        description:
          "Debes aceptar el tratamiento de datos personales para continuar.",
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
      form.reset();
      toast.success(successTitle, { description: successText });
    } catch {
      toast.error("Error al enviar", {
        description: "No se pudo enviar. Intenta escribirme por WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={`bg-white rounded-2xl p-8 border border-sand/50 shadow-sm text-center ${className}`}
      >
        <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-sage-dark"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-charcoal mb-3">
          {successTitle}
        </h3>
        <p className="text-warm-gray mb-6">{successText}</p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl p-8 border border-sand/50 shadow-sm space-y-6 ${className}`}
    >
      <Input
        id={`${idPrefix}-name`}
        name="name"
        label="Tu nombre"
        placeholder="¿Cómo te llamas?"
        required
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          id={`${idPrefix}-email`}
          name="email"
          label="Correo electrónico"
          placeholder="tu@email.com"
          type="email"
          required
        />
        <Input
          id={`${idPrefix}-phone`}
          name="phone"
          label="Teléfono (opcional)"
          placeholder="Tu número"
          type="tel"
        />
      </div>

      {showModality && (
        <Select
          id={`${idPrefix}-modality`}
          name="modality"
          label="¿Cómo prefieres la atención?"
          options={modalityOptions}
          required
        />
      )}

      <Textarea
        id={`${idPrefix}-message`}
        name="message"
        label={messageRequired ? "Mensaje" : "Cuéntame un poco más (opcional)"}
        placeholder="¿En qué puedo ayudarte?"
        required={messageRequired}
      />

      <ConsentCheckbox
        id={`${idPrefix}-consent`}
        checked={consent}
        onChange={(val) => {
          setConsent(val);
          setConsentError("");
        }}
        error={consentError || undefined}
        label={consentLabel}
      />

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
