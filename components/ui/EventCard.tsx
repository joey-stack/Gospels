import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface EventCardProps {
  id?: string;
  title: string;
  category: string;
  categoryDotColor?: string;
  dateBadge: {
    day: string;
    month: string;
    weekday: string;
  };
  timeString: string;
  location: string;
  imageUrl: string;
  imageAlt?: string;
  href: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  category,
  categoryDotColor = "#0D9488",
  dateBadge,
  timeString,
  location,
  imageUrl,
  imageAlt,
  href,
}) => {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 text-left no-underline w-full cursor-pointer"
    >
      {/* 1. Media Container (4:3 aspect ratio matching Morrow Church) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:rounded-xl bg-slate-900 shadow-sm border border-slate-200/50 dark:border-slate-800">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          quality={90}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Subtle bottom vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Floating Date Chip in Top-Right Corner */}
        <div className="absolute top-3.5 right-3.5 z-10 min-w-[58px] px-3.5 py-2.5 rounded-md bg-[#F8F9FF]/95 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-center justify-center text-center">
          <span className="font-hanken font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-none">
            {dateBadge.day}
          </span>
          <span className="font-inter text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1 leading-none">
            {dateBadge.month}
          </span>
        </div>
      </div>

      {/* 2. Body Block */}
      <div className="flex flex-col gap-2.5">
        {/* Category Tag with Indicator Dot */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 text-xs font-semibold w-fit">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: categoryDotColor }}
          />
          <span>{category}</span>
        </div>

        {/* Event Title */}
        <h3 className="font-hanken font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight group-hover:text-[#0D9488] dark:group-hover:text-[#2DD4BF] transition-colors">
          {title}
        </h3>

        {/* Meta Line: Weekday — Time — Location */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">
          <span>{dateBadge.weekday}</span>
          <span className="w-5 h-[1px] bg-slate-300 dark:bg-slate-700" />
          <span>{timeString}</span>
          <span className="w-5 h-[1px] bg-slate-300 dark:bg-slate-700" />
          <span>{location}</span>
        </div>
      </div>
    </Link>
  );
};
