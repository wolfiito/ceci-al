"use client";

// CORRECCIÓN 1: Importamos 'Variants' para que TS no se queje
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  names: string;
  date: string;
}

// --- PALETA DE COLORES PERSONALIZADA ---
const DARK_GREEN_OVERLAY = "from-[#1A2621]"; 
const DUSTY_PINK_TEXT = "text-[#DCC5C5]"; 
const ROSE_ACCENT = "#CFA8A8";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ names, date }: HeroProps) {
  
  const nameArray = names.split(/&| y /i).map(n => n.trim());
  const name1 = nameArray[0] || "Ceci";
  const name2 = nameArray[1] || "Alejandro";

  const formattedDate = date ? date.split("-").reverse().join(" . ") : "09 . 05 . 2026";

  // CORRECCIÓN 2: Tipamos explícitamente la variante como 'Variants'
  const floatingVariant: Variants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col justify-center items-center bg-[#151E1A]">
      
      {/* 1. IMAGEN DE FONDO + FILTRO VERDE */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.jpg" 
          alt={names}
          fill
          priority
          className="object-cover object-center" 
        />
        
        {/* CAPA DE COLOR */}
        <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
        <div className={`absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b ${DARK_GREEN_OVERLAY} to-transparent opacity-80`} />
        <div className={`absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t ${DARK_GREEN_OVERLAY} via-[#1A2621]/50 to-transparent opacity-90`} />
      </motion.div>

      {/* 2. TEXTOS (NOMBRES Y FECHA) */}
      <div className="relative z-10 w-full text-center flex flex-col items-center justify-center h-full pb-20">
        
        <div className="flex flex-col items-center leading-[0.8] md:leading-[0.85] drop-shadow-lg">
          
          {/* NOMBRE 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.3 }}
          >
             <motion.h1 
               variants={floatingVariant}
               animate="float"
               className="font-serif text-[20vw] md:text-[9vw] text-white mix-blend-overlay opacity-90"
             >
              {name1}
             </motion.h1>
             
             <motion.h1 
               variants={floatingVariant}
               animate="float"
               className="font-serif text-[20vw] md:text-[9vw] text-[#F2F0E9] absolute top-0 left-0 w-full pointer-events-none"
             >
              {name1}
             </motion.h1>
          </motion.div>

          {/* EL AMPERSAND (&) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut", delay: 0.8 }}
            className={`text-[6vw] md:text-[3vw] font-serif italic ${DUSTY_PINK_TEXT} my-4 md:my-2`}
          >
            <span style={{ textShadow: `0 0 20px ${ROSE_ACCENT}80` }}>&</span>
          </motion.div>

          {/* NOMBRE 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.5 }}
          >
            <motion.h1 
               variants={floatingVariant}
               animate="float"
               transition={{ delay: 0.5 }} 
               className="font-serif text-[20vw] md:text-[9vw] text-[#F2F0E9]"
             >
              {name2}
             </motion.h1>
          </motion.div>
        </div>

        {/* FECHA */}
        <motion.div
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-12 md:mt-10"
        >
            <div className="flex items-center gap-4">
               <div className={`h-[1px] w-8 md:w-16 bg-${ROSE_ACCENT} opacity-60`} />
               
               <p className={`text-sm md:text-xl font-sans ${DUSTY_PINK_TEXT} uppercase tracking-[0.4em] font-light`}>
                  {formattedDate}
               </p>
               
               <div className={`h-[1px] w-8 md:w-16 bg-${ROSE_ACCENT} opacity-60`} />
            </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className={`absolute bottom-8 z-10 ${DUSTY_PINK_TEXT} opacity-70`}
        >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll</span>
                    <ChevronDown size={24} strokeWidth={1} />
                </div>
            </motion.div>
      </motion.div>
    </div>
  );
}