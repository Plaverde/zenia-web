interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full px-4 py-3 rounded-lg border border-sand bg-white text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-colors resize-y min-h-[120px] ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
