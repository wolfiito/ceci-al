"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function GlobalBackground() {
  const { scrollY } = useScroll();

  // LÓGICA DE APARICIÓN DEL FONDO
  const scenicOpacity = useTransform(scrollY, [500, 1200], [0, 1]);

  // LÓGICA PARALLAX DEL TEXTO (Ajustada para el bottom)
  // Ahora empieza 60px más abajo y sube suavemente hasta su posición final (y:0)
  // para dar un efecto de "asentarse" en el fondo.
  const textY = useTransform(scrollY, [800, 1500], [60, 0]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#1A2621]">
      
      {/* --- CAPA 1: HERO --- */}
      <div className="absolute inset-0">
         <Image 
            src="/images/hero.jpg" 
            alt="Hero Background" 
            fill 
            className="object-cover object-center" 
            priority 
         />
         <div className="absolute inset-0 bg-[#1A2621]/50" />
      </div>

      {/* --- CAPA 2: SCENIC + TEXTO --- */}
      <motion.div 
        style={{ opacity: scenicOpacity }} 
        className="absolute inset-0"
      >
         <Image 
            src="/images/walking.jpg" 
            alt="Scenic Background" 
            fill 
            className="object-cover object-center" 
            priority 
         />
         
         {/* Capas de oscurecimiento */}
         <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
         {/* Gradiente inferior más fuerte para que el texto resalte ahí abajo */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#1A2621] via-transparent to-transparent" />

         {/* --- TEXTO FLOTANTE --- */}
         <motion.div 
            style={{ y: textY }}
            // CAMBIO CLAVE: items-end (abajo) y pb-[10px] (separación exacta)
            className="absolute inset-0 flex items-end justify-center px-6 z-10 pb-20"
         >
             <div className="text-center">
                 {/* Cita Bíblica (Un poco más pequeña para el bottom) */}
                 <h3 className="font-(family-name:--font-bodoni) text-4xl md:text-5xl text-[#F2F0E9] italic drop-shadow-xl mb-4">
                    "Encontré al que ama mi alma"
                 </h3>
                 
                 {/* Referencia y adorno */}
                 <div className="flex flex-col items-center gap-3">
                     <div className="w-12 h-[1.5px] bg-[#DCC5C5]" />
                     <p className="font-sans text-sm md:text-xs text-[#DCC5C5] uppercase tracking-[0.4em] font-bold drop-shadow-md">
                        Cantares 3:4
                     </p>
                     <div className="w-12 h-[1.5px] bg-[#DCC5C5]" />
                 </div>
             </div>
         </motion.div>

      </motion.div>

    </div>
  );
}