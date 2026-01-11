"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const DUSTY_PINK_TEXT = "text-[#DCC5C5]";

export default function ScenicReveal() {
  // 1. Creamos una referencia al contenedor
  const containerRef = useRef(null);

  // 2. Usamos esa referencia para el scroll target
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Ajustamos las transformaciones para que sean más suaves
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    // 3. Importante: 'relative' aquí para satisfacer la advertencia de Framer Motion
    <div ref={containerRef} className="relative w-full h-[120vh] -z-20"> 
       <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A2621]">
          <motion.div 
            style={{ opacity }} 
            className="absolute inset-0 w-full h-full"
          >
             <motion.div style={{ scale }} className="relative w-full h-full">
                <Image
                    src="/images/walking.jpg" 
                    alt="El camino juntos"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority={false} 
                />
                
                {/* Filtros */}
                <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1A2621]/10 to-[#1A2621]/90" />
                
                {/* Texto */}
                <div className="absolute inset-0 flex items-end justify-center pb-32 px-4">
                     <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-center space-y-4"
                     >
                         <h3 className={`font-sans text-lg md:text-3xl ${DUSTY_PINK_TEXT} uppercase tracking-[0.3em] font-bold drop-shadow-md`}>
                            Un nuevo capítulo comienza
                         </h3>
                         
                         <p className="font-serif text-5xl md:text-9xl text-white opacity-95 leading-none drop-shadow-2xl pb-4">
                            Juntos
                         </p>

                         <div className="h-[1.5px] w-32 mx-auto bg-[#DCC5C5] opacity-80 rounded-full" />
                     </motion.div>
                </div>
             </motion.div>
          </motion.div>
       </div>
    </div>
  );
}