"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Introduction() {
  return (
    <section className="py-24 px-4 bg-white flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        {/* Icono decorativo pequeño */}
        <div className="flex justify-center mb-6">
          <Sparkles className="text-[#D4B9B9] w-6 h-6" strokeWidth={1.5} />
        </div>

        {/* Frase Principal */}
        <h2 className="font-serif text-3xl md:text-4xl text-[#2C3E2E] leading-relaxed mb-6">
          `El amor no es solo mirarse el uno al otro, es mirar juntos en la misma dirección`
        </h2>

        {/* Autor o Decoración */}
        <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#7A8B77]/30"></div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#7A8B77]">
                Antoine de Saint-Exupéry
            </p>
            <div className="h-[1px] w-12 bg-[#7A8B77]/30"></div>
        </div>
      </motion.div>
    </section>
  );
}