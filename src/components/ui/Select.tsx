interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  id,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal"
      >
        {label}
      </label>
      <select
        id={id}
        className={`w-full px-4 py-3 rounded-lg border border-sand bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-colors ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
