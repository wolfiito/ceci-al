"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Efectos Parallax
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); 
  const dateY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div 
      ref={ref} 
      className="relative h-svh w-full overflow-hidden flex flex-col justify-between py-24 md:py-12 items-center"
    >
      {/* 1. FONDO */}
      <motion.div 
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
        
        {/* Ruido sutil */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        
        {/* Gradientes para asegurar legibilidad */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* 2. SUPERIOR: NOMBRES */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 w-full text-center mt-8 md:mt-0"
      >
        <div className="flex flex-col items-center leading-[0.85] md:leading-[0.9] text-white drop-shadow-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-[15vw] md:text-[9vw] font-medium tracking-tight"
          >
            Ceci
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            // CAMBIO: Usamos el color dorado/crema (#E8DCC4) en lugar del rosa
            className="text-[6vw] md:text-[4vw] font-light italic text-[#E8DCC4] my-1"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="font-serif text-[15vw] md:text-[9vw] font-medium tracking-tight"
          >
            Alejandro
          </motion.h1>
        </div>
      </motion.div>

      {/* 3. INFERIOR: FECHA */}
      <motion.div
        style={{ y: dateY, opacity }}
        className="relative z-10 w-full text-center flex flex-col items-center mb-8"
      >
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-6"
        >
            {/* CAMBIO: Borde dorado sutil y fondo oscuro para conectar con el Countdown */}
            <div className="inline-block px-8 py-3 border border-[#E8DCC4]/30 rounded-full bg-black/30 backdrop-blur-md shadow-lg">
                 <p className="font-serif text-2xl md:text-3xl text-white tracking-widest drop-shadow-md">
                    09 <span className="text-[#E8DCC4] mx-1">.</span> 05 <span className="text-[#E8DCC4] mx-1">.</span> 2026
                </p>
            </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[#E8DCC4]/60" // También el icono en dorado sutil
        >
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <ChevronDown size={28} />
            </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}