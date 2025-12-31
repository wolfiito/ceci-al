"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const WEDDING_DATE = new Date('2026-05-09T14:00:00');

// EASE SUAVE
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// CORRECCIÓN 1: TimeBox simplificado
// Quitamos la lógica de bordes aquí para evitar el "doble dibujo" que causa el parpadeo
const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="relative group w-full flex flex-col items-center justify-center py-6 sm:py-8">
    <span className="text-4xl sm:text-5xl md:text-7xl font-serif tabular-nums leading-none text-wedding-secondary drop-shadow-lg">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="mt-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] text-wedding-light/70 font-sans">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const timeLeft = useCountdown(WEDDING_DATE);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const addToCalendar = () => {
    const title = "Boda Ceci & Alejandro";
    const details = "¡Nos casamos! Acompáñanos en este día tan especial.";
    const location = "Hacienda Los Arcángeles, San Miguel de Allende";
    const start = "20260509T200000Z"; 
    const end = "20260510T040000Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  return (
    <div ref={containerRef} className="relative z-20 w-full h-screen overflow-hidden bg-wedding-dark flex flex-col justify-end">
      
      {/* 1. IMAGEN DE FONDO (LIMPIA, SIN RUIDO) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/couple-seated.jpg" 
            alt="Nosotros"
            fill
            className="object-cover object-center opacity-70" 
          />
        </motion.div>
        
        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-wedding-dark via-wedding-dark/50 to-transparent" />
        
        {/* CORRECCIÓN 2: Eliminé el div de noise.png completamente */}
      </div>

      {/* 2. CONTENIDO */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} 
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-16 md:pb-24 text-center"
      >
        <div className="mb-10 space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl text-wedding-light italic">
                &ldquo;El tiempo vuela...&rdquo;
            </h2>
            <div className="h-[1px] w-12 bg-wedding-secondary mx-auto" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-wedding-secondary font-light">
                Cuenta regresiva para el gran día
            </p>
        </div>

        {/* CONTADOR */}
        <div className="w-full border-y border-wedding-secondary/20 bg-black/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
            {/* CORRECCIÓN 3: Usamos SOLO divide-x aquí. Esto dibuja 1 sola línea limpia entre columnas. */}
            <div className="grid grid-cols-4 divide-x divide-wedding-secondary/20">
                <TimeBox value={timeLeft.days} label="Días" />
                <TimeBox value={timeLeft.hours} label="Hrs" />
                <TimeBox value={timeLeft.minutes} label="Min" />
                <TimeBox value={timeLeft.seconds} label="Seg" />
            </div>
        </div>

        <div className="mt-10">
            <button 
                onClick={addToCalendar}
                className="group relative inline-flex items-center gap-3 px-8 py-3 overflow-hidden rounded-full bg-transparent border border-wedding-secondary text-wedding-secondary hover:text-wedding-dark transition-colors duration-300"
            >
                <div className="absolute inset-0 w-full h-full bg-wedding-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span className="font-sans text-[11px] uppercase tracking-widest font-bold">
                        Agendar en Google
                    </span>
                </span>
            </button>
        </div>

      </motion.div>
    </div>
  );
}