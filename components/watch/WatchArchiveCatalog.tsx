"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { InteractiveVideoModal, VideoModalData } from "./InteractiveVideoModal";

type ArchiveCategory = "all" | "sanctuary" | "public-square" | "workshop" | "acoustic";

interface ArchiveMediaItem {
  id: string;
  category: ArchiveCategory;
  categoryLabel: string;
  date: string;
  duration: string;
  title: string;
  speaker: string;
  location: string;
  description: string;
  imageUrl: string;
  videoSrc?: string;
}

const ARCHIVE_ITEMS: ArchiveMediaItem[] = [
  {
    id: "item-1",
    category: "sanctuary",
    categoryLabel: "Sanctuary Worship",
    date: "NOV 14, 2025",
    duration: "54 MIN",
    title: "Halleluja Till Vår Kung — Live at Smyrna Sanctuary",
    speaker: "SMYRNA WORSHIP CHOIR & ENSEMBLE",
    location: "Smyrna Frihamnen, Göteborg",
    description:
      "A majestic rendition of the Swedish classic worship anthem performed during the autumn citywide unity gathering in Frihamnen.",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_1.png",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.07_AM.mp4",
  },
  {
    id: "item-2",
    category: "public-square",
    categoryLabel: "Public Square Outreach",
    date: "JUN 12, 2025",
    duration: "46 MIN",
    title: "Göteborgs Lovsångskonsert — Gustav Adolfs Torg",
    speaker: "GOSPELS OUTREACH CHOIR",
    location: "Gustav Adolfs Torg, Göteborg",
    description:
      "Dynamic open-air praise and brass ensemble bringing Swedish and English gospel songs straight into Gothenburg's municipal square.",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.07_am.png",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.08_AM.mp4",
  },
  {
    id: "item-3",
    category: "acoustic",
    categoryLabel: "Acoustic Sessions",
    date: "AUG 19, 2025",
    duration: "52 MIN",
    title: "Waterfront Praise 2025 at Jubileumsparken",
    speaker: "WATERFRONT GOSPEL COLLECTIVE",
    location: "Jubileumsparken, Frihamnen",
    description:
      "Acoustic guitars, grand piano, and three-part harmonies echoing along the Göta älv harbor under the Nordic summer twilight.",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.26.13_am.png",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.08_AM_(1).mp4",
  },
  {
    id: "item-4",
    category: "workshop",
    categoryLabel: "Vocal Workshop",
    date: "FEB 22, 2025",
    duration: "64 MIN",
    title: "Nordic Choral Workshop & Harmony Masterclass",
    speaker: "SCANDINAVIAN VOCAL DIRECTORS",
    location: "Gothenburg Music Conservatory",
    description:
      "Full masterclass finale with 120 workshop participants exploring black gospel cadences, vocal projection, and Nordic modal harmonies.",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.26.12_am.png",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.09_AM.mp4",
  },
  {
    id: "item-5",
    category: "sanctuary",
    categoryLabel: "Sanctuary Worship",
    date: "OCT 04, 2024",
    duration: "48 MIN",
    title: "Night of Intercession & Gospel Hymns",
    speaker: "UNITED ECUMENICAL CHOIR",
    location: "Smyrna Frihamnskyrkan",
    description:
      "Sacred acoustic evening of deep prayer and contemplative worship convening members from Pentecostal, Mission, and Catholic fellowships.",
    imageUrl: "/assets/whatsapp_image_2026_10_16_at_8.28.06_am_2.png",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.09_AM_(1).mp4",
  },
  {
    id: "item-6",
    category: "acoustic",
    categoryLabel: "Acoustic Sessions",
    date: "SEP 18, 2024",
    duration: "39 MIN",
    title: "Acoustic Cathedral Hymns & Polyphony",
    speaker: "WEST SWEDEN VOICES",
    location: "Haga Kyrka, Gothenburg",
    description:
      "Cathedral acoustics highlighting traditional gospel spirituals re-imagined with modern acoustic instrumentation.",
    imageUrl: "/assets/WhatsApp_Image_2026-10-16_at_8.28.06_AM.jpeg",
    videoSrc: "/assets/WhatsApp_Video_2026-10-16_at_8.28.09_AM_(2).mp4",
  },
];

