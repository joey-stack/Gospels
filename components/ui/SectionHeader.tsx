import React from "react";

export interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={`flex flex-col gap-2.5 max-w-2xl ${alignClasses[align]} ${className}`}>
      {overline && (
        <span className="text-xs uppercase tracking-widest font-semibold text-brand-600">
          {overline}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-hanken font-bold tracking-tight text-grey-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-grey-600 font-inter leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
