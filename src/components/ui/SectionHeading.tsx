interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
  };

  return (
    <div className={`mb-12 ${alignStyles[align]} ${className}`}>
      <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-warm-gray max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