const CATEGORY_TABS: { key: ArchiveCategory; label: string }[] = [
  { key: "all", label: "All Sessions" },
  { key: "sanctuary", label: "Sanctuary Worship" },
  { key: "public-square", label: "Public Square Outreach" },
  { key: "workshop", label: "Vocal Workshops" },
  { key: "acoustic", label: "Acoustic Sessions" },
];

export const WatchArchiveCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<VideoModalData | null>(null);

  const filteredItems = useMemo(() => {
    return ARCHIVE_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCardClick = (item: ArchiveMediaItem) => {
    setActiveItem({
      title: item.title,
      speaker: item.speaker,
      date: item.date,
      duration: item.duration,
      location: item.location,
      videoSrc: item.videoSrc,
      description: item.description,
    });
    setModalOpen(true);
  };

  return (
    <>
      <section className="w-full px-2.5 sm:px-5 py-12 md:py-16">
        <div className="w-full">
          {/* Section Header: Matching Morrow Church Architecture */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#0D9488] text-xs font-semibold tracking-widest uppercase mb-3">
                <span className="w-5 h-[2px] bg-[#0D9488]" />
                <span>ARCHIVE</span>
              </div>
              <h2 className="font-hanken text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                Every gathering, by session.
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl font-inter">
                Filter by worship format or search by church, hymn, or choir leader.
              </p>
            </div>

            {/* Search Input matching Morrow style */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recordings, hymns, choir..."
                className="w-full pl-9 pr-4 py-2.5 text-xs font-inter rounded-md border border-slate-300 bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-colors shadow-xs"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-base pointer-events-none">
                search
              </span>
            </div>
          </div>

          {/* Filter Pills: Morrow Church Architectural Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#0A1530] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* 6-Card Grid: Morrow Church Sermon Grid Architecture */}
          {filteredItems.length === 0 ? (
            <div className="w-full py-16 text-center rounded-lg border border-dashed border-slate-300 bg-white">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
                search_off
              </span>
              <p className="font-hanken font-bold text-slate-800 text-lg">
                No recorded sessions found
              </p>
              <p className="font-inter text-xs text-slate-500 mt-1">
                Try adjusting your search query or switching categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  onClick={() => handleCardClick(item)}
                  className="group cursor-pointer flex flex-col bg-white rounded-lg md:rounded-xl overflow-hidden border border-slate-200/80 hover:border-[#0D9488]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      quality={95}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      {item.categoryLabel}
                    </div>

                    {/* Duration Badge Bottom Right */}
                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white tracking-wider flex items-center gap-1.5 shadow-xs border border-white/10">
                      <span
                        className="material-symbols-outlined text-xs text-white"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                      <span>{item.duration}</span>
                    </div>

                    {/* Center Hover Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-12 h-12 rounded-md bg-[#0D9488]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <span
                          className="material-symbols-outlined text-2xl ml-0.5"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-2">
                      {/* Meta line */}
                      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        <span>{item.date}</span>
                        <span className="text-slate-300">——</span>
                        <span className="text-[#0D9488] font-semibold line-clamp-1">
                          {item.speaker}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-hanken text-lg font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-inter text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer: Location */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 line-clamp-1">
                        <span className="material-symbols-outlined text-sm text-[#0D9488]">
                          location_on
                        </span>
                        {item.location}
                      </span>
                      <span className="font-semibold text-[#0D9488] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 shrink-0">
                        Watch <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Video Modal */}
      <InteractiveVideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={activeItem}
      />
    </>
  );
};
