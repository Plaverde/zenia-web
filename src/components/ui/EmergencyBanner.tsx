interface EmergencyBannerProps {
  className?: string;
}

export function EmergencyBanner({ className = "" }: EmergencyBannerProps) {
  return (
    <div
      className={`p-4 rounded-xl bg-terracotta/10 border border-terracotta/30 ${className}`}
      role="alert"
    >
      <p className="text-sm text-charcoal font-medium mb-1">
        En caso de emergencia
      </p>
      <p className="text-sm text-warm-gray">
        Si estás en una crisis emocional o tienes ideas de hacerte daño, contacta
        inmediatamente la{" "}
        <strong className="text-charcoal">Línea 106</strong> (Salud Mental) o la{" "}
        <strong className="text-charcoal">Línea 123</strong> (Línea de la Vida).
        También puedes llamar al <strong className="text-charcoal">125</strong>{" "}
        (SAMU) o acudir a la sala de urgencias más cercana.
      </p>
    </div>
  );
}
