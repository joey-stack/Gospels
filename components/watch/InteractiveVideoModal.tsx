"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface VideoModalData {
  title: string;
  speaker: string;
  date: string;
  duration: string;
  location: string;
  videoSrc?: string;
  description: string;
}

interface InteractiveVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: VideoModalData | null;
}

import { useLanguage } from "@/context/LanguageContext";

export const InteractiveVideoModal: React.FC<InteractiveVideoModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const { isSv } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const videoSource =
    data.videoSrc || "/assets/WhatsApp_Video_2026-10-16_at_8.28.07_AM.mp4";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl bg-[#0A1530] border border-slate-700/80 rounded-lg md:rounded-xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0F172A]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-hanken font-bold text-white text-sm leading-tight line-clamp-1">
                  {data.title}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
                  {data.speaker} · {data.location}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close video player"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Video Player Frame */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group/video">
            <video
              ref={videoRef}
              src={videoSource}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
            />

            {/* Play/Pause Center Overlay on hover or paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-md bg-[#0D9488]/90 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <span
                    className="material-symbols-outlined text-3xl ml-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </div>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 opacity-95 group-hover/video:opacity-100 transition-opacity">
              {/* Progress Slider */}
              <div className="w-full bg-white/20 h-1 rounded-sm overflow-hidden cursor-pointer">
                <div
                  className="bg-[#2DD4BF] h-full transition-all"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>

              {/* Bottom Controls */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlaying ? "pause" : "play_arrow"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {isMuted ? "volume_off" : "volume_up"}
                    </span>
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    1080p HD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Narrative */}
          <div className="p-4 sm:p-6 bg-[#0A1530] border-t border-white/5 space-y-2">
            <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="text-[#2DD4BF] font-semibold">{data.date}</span>
              <span>·</span>
              <span>{data.duration}</span>
              <span>·</span>
              <span>{isSv ? "Mastrat flerspårsljud live" : "Live Multi-Track Audio Mastered"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
