"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const WEDDING_DATE = new Date('2026-05-09T14:00:00');

// Componente TimeBox (Diseño Micro Minimalista)
const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="relative group w-full">
    {/* Caja con fondo semi-transparente para asegurar lectura */}
    <div className="relative h-20 sm:h-24 md:h-32 flex flex-col items-center justify-center overflow-hidden border-t border-[#E8DCC4]/30 bg-black/20 backdrop-blur-sm">
      
      {/* Número */}
      <span className={cn(
        "text-3xl sm:text-4xl md:text-6xl font-serif tabular-nums leading-none mb-1",
        "text-[#E8DCC4]",
        "drop-shadow-md"
      )}>
        {value.toString().padStart(2, '0')}
      </span>

      {/* Etiqueta */}
      <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/80 font-sans">
        {label}
      </span>
    </div>
  </div>
);

export default function Countdown() {
  const timeLeft = useCountdown(WEDDING_DATE);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax suave para la foto de fondo
  const yBg = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-end">
      
      {/* 1. IMAGEN FULL SCREEN */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[110%] -top-[5%]">
          <Image
            src="/images/couple-seated.jpg" 
            alt="Fondo textura"
            fill
            className="object-cover opacity-80" 
          />
        </motion.div>
        
        {/* Gradiente solo abajo para que el texto se lea */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Ruido sutil */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* 2. CONTENIDO (Alineado Abajo) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-12 md:pb-20 text-center"
      >
        
        {/* Título Sutil */}
        <div className="mb-8">
            <h2 className="font-serif text-2xl md:text-4xl text-white drop-shadow-lg italic mb-2">
                &ldquo;El tiempo vuela...&rdquo;
            </h2>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#E8DCC4] opacity-80">
                Faltan para el gran día
            </p>
        </div>

        {/* GRID PEGADO ABAJO */}
        <div className="grid grid-cols-4 w-full border-b border-[#E8DCC4]/30">
          <TimeBox value={timeLeft.days} label="Días" />
          <TimeBox value={timeLeft.hours} label="Hrs" />
          <TimeBox value={timeLeft.minutes} label="Min" />
          <TimeBox value={timeLeft.seconds} label="Seg" />
        </div>

        {/* Botón Discreto (CORREGIDO) */}
        <div className="mt-8">
            {/* AGREGADO: text-[#E8DCC4] para que se vea el texto */}
            <button className="group relative inline-flex items-center gap-2 px-6 py-2 border border-[#E8DCC4]/50 rounded-full text-[#E8DCC4] hover:bg-[#E8DCC4] hover:text-black transition-all duration-300">
                <CalendarDays size={14} />
                <span className="font-sans text-[10px] uppercase tracking-widest">Agendar</span>
            </button>
        </div>

      </motion.div>
    </div>
  );
}