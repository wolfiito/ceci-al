"use client";
import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  names: string;
  date: string;
}

const DUSTY_PINK_TEXT = "text-[#DCC5C5]"; 
const ROSE_ACCENT = "#CFA8A8";
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ names, date }: HeroProps) {
  const nameArray = names.split(/&| y /i).map(n => n.trim());
  const name1 = nameArray[0] || "Ceci";
  const name2 = nameArray[1] || "Alejandro";
  const formattedDate = date ? date.split("-").reverse().join(" . ") : "09 . 05 . 2026";

  const floatingVariant: Variants = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative h-[100svh] w-full overflow-hidden flex flex-col justify-center items-center bg-transparent">
      
      {/* TEXTOS */}
      <div className="relative z-10 w-full text-center flex flex-col items-center justify-center h-full pb-20">
        <div className="flex flex-col items-center leading-[0.8] md:leading-[0.85] drop-shadow-lg">
          
          {/* --- CORRECCIÓN AQUÍ: Agregamos className="relative" --- */}
          <motion.div 
            className="relative" // <--- ESTO SOLUCIONA EL DOBLE TEXTO
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.3 }}
          >
             {/* Capa 1: Mezcla con el fondo */}
             <motion.h1 variants={floatingVariant} animate="float" className="font-serif text-[20vw] md:text-[9vw] text-white mix-blend-overlay opacity-90">
                {name1}
             </motion.h1>
             {/* Capa 2: Texto sólido encima (Ahora sí se alinea con el de abajo) */}
             <motion.h1 variants={floatingVariant} animate="float" className="font-serif text-[20vw] md:text-[9vw] text-[#F2F0E9] absolute top-0 left-0 w-full pointer-events-none">
                {name1}
             </motion.h1>
          </motion.div>

          {/* Ampersand */}
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "backOut", delay: 0.8 }} className={`text-[6vw] md:text-[3vw] font-serif italic ${DUSTY_PINK_TEXT} my-4 md:my-2`}>
            <span style={{ textShadow: `0 0 20px ${ROSE_ACCENT}80` }}>&</span>
          </motion.div>

          {/* Nombre 2 (Si quieres el mismo efecto doble, también ponle relative) */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.5 }}
          >
            <motion.h1 variants={floatingVariant} animate="float" transition={{ delay: 0.5 }} className="font-serif text-[20vw] md:text-[9vw] text-[#F2F0E9]">
                {name2}
            </motion.h1>
          </motion.div>
        </div>

        {/* Fecha */}
        <motion.div initial={{ opacity: 0, letterSpacing: "0em" }} animate={{ opacity: 1, letterSpacing: "0.4em" }} transition={{ duration: 1.5, delay: 1.2 }} className="mt-12 md:mt-10">
            <div className="flex items-center gap-4">
               <div className={`h-[1px] w-8 md:w-16 bg-${ROSE_ACCENT} opacity-60`} />
               <p className={`text-sm md:text-xl font-sans ${DUSTY_PINK_TEXT} uppercase tracking-[0.4em] font-light`}>{formattedDate}</p>
               <div className={`h-[1px] w-8 md:w-16 bg-${ROSE_ACCENT} opacity-60`} />
            </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }} className={`absolute bottom-8 z-10 ${DUSTY_PINK_TEXT} opacity-70`}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll</span>
                    <ChevronDown size={24} strokeWidth={1} />
                </div>
            </motion.div>
      </motion.div>
    </div>
  );
}