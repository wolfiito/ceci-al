"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWedding } from "@/context/WeddingContext";

export default function MusicPlayer() {
  const { isPlaying, togglePlay, isEnvelopeOpen } = useWedding();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Autoplay prevent:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  if (!isEnvelopeOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }} // Aparece un poco después de abrir el sobre
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <audio ref={audioRef} src="/sound.mp3" loop />

        {/* Etiqueta de canción (Solo visible en hover/tap) */}
        <AnimatePresence>
            {(isHovered || !isPlaying) && (
                <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    className="bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest py-1 px-3 rounded-md shadow-lg mb-1 whitespace-nowrap"
                >
                    {isPlaying ? "Reproduciendo Música" : "Música Pausada"}
                </motion.div>
            )}
        </AnimatePresence>

        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className={cn(
            "group relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden",
            isPlaying 
              ? "bg-white/90 text-stone-900 border border-white/50" 
              : "bg-black/40 text-white/80 backdrop-blur-sm border border-white/10 hover:bg-black/60"
          )}
        >
            {/* Fondo animado sutil cuando suena */}
            {isPlaying && (
                <div className="absolute inset-0 bg-wedding-secondary/10 animate-pulse"></div>
            )}

            <div className="relative z-10">
                {isPlaying ? (
                     <div className="flex gap-[3px] items-end h-3">
                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-[2px] bg-stone-800 rounded-full" />
                        <motion.div animate={{ height: [8, 16, 6] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-[2px] bg-stone-800 rounded-full" />
                        <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-[2px] bg-stone-800 rounded-full" />
                        <motion.div animate={{ height: [2, 14, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-[2px] bg-stone-800 rounded-full" />
                     </div>
                ) : (
                    <VolumeX size={18} />
                )}
            </div>
          
            {/* Ondas expansivas al hacer hover */}
            <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping duration-1000"></span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}