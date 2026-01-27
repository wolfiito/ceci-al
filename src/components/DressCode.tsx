"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Palette } from "lucide-react";
import Image from "next/image";

// --- VARIANTES DE ANIMACIÓN ---

// Entrada desde la izquierda
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// Entrada desde la derecha
const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// Entrada suave hacia arriba (para textos)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, delay: 0.2 } 
  }
};

// Cascada para las listas
const listContainer: Variants = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 }
};

export default function DressCode() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative py-20 md:py-24 px-4 bg-[#F9F5F0] overflow-hidden">
      
      {/* Fondo Decorativo Sutil */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-white/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* ================================================= */}
        {/* 1. HEADER: PNG + TÍTULO + SUBTÍTULO */}
        {/* ================================================= */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-12"
        >
            {/* PNG DE TÍTULO */}
            <div className="relative w-77 h-77 md:w-32 md:h-32 mx-auto" style={{marginTop: '-160px'}}>
                <Image 
                    src="/images/iconos_Titulos-20.png" 
                    alt="Dress Code Icon"
                    fill
                    className="object-contain"
                />
            </div>

            <h2 className="text-3xl md:text-6xl font-serif text-stone-800 mb-2" style={{marginTop: '-90px'}}>
                Código de Vestimenta
            </h2>
            
            <span className="inline-block px-4 py-1 border-t border-b border-stone-300 text-sm md:text-lg text-stone-600 font-serif italic tracking-wide">
                Formal - Formal Casual
            </span>
        </motion.div>

        {/* ================================================= */}
        {/* 2. COLUMNAS LADO A LADO (Siempre grid-cols-2) */}
        {/* ================================================= */}
        <div className="grid grid-cols-2 gap-4 md:gap-16 w-full mb-12">
            
            {/* --- COLUMNA IZQUIERDA (ELLOS) --- */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={slideLeft}
                className="flex flex-col items-center text-center"
            >
                <div className="w-20 h-20 md:w-28 md:h-28 mb-4 relative hover:scale-105 transition-transform duration-500">
                    <Image 
                        src="/images/iconos_Traje.png" 
                        alt="Traje"
                        fill
                        className="object-contain drop-shadow-sm"
                    />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-stone-800 mb-3">Ellos</h3>
                
                <motion.ul variants={listContainer} initial="hidden" whileInView="visible" className="space-y-2">
                    <motion.li variants={listItem} className="text-xs md:text-base text-stone-600 font-light">Traje completo</motion.li>
                    <motion.li variants={listItem} className="text-xs md:text-base text-stone-600 font-light">Guayabera manga larga</motion.li>
                    <motion.li variants={listItem} className="text-xs md:text-base text-stone-600 font-light">Pantalón y camisa</motion.li>
                </motion.ul>
            </motion.div>

            {/* --- COLUMNA DERECHA (ELLAS) --- */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={slideRight}
                className="flex flex-col items-center text-center"
            >
                <div className="w-20 h-20 md:w-28 md:h-28 mb-4 relative hover:scale-105 transition-transform duration-500">
                    <Image 
                        src="/images/iconos_vestido.png" 
                        alt="Vestido"
                        fill
                        className="object-contain drop-shadow-sm"
                    />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-stone-800 mb-3">Ellas</h3>
                
                <motion.ul variants={listContainer} initial="hidden" whileInView="visible" className="space-y-2">
                    <motion.li variants={listItem} className="text-xs md:text-base text-stone-600 font-light">Vestido largo o midi</motion.li>
                    <motion.li variants={listItem} className="text-xs md:text-base text-stone-600 font-light">Traje sastre</motion.li>
                    <motion.li variants={listItem} className="text-xs md:text-base text-stone-600 font-light">Colores vivos/pasteles</motion.li>
                </motion.ul>
            </motion.div>

        </div>

        {/* ================================================= */}
        {/* 3. CALZADO Y MENSAJE IMPORTANTE (Abajo) */}
        {/* ================================================= */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl px-4"
        >
            {/* Nota de Calzado */}
            <div className="mb-8 inline-block bg-white px-4 py-2 rounded-full shadow-sm text-xs md:text-sm uppercase tracking-widest text-stone-500 font-bold border border-stone-100">
                <span> 
                    ✨ Calzado Cómodo 
                </span>
                <br />
                <span>
                    (Tenis permitidos) ✨
                </span>
            </div>

            {/* Texto Emotivo */}
            <div className="relative p-6 md:p-8 bg-white/60 rounded-3xl border border-stone-100 shadow-sm backdrop-blur-sm">
                <span className="absolute -top-4 -left-2 text-6xl text-stone-200 font-serif leading-none">“</span>
                
                <p className="font-serif text-base md:text-xl text-stone-600 leading-relaxed italic relative z-10">
                    Para nosotros lo más importante es su comodidad. Lo ideal es <strong className="text-stone-800 font-medium not-italic">Formal</strong> o <strong className="text-stone-800 font-medium not-italic">Formal Casual</strong>, pero eso no es relevante para nosotros; contar contigo es lo más importante.
                </p>
                
                <span className="absolute -bottom-8 -right-2 text-6xl text-stone-200 font-serif leading-none rotate-180">“</span>
            </div>

            {/* Colores Reservados */}
            <div className="mt-10">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mb-4 font-bold">
                    Colores Reservados (Corte Nupcial)
                </p>
                <div className="flex justify-center gap-6">
                    <ColorSwatch color="#D4B9B9" label="Rosa" delay={0.1} />
                    <ColorSwatch color="#8F9E8B" label="Verde" delay={0.2} />
                    <ColorSwatch color="#E6DCCA" label="Beige" delay={0.3} />
                    <ColorSwatch color="#FFFFFF" label="Blanco" delay={0.4} isWhite />
                </div>
            </div>

        </motion.div>

      </div>
    </section>
  );
}

// Subcomponente de Color
const ColorSwatch = ({ color, label, delay, isWhite }: { color: string, label: string, delay: number, isWhite?: boolean }) => (
    <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: delay }}
        viewport={{ margin: "-20px" }}
        className="flex flex-col items-center gap-2 group cursor-default"
    >
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm relative ${isWhite ? 'border border-stone-200' : ''}`} style={{ backgroundColor: color }}>
             {/* Prohibido */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-[1px] bg-stone-400/50 rotate-45 transform scale-75" />
             </div>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-stone-400">{label}</span>
    </motion.div>
);