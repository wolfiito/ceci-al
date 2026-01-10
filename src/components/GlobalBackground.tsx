"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function GlobalBackground() {
  const { scrollY } = useScroll();

  // LÓGICA DEL ESQUELETO:
  // 0px - 800px: Estás viendo el Hero.
  // 800px - 1000px: Mientras la tarjeta de "Introducción" tapa la pantalla,
  //                 hacemos el cambio de imagen "detrás de cámaras".
  // > 1000px: Cuando se abre la siguiente ventana, ya se ve el Scenic.
  const scenicOpacity = useTransform(scrollY, [700, 1000], [0, 1]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#1A2621]">
      
      {/* --- CAPA 1: HERO (Siempre está abajo) --- */}
      <div className="absolute inset-0">
         <Image 
            src="/images/hero.jpg" 
            alt="Hero Background" 
            fill 
            className="object-cover object-center" 
            priority 
         />
         {/* Filtros del Hero */}
         <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
         <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#1A2621] to-transparent opacity-80" />
         <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#1A2621] via-[#1A2621]/50 to-transparent opacity-90" />
      </div>

      {/* --- CAPA 2: SCENIC (Aparece encima suavemente) --- */}
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
         {/* Filtros del Scenic */}
         <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
         <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1A2621]/10 to-[#1A2621]/90" />

         {/* TEXTO FIJO DEL SCENIC (Para que no se mueva) */}
         <div className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32 px-4">
             <div className="text-center space-y-4">
                 <h3 className="font-sans text-lg md:text-3xl text-[#DCC5C5] uppercase tracking-[0.3em] font-bold drop-shadow-md">
                    Un nuevo capítulo comienza
                 </h3>
                 <p className="font-serif text-5xl md:text-9xl text-white opacity-95 leading-none drop-shadow-2xl pb-4">
                    Juntos
                 </p>
                 <div className="h-[1.5px] w-32 mx-auto bg-[#DCC5C5] opacity-80 rounded-full" />
             </div>
         </div>
      </motion.div>

    </div>
  );
}