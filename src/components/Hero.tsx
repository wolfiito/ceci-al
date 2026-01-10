"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  names: string;
  date: string;
}

// Configuración de movimiento "Cinemático" para la entrada
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Variante de flotación suave
const floatingVariant: Variants = {
  float: {
    y: [0, -15, 0], 
    transition: {
      duration: 6, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Hero({ names, date }: HeroProps) {
  
  const nameArray = names.split(/&| y /i).map(n => n.trim());
  const name1 = nameArray[0] || "Ceci";
  const name2 = nameArray[1] || "Alejandro";

  const formattedDate = date ? date.split("-").reverse().join(" • ") : "09 • 05 • 2026";

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col justify-center items-center bg-[#151E1A]">
      
      {/* =========================================================
          1. FONDO CON EFECTOS DE PROFUNDIDAD
          ========================================================= */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.jpg" 
          alt="Pareja"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center" 
        />
        
        {/* Capas de oscurecimiento */}
        <div className="absolute inset-0 bg-[#1A2621]/30 mix-blend-multiply" />
        <div className="absolute top-0 left-0 w-full h-[35vh] bg-gradient-to-b from-[#151E1A]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[45vh] bg-gradient-to-t from-[#151E1A] via-[#151E1A]/60 to-transparent" />
      </motion.div>


      {/* =========================================================
          2. COMPOSICIÓN TIPOGRÁFICA
          ========================================================= */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full pb-12 sm:pb-0">
        
        <div className="flex flex-col items-center leading-[0.9] drop-shadow-2xl">
          
          {/* --- NOMBRE 1 --- */}
          {/* CONTENEDOR PADRE: Maneja la entrada (Fade In + Slide Up) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.2 }}
            className="relative"
          >
             {/* CONTENEDOR HIJO: Maneja la flotación constante */}
             <motion.div
                variants={floatingVariant}
                animate="float"
             >
                {/* Texto Principal */}
                <h1 className="font-serif text-[15vw] md:text-[8vw] text-[#E8E6D9] tracking-tight">
                  {name1}
                </h1>
                
                {/* Texto Overlay (Brillo) */}
                <h1 className="font-serif text-[15vw] md:text-[8vw] text-white/20 absolute top-0 left-0 w-full blur-[1px] mix-blend-overlay pointer-events-none select-none">
                  {name1}
                </h1>
             </motion.div>
          </motion.div>


          {/* --- AMPERSAND (&) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut", delay: 0.6 }}
            className="text-[4vw] md:text-[2vw] font-serif italic text-[#DCC5C5] my-2 md:my-1 opacity-80"
          >
            &
          </motion.div>


          {/* --- NOMBRE 2 --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.4 }}
            className="relative"
          >
            {/* CONTENEDOR HIJO: Flotación */}
             <motion.div
                variants={floatingVariant}
                animate="float"
             >
                <h1 className="font-serif text-[15vw] md:text-[8vw] text-[#E8E6D9] tracking-tight">
                  {name2}
                </h1>
                <h1 className="font-serif text-[15vw] md:text-[8vw] text-white/10 absolute top-0 left-0 w-full mix-blend-overlay pointer-events-none select-none">
                  {name2}
                </h1>
             </motion.div>
          </motion.div>

        </div>


        {/* --- FECHA --- */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 md:mt-10 flex flex-col items-center gap-4"
        >
            <div className="h-[40px] w-[1px] bg-gradient-to-b from-transparent via-[#DCC5C5]/50 to-transparent" />
            
            <p className="text-xs md:text-sm font-sans text-[#DCC5C5] uppercase tracking-[0.5em] font-medium opacity-90">
               {formattedDate}
            </p>
        </motion.div>

      </div>

      {/* =========================================================
          3. SCROLL INDICATOR
          ========================================================= */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="absolute bottom-6 md:bottom-10 z-20 text-[#DCC5C5]/60 cursor-pointer mix-blend-plus-lighter"
        >
            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-[9px] uppercase tracking-[0.3em]">Descubre</span>
                <ChevronDown size={20} className="opacity-80" />
            </motion.div>
      </motion.div>
    </div>
  );
}