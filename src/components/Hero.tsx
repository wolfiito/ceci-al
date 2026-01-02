"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// 1. DEFINIMOS LAS PROPS PARA TS
interface HeroProps {
  names: string;
  date: string;
}

// Mantenemos tu easing de lujo
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ names, date }: HeroProps) {
  
  // LOGICA PARA MANTENER TU DISEÑO:
  // Si el nombre es "Ceci & Alejandro", lo separamos para animarlos individualmente
  const nameArray = names.split("&").map(n => n.trim());
  const name1 = nameArray[0] || "Ceci";
  const name2 = nameArray[1] || "Alejandro";

  // FORMATEO DE FECHA: De "2026-05-09" a "09 . 05 . 2026"
  const formattedDate = date ? date.split("-").reverse().join(" . ") : "09 . 05 . 2026";

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col justify-start items-center pt-32 md:pt-24 bg-black">
      
      {/* 1. IMAGEN DE FONDO */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.jpg"
          alt={names}
          fill
          priority
          className="object-cover object-center opacity-90" 
        />
        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black/60 to-transparent" />
      </motion.div>

      {/* 2. TEXTOS DINÁMICOS */}
      <div className="relative z-10 w-full text-center flex flex-col items-center">
        <div className="flex flex-col items-center leading-[0.85] md:leading-[0.9] text-white drop-shadow-2xl">
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.2 }}
            className="font-serif text-[16vw] md:text-[10vw] font-medium tracking-tight"
          >
            {name1}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.4 }}
            className="text-[5vw] md:text-[3vw] font-light italic text-[#E8DCC4] my-2"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.6 }}
            className="font-serif text-[16vw] md:text-[10vw] font-medium tracking-tight"
          >
            {name2}
          </motion.h1>
        </div>

        {/* FECHA DINÁMICA */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-8 md:mt-12"
        >
            <p className="font-serif text-lg md:text-2xl text-[#E8DCC4] tracking-[0.4em] uppercase font-light drop-shadow-lg">
                {formattedDate}
            </p>
        </motion.div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="absolute bottom-10 z-10 text-white/60"
        >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
                <ChevronDown size={32} strokeWidth={1} />
            </motion.div>
      </motion.div>
    </div>
  );
}