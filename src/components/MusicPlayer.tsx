"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Elemento de audio oculto */}
      {/* Usamos una canción libre de derechos como placeholder */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
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
          <Pause size={20} />
        ) : (
          <Music size={20} className="animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}