"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookHeart } from "lucide-react"; // Un icono sutil para acompañar

export default function ParallaxDivider() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animación suave: El texto flota ligeramente hacia arriba mientras haces scroll
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-32 flex items-center justify-center bg-transparent" // Fondo limpio
    >
      {/* Contenedor "Menos Ancho" (max-w-md) para efecto columna elegante */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-sm md:max-w-md px-8 text-center"
      >
        {/* Adorno Superior */}
        <div className="flex flex-col items-center gap-4 mb-8">
            <div className="h-12 w-[1px] bg-wedding-secondary/60" />
            <BookHeart size={20} className="text-wedding-secondary" strokeWidth={1} />
        </div>

        {/* Versículo Bíblico */}
        <blockquote className="font-serif text-2xl md:text-3xl text-wedding-dark leading-relaxed italic mb-8">
          &ldquo;Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.&rdquo;
        </blockquote>

        {/* Cita */}
        <cite className="not-italic">
            <p className="font-sans text-xs font-bold tracking-[0.3em] text-wedding-primary uppercase">
              Colosenses 3:14
            </p>
        </cite>
        
        {/* Adorno Inferior */}
        <div className="flex flex-col items-center gap-4 mt-8">
             <div className="h-12 w-[1px] bg-wedding-secondary/60" />
        </div>
      </motion.div>

    </section>
  );
}