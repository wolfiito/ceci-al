"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWedding } from "@/context/WeddingContext";

export default function MusicPlayer() {
  const { isPlaying, togglePlay, isEnvelopeOpen } = useWedding();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. CONTROL DE AUDIO
  useEffect(() => {
    if (!audioRef.current) return;
    console.log("Intentando reproducir...", isPlaying); // <--- NUEVO
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
          playPromise
            .then(() => console.log("¡Audio reproduciendo con éxito!")) // <--- ÉXITO
            .catch((error) => {
              console.error("ERROR DE AUDIO:", error); // <--- ERROR
            });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      {/* 2. AUDIO SIEMPRE MONTADO (INVISIBLE) 
          Al quitar el "return null", el tag <audio> siempre existe en el DOM
          listo para recibir la orden de play.
      */}
      <audio 
        ref={audioRef} 
        src="/sound.mp3" 
        loop 
        preload="auto" // Importante para que cargue rápido
      />

      {/* 3. INTERFAZ VISUAL (Solo aparece al abrir el sobre) */}
      <AnimatePresence>
        {isEnvelopeOpen && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-49 flex flex-col items-end gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)} 
            >
                {/* TOOLTIP FLOTANTE */}
                <AnimatePresence>
                    {(isHovered || !isPlaying) && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        >
                            {/* {isPlaying ? "Reproduciendo Música" : "Música Pausada"} */}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOTÓN FLOTANTE */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "group relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer",
                        isPlaying 
                        ? "bg-white/90 text-stone-900 border border-white/50" 
                        : "bg-black/40 text-white/80 backdrop-blur-sm border border-white/10 hover:bg-black/60"
                    )}
                >
                    {isPlaying && (
                        <div className="absolute inset-0 bg-wedding-secondary/20 animate-pulse"></div>
                    )}

                    <div className="relative z-49 flex items-center justify-center">
                        {isPlaying ? (
                             /* BARRAS DE ECUALIZADOR */
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
                  
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping duration-1000"></span>
                </motion.button>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}