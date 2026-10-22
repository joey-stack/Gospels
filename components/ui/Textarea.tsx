import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-semibold uppercase tracking-wider text-grey-700"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
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

Textarea.displayName = "Textarea";
