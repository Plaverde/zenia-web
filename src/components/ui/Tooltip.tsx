"use client";

import { useId, useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  /** When the trigger is a disabled control, it can't receive focus natively —
   * pass true so the wrapper becomes focusable and the tooltip stays reachable via keyboard. */
  disabled?: boolean;
  className?: string;
}

export function Tooltip({ content, children, disabled = false, className = "" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={id}
      {...(disabled ? { tabIndex: 0 } : {})}
    >
      {children}
      <span
        id={id}
        role="tooltip"
        aria-hidden={!open}
        className={`pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2 py-1 text-xs text-white shadow-md transition-opacity duration-150 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        {content}
      </span>
    </span>
  );
}
