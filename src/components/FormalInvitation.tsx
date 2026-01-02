"use client";

import { motion } from "framer-motion";

// 1. DEFINIMOS LA INTERFAZ DE PROPS


// NUESTRA FIRMA DE SUAVIDAD
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FormalInvitation({ guestName }: { guestName: string }) {
  return (
    <section className="relative z-20 py-32 px-6 bg-wedding-light flex justify-center items-center overflow-hidden">
      
      {/* 1. TEXTURA DE PAPEL (Continuidad visual) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply bg-[url('/noise.png')] z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="max-w-4xl w-full text-center relative z-10 border-y border-wedding-primary/20 py-16 md:py-20"
      >
        {/* Elemento decorativo superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wedding-light px-4">
            <span className="text-3xl text-wedding-primary">ꕥ</span>
        </div>

        {/* FRASE ESPIRITUAL */}
        <div className="space-y-6 mb-12">
            <h3 className="font-serif text-2xl md:text-3xl text-wedding-dark/80 italic">
                &ldquo;Con la bendición de Dios y la alegría de nuestros corazones&rdquo;
            </h3>
            <p className="font-sans text-sm md:text-base text-wedding-dark/60 uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
                Tenemos el inmenso honor de invitar a
            </p>
        </div>

        {/* NOMBRE DEL INVITADO DINÁMICO */}
        <div className="mb-12">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: EASE_LUXURY }}
                className="inline-block relative"
            >
                <span className="font-serif text-4xl md:text-6xl text-wedding-primary block py-2 px-8 min-w-[300px] border-b border-wedding-secondary/30">
                    {guestName}
                </span>
            </motion.div>
        </div>

        {/* CIERRE */}
        <p className="font-serif text-xl md:text-2xl text-wedding-dark italic">
            A celebrar el comienzo de nuestra vida juntos.
        </p>

        {/* Elemento decorativo inferior */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-wedding-light px-4">
            <span className="text-3xl text-wedding-primary">ꕥ</span>
        </div>

      </motion.div>
    </section>
  );
}