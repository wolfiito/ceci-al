"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

// --- PALETA Y RECURSOS ---
const DARK_GREEN_OVERLAY = "bg-[#1A2621]"; 
const DUSTY_PINK_TEXT = "text-[#DCC5C5]";  
const NOISE_TEXTURE = "/noise.png"; 

export default function ScenicReveal() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScrollChange = (latestScroll: number) => {
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.9; 

      if (latestScroll > triggerPoint && !isVisible) {
        setIsVisible(true);
      } else if (latestScroll < triggerPoint && isVisible) {
        setIsVisible(false);
      }
    };

    const unsubscribe = scrollY.on("change", handleScrollChange);
    return () => unsubscribe();
  }, [scrollY, isVisible]);


  return (
    <motion.div 
      className={`fixed top-0 left-0 w-full h-full z-10 overflow-hidden pointer-events-none ${DARK_GREEN_OVERLAY}`}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <motion.div 
           className="relative w-full h-full"
           initial={{ scale: 1.1, filter: "blur(10px)" }}
           animate={{ 
             scale: isVisible ? 1 : 1.15, 
             filter: isVisible ? "blur(0px)" : "blur(8px)" 
           }}
           transition={{ duration: 1.5, ease: "easeOut" }}
        >
            <Image
                src="/images/walking.jpg" 
                alt="El camino juntos"
                fill
                className="object-cover object-center"
                priority
            />
            
            {/* Capas de Efectos Cine */}
            <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />

            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1A2621]/10 to-[#1A2621]/90" />
            
            {/* === TEXTO EN EL BOTTOM === */}
            {/* items-end: Alinea todo abajo | pb-24: Espacio desde el borde inferior */}
            <div className="absolute inset-0 flex items-end justify-center pb-120 px-4">
                 <div className="text-center space-y-4">
                     
                     {/* Frase Principal - MÁS GRANDE */}
                     <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 3, delay: 0.5 }}
                        className={`font-sans text-lg md:text-3xl ${DUSTY_PINK_TEXT} uppercase tracking-[0.3em] font-bold drop-shadow-md`}
                     >
                        Un nuevo capítulo comienza
                     </motion.h3>
                     
                     {/* Palabra 'Juntos' - GIGANTE */}
                     <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 3.2, delay: 0.8 }}
                        className="font-serif text-4xl md:text-9xl text-white opacity-95 leading-none drop-shadow-2xl pb-4"
                     >
                        Juntos
                     </motion.p>

                     {/* Línea decorativa */}
                     <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-[1.5px] w-32 mx-auto bg-[#DCC5C5] opacity-80 rounded-full"
                     />
                 </div>
            </div>
        </motion.div>
    </motion.div>
  );
}