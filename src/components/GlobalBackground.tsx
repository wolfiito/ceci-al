"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function GlobalBackground() {
  const { scrollY } = useScroll();

  const scenicOpacity = useTransform(scrollY, [500, 1200], [0, 1]);
  const textY = useTransform(scrollY, [800, 1500], [60, 0]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-[#1A2621]">
      
      <div className="absolute inset-0">
         <Image 
            src="/images/hero.jpg" 
            alt="Hero Background" 
            fill 
            className="object-cover object-center" 
            priority 
         />
         <div
            className="absolute inset-0"style={{
               background:
                  "linear-gradient(to bottom, rgba(26,38,33,.85), rgba(26,38,33,0.10) 55%, rgba(26,38,33,0))"
               }}
         />
         <div
            className="absolute inset-0"style={{
               background:
                  "linear-gradient(to top, rgba(26,38,33,1), rgba(26,38,33,0.10) 30%, rgba(26,38,33,0))"
               }}
         />

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

         <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#1A2621] via-transparent to-transparent" />


         <motion.div 
            style={{ y: textY }}
            // CAMBIO CLAVE: items-end (abajo) y pb-[10px] (separación exacta)
            className="absolute inset-0 flex items-end justify-center px-6 z-10 pb-20"
         >
         </motion.div>

      </motion.div>

      

    </div>
  );
}