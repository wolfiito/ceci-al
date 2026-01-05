"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWedding } from "@/context/WeddingContext"; // Usamos el hook

export default function MusicPlayer() {
  const { isPlaying, togglePlay, isEnvelopeOpen } = useWedding(); // Consumimos el estado global
  const audioRef = useRef<HTMLAudioElement>(null);

  // Efecto para manejar Play/Pause basado en el estado global
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Intentamos reproducir. Los navegadores modernos requieren interacción previa,
      // la cual ocurrirá cuando el usuario haga click en el sobre (openEnvelope).
      audioRef.current.play().catch((e) => console.log("Autoplay prevent:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Opcional: Solo mostrar el reproductor si el sobre ya se abrió
  if (!isEnvelopeOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <audio 
          ref={audioRef} 
          src="/sound.mp3" // Asegúrate de que la ruta sea correcta (en public es /sound.mp3)
          loop 
        />

        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors duration-300",
            isPlaying 
              ? "bg-wedding-primary text-white" 
              : "bg-white/80 text-wedding-dark hover:bg-white"
          )}
        >
          {isPlaying ? (
            <div className="flex gap-0.5 items-end h-4">
               {/* Pequeña animación de barras de sonido */}
               <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
               <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-full" />
               <motion.div animate={{ height: [4, 14, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
            </div>
          ) : (
            <Volume2 size={20} />
          )}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}