import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-grey-700"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full rounded-xl bg-surface border px-4 py-3 text-sm text-grey-900 placeholder:text-grey-400 transition-all duration-200 outline-none focus:bg-surface-container-lowest focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-grey-100 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-nordic-outline-variant/50 hover:border-nordic-outline"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs font-medium text-red-600">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-grey-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
