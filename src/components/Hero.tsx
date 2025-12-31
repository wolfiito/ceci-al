"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// CONSTANTE DE SUAVIDAD
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax suave
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); 

  return (
    <div 
      ref={ref} 
      // CAMBIO: 'justify-start' para mandar todo arriba y 'pt-32' para darle aire desde el borde superior
      className="relative z-20 bg-black h-svh w-full overflow-hidden flex flex-col justify-start items-center pt-32 md:pt-24"
    >
      {/* 1. FONDO (Limpio, sin noise) */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: EASE_LUXURY }}
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.jpg"
          alt="Ceci y Alejandro"
          fill
          priority
          className="object-cover object-center" 
        />
        
        {/* Solo oscurecimiento suave para que se lean las letras blancas */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Gradiente superior suave para resaltar el texto blanco */}
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-black/40 to-transparent" />
      </motion.div>

      {/* 2. TEXTOS - NOMBRES (Ahora están arriba) */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 w-full text-center flex flex-col items-center"
      >
        <div className="flex flex-col items-center leading-[0.85] md:leading-[0.9] text-white drop-shadow-2xl">
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.5 }}
            className="font-serif text-[16vw] md:text-[10vw] font-medium tracking-tight"
          >
            Ceci
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.7 }}
            className="text-[5vw] md:text-[3vw] font-light italic text-[#E8DCC4] my-2"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.9 }}
            className="font-serif text-[16vw] md:text-[10vw] font-medium tracking-tight"
          >
            Alejandro
          </motion.h1>
        </div>

        {/* 3. FECHA MINIMALISTA (Justo debajo de los nombres) */}
        {/* Eliminamos la caja/borde. Ahora es texto limpio y elegante */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-8 md:mt-10"
        >
            <p className="font-serif text-lg md:text-2xl text-[#E8DCC4] tracking-[0.4em] uppercase font-light drop-shadow-md">
                09 . 05 . 2026
            </p>
        </motion.div>
      </motion.div>

      {/* Indicador de Scroll (Se mantiene abajo del todo) */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-10 z-10 text-white/50"
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