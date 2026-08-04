interface ConsentCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function ConsentCheckbox({
  id,
  label,
  checked,
  onChange,
  error,
}: ConsentCheckboxProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-sand text-sage focus:ring-sage"
          required
        />
        <span className="text-sm text-warm-gray leading-relaxed">
          {label}
        </span>
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
