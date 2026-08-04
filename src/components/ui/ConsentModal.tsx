"use client";

import { Button } from "@/components/ui/Button";

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

export function ConsentModal({ isOpen, onAccept, onCancel }: ConsentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="font-serif text-2xl text-charcoal mb-4">
            Consentimiento Informado — Telepsicología
          </h2>

          <div className="space-y-4 text-sm text-warm-gray">
            <p>
              Al agendar una sesión de terapia virtual, declaro que he leído y
              comprendo los siguientes términos:
            </p>

            <h3 className="font-medium text-charcoal">1. Naturaleza del servicio</h3>
            <p>
              La terapia online se realiza por videollamada a través de plataformas
              seguras con cifrado de extremo a extremo (Doxy.me o Zoom for Healthcare).
            </p>

            <h3 className="font-medium text-charcoal">2. Limitaciones</h3>
            <p>
              La terapia online no sustituye la atención de emergencias psiquiátricas
              agudas. Requiere conexión estable de internet y un ambiente privado.
            </p>

            <h3 className="font-medium text-charcoal">3. Privacidad</h3>
            <p>
              Toda la información compartida es estrictamente confidencial, conforme
              a la Ley 1581 de 2012 y las normas éticas de la psicología en Colombia.
            </p>

            <h3 className="font-medium text-charcoal">4. Derecho de revocación</h3>
            <p>
              Puedo retirarme del servicio en cualquier momento, sin necesidad de
              justificación y sin penalización.
            </p>

            <h3 className="font-medium text-charcoal">5. Emergencias</h3>
            <p>
              En caso de crisis emocional fuera de la sesión, debo contactar la Línea
              106 (Salud Mental), Línea 123 o SAMU 125.
            </p>
          </div>

          <p className="mt-6 text-xs text-warm-gray italic">
            Referencia: Ley 2460 de 2025, Ley 1616 de 2013, Ley 1581 de 2012,
            Resolución 1888 de 2025.
          </p>

          <div className="flex gap-4 mt-8">
            <Button onClick={onAccept} variant="primary" className="flex-1">
              Acepto y continuar
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
