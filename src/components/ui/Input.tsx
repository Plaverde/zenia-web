interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-lg border border-sand bg-white text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-colors ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
