interface BlogDisclaimerProps {
  includeEmergency?: boolean;
}

export function BlogDisclaimer({
  includeEmergency = false,
}: BlogDisclaimerProps) {
  return (
    <div className="mt-12 p-6 rounded-2xl bg-sand-light/50 border border-sand">
      {includeEmergency && (
        <div className="mb-4 p-3 rounded-lg bg-terracotta/10 border border-terracotta/30">
          <p className="text-sm text-charcoal">
            <strong>Si estás en una crisis emocional:</strong> No esperes. Contacta la{" "}
            <strong>Línea 106</strong> (Salud Mental), la{" "}
            <strong>Línea 123</strong> (Línea de la Vida) o acude a la sala de
            urgencias más cercana.
          </p>
        </div>
      )}
      <p className="text-sm text-warm-gray leading-relaxed">
        <strong className="text-charcoal">Aviso importante:</strong> Este artículo
        es de carácter educativo e informativo. No sustituye una evaluación
        psicológica profesional personalizada. Si sientes que lo que describes se
        parece a tu situación, considera agendar una sesión para conversarlo con
        una profesional.
      </p>
    </div>
  );
}
