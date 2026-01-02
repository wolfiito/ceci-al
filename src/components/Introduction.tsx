"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// 1. DEFINIMOS LAS PROPS
interface IntroductionProps {
  familyName?: string;
}

// NUESTRA FIRMA DE SUAVIDAD
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Introduction({ familyName }: IntroductionProps) {
  return (
    <section className="relative w-full z-20 py-8 px-2 bg-wedding-light flex justify-center items-center overflow-hidden">
      
      {/* 1. TEXTURA DE PAPEL (Noise) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply bg-[url('/noise.png')] z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
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

        {/* SALUDO PERSONALIZADO: Aparece solo si existe familyName */}
        {familyName && (
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-wedding-primary mb-6 font-medium"
          >
            Querida {familyName}
          </motion.p>
        )}

        {/* Frase Principal */}
        <h2 className="font-serif text-2xl md:text-5xl text-wedding-dark leading-tight md:leading-snug mb-10 italic">
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