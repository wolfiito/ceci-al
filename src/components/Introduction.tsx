"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    filter: "blur(10px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] 
    }
  },
};

export default function Introduction() {
  return (
    <section 
        className="relative w-full z-20 py-24 px-6 flex justify-center items-center overflow-hidden"
        style={{ backgroundColor: '#DCC5C5' }} 
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ 
            once: true,    
            amount: 0.2 // Bajé a 0.2 para que en móvil se active apenas asome
        }} 
        className="max-w-2xl text-center relative z-10"
      >
        
        {/* ICONO */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative">
                <div className="absolute inset-0 bg-white/30 blur-xl rounded-full transform scale-150"></div>
                <Sparkles className="text-white w-10 h-10 relative z-10 opacity-90" strokeWidth={1} />
            </div>
        </motion.div>

        {/* FRASE */}
        <motion.blockquote variants={itemVariants} className="mb-10">
            <p className="font-serif text-2xl md:text-4xl text-[#4A3B3B] leading-relaxed italic drop-shadow-sm">
                &ldquo;Dios tiene un tiempo perfecto para todo. En Su tiempo nos encontró, en Su amor nos unió y con Su bendición hoy emprendemos este viaje juntos&rdquo;
            </p>
        </motion.blockquote>

        {/* ORNAMENTO (SOLUCIÓN SVG) */}
        {/* Usamos un gráfico vectorial en lugar de divs vacíos */}
        <motion.div variants={itemVariants} className="flex justify-center items-center opacity-80">
            <svg width="160" height="10" viewBox="0 0 160 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Línea Izquierda */}
                <line x1="0" y1="5" x2="70" y2="5" stroke="#4A3B3B" strokeWidth="1.5" />
                
                {/* Círculo Central */}
                <circle cx="80" cy="5" r="3" fill="#4A3B3B" />
                
                {/* Línea Derecha */}
                <line x1="90" y1="5" x2="160" y2="5" stroke="#4A3B3B" strokeWidth="1.5" />
            </svg>
        </motion.div>

      </motion.div>
    </section>
  );
}