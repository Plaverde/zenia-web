interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Nivel del encabezado. Usa "h1" cuando este es el título principal de la página. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
  };

  return (
    <div className={`mb-12 ${alignStyles[align]} ${className}`}>
      <Heading className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-lg text-warm-gray max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
