import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

  const variants = {
    primary:
      "bg-sage-dark text-white hover:bg-sage focus-visible:outline-sage-dark",
    secondary:
      "bg-terracotta text-white hover:bg-terracotta-dark focus-visible:outline-terracotta",
    outline:
      "border-2 border-sage-dark text-sage-dark hover:bg-sage-dark hover:text-white focus-visible:outline-sage-dark",
    ghost: "text-sage-dark hover:bg-sage/10 focus-visible:outline-sage-dark",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
