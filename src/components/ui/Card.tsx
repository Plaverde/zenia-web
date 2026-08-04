interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover";
  as?: "article" | "div" | "li";
}

export function Card({
  children,
  className = "",
  variant = "default",
  as: Component = "article",
}: CardProps) {
  const baseStyles = "bg-white rounded-2xl p-6 shadow-sm border border-sand/50";

  const variants = {
    default: "",
    hover: "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
  };

  return (
    <Component className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
}
