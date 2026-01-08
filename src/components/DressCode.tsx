"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Palette } from "lucide-react";
import Image from "next/image";

export default function DressCode() {
  const containerRef = useRef(null);

  // CONTROL DEL SCROLL
  // Medimos el progreso cuando la sección cruza la pantalla
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"], // Empieza cuando el top de la sección entra, termina cuando el centro llega al centro
  });

  // 1. MOVIMIENTOS LATERALES (PARALLAX)
  // El Traje va de -200px (Izquierda) a 0px (Su lugar)
  const xSuit = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  // El Vestido va de 200px (Derecha) a 0px (Su lugar)
  const xDress = useTransform(scrollYProgress, [0, 1], [200, 0]);
  
  // Opacidad progresiva (aparecen mientras se acercan)
  const opacityImages = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 md:py-40 px-6 bg-wedding-light overflow-hidden"
    >
      
      {/* Fondo Sutil */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wedding-secondary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* CABECERA */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
            <span className="font-serif text-5xl md:text-7xl text-wedding-secondary opacity-80 block transform -rotate-2 mb-2">
                Guía de Estilo
            </span>
            <h2 className="font-sans text-4xl md:text-7xl font-extrabold text-wedding-dark uppercase tracking-tight leading-none drop-shadow-sm">
                Formal Casual
            </h2>
            <div className="h-[2px] w-24 bg-wedding-primary/30 mx-auto my-6 md:my-8" />
            <p className="font-sans text-base md:text-lg text-wedding-dark/60 max-w-2xl mx-auto leading-relaxed font-light italic">
                Queremos que se sientan libres, cómodos y listos para disfrutar.
            </p>
        </motion.div>

        {/* COLUMNAS LIMPIAS (SIN CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24">
            
            {/* --- COLUMNA IZQUIERDA: ELLOS (TRAJE) --- */}
            {/* Entra de Izquierda a Derecha */}
            <div className="flex flex-col items-center text-center">
                
                {/* 1. IMAGEN CONTROLADA POR SCROLL */}
                <motion.div 
                    style={{ x: xSuit, opacity: opacityImages }}
                    className="w-32 h-32 md:w-48 md:h-48 relative mb-8"
                >
                    <Image 
                        src="/images/traje.png"
                        alt="Traje"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* 2. TEXTO (Aparece suavemente) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="font-serif text-3xl md:text-4xl text-wedding-dark mb-3">Ellos</h3>
                    <div className="h-px w-12 bg-wedding-dark/20 mx-auto mb-4" />
                    <p className="text-base md:text-lg font-sans text-wedding-dark/70 leading-relaxed mb-3">
                        Traje (con o sin corbata) o guayabera.
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-wedding-primary">
                        Comodidad y elegancia
                    </span>
                </motion.div>
            </div>

            {/* --- COLUMNA DERECHA: ELLAS (VESTIDO) --- */}
            {/* Entra de Derecha a Izquierda */}
            <div className="flex flex-col items-center text-center">
                
                {/* 1. IMAGEN CONTROLADA POR SCROLL */}
                <motion.div 
                    style={{ x: xDress, opacity: opacityImages }}
                    className="w-32 h-32 md:w-48 md:h-48 relative mb-8"
                >
                     <Image 
                        src="/images/vestido.png"
                        alt="Vestido"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </motion.div>

                {/* 2. TEXTO (Aparece suavemente) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="font-serif text-3xl md:text-4xl text-wedding-dark mb-3">Ellas</h3>
                    <div className="h-px w-12 bg-wedding-dark/20 mx-auto mb-4" />
                    <p className="text-base md:text-lg font-sans text-wedding-dark/70 leading-relaxed mb-3">
                        Vestido largo, midi o traje sastre.
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-wedding-secondary">
                        ¡Tu estilo es lo primero!
                    </span>
                </motion.div>
            </div>

        </div>

        {/* --- PALETA DE COLORES (APARECE AL FINAL) --- */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative bg-white/50 backdrop-blur-sm border border-wedding-dark/5 p-8 md:p-12 shadow-sm rounded-3xl max-w-4xl mx-auto"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wedding-dark text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-lg w-max z-20">
                <Palette size={12} />
                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold">Nota de Color</span>
            </div>

            <div className="text-center mb-10 pt-4">
                <p className="font-serif text-xl md:text-2xl text-wedding-dark italic opacity-80">
                    Reservados para la corte y los novios
                </p>
            </div>
            
            {/* GRID DE MUESTRAS */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                <ColorSwatch color="#D4B9B9" label="Rosa" delay={0.1} />
                <ColorSwatch color="#7A8B77" label="Verde" delay={0.2} />
                <ColorSwatch color="#E8DCC4" label="Beige" delay={0.3} />
                <ColorSwatch color="#FFFFFF" label="Blanco" delay={0.4} isWhite />
            </div>
        </motion.div>

      </div>
    </section>
  );
}

// Subcomponente para la muestra de color (para limpiar el código principal)
const ColorSwatch = ({ color, label, delay, isWhite }: { color: string, label: string, delay: number, isWhite?: boolean }) => (
    <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: delay }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 group"
    >
        <div 
            className={`w-14 h-14 md:w-20 md:h-20 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden ${isWhite ? 'border border-gray-100' : ''}`}
            style={{ backgroundColor: color }}
        >
            {isWhite && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />
            )}
            {/* Brillo sutil */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 blur-[2px] rounded-t-full" />
        </div>
        <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-wedding-dark/60">
            {label}
        </span>
    </motion.div>
);