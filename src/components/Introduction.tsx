"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// NUESTRA FIRMA DE SUAVIDAD
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Introduction() {
  return (
    <section className="relative w-fullz-20 py-8 px-2 bg-wedding-light flex justify-center items-center overflow-hidden">
      
      {/* 1. TEXTURA DE PAPEL (Noise) */}
      {/* Solo se ve aquí, sobre el color claro, dando efecto de papelería fina */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply bg-[url('/noise.png')] z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} // Espera un poco antes de activarse
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="max-w-3xl text-center relative z-10"
      >
        {/* Icono decorativo */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.2 }}
          >
            <Sparkles className="text-wedding-secondary w-8 h-8" strokeWidth={1} />
          </motion.div>
        </div>

        {/* Frase Principal - Tipografía más grande y legible */}
        <h2 className="font-serif text-1xl md:text-5xl text-wedding-dark leading-tight md:leading-snug mb-10 italic">
         &ldquo;El amor no es solo mirarse el uno al otro, es mirar juntos en la misma dirección&rdquo;
        </h2>

        {/* Autor con estilo minimalista */}
        <div className="flex items-center justify-center gap-6 opacity-80">
            <div className="h-[1px] w-8 md:w-16 bg-wedding-primary/40"></div>
            <p className="font-sans text-xs uppercase tracking-[0.1em] text-wedding-primary font-medium">
                Antoine de Saint-Exupéry
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-wedding-primary/40"></div>
        </div>
      </motion.div>
    </section>
  );
}