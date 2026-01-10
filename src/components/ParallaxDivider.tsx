"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export default function ParallaxDivider() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax: El texto se mueve más lento que la imagen/fondo
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-32 md:py-48 bg-[#fcfaf7] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative flex flex-col md:flex-row items-center justify-center">
        
        {/* 1. ELEMENTO DECORATIVO DE FONDO (Círculo o Forma Abstracta) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-stone-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* 2. BLOQUE DE TEXTO FLOTANTE */}
        <motion.div 
            style={{ y: yText, opacity }}
            className="relative z-10 max-w-2xl text-center md:text-left"
        >
            {/* Línea decorativa superior */}
            <div className="h-[1px] w-24 bg-stone-800/20 mb-8 mx-auto md:mx-0" />
            
            <h3 className="font-serif text-3xl md:text-5xl text-stone-800 leading-tight italic mb-8">
                Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.
            </h3>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <span className="font-sans text-xs font-bold tracking-[0.3em] text-stone-500 uppercase">
                    Colosenses 3:14
                </span>
                
                {/* Pequeño detalle visual */}
                <div className="hidden md:block h-[1px] w-12 bg-stone-300 mt-2" />
            </div>
        </motion.div>
            
      </div>
    </section>
  );
}