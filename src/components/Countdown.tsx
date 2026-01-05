"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { CalendarDays } from "lucide-react"; 
import Image from "next/image";

interface CountdownProps {
  targetDate: string; 
  names: string;      
  locationName?: string; 
}

// --- PALETA DE COLORES ---
const DARK_GREEN_BG = "bg-[#1A2621]";       
const DUSTY_PINK_TEXT = "text-[#DCC5C5]";  
const ROSE_ACCENT = "border-[#CFA8A8]";    
const CREAM_TEXT = "text-[#F2F0E9]";       

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Caja de tiempo (Ahora sin bordes ni fondos, solo texto puro)
const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center justify-center">
    {/* NÚMEROS LIMPIOS Y GIGANTES */}
    <span className={`text-5xl sm:text-7xl md:text-9xl font-sans font-bold tabular-nums leading-none ${DUSTY_PINK_TEXT} drop-shadow-xl`}>
      {value.toString().padStart(2, '0')}
    </span>
    {/* ETIQUETA PEQUEÑA */}
    <span className={`mt-2 md:mt-4 text-[10px] sm:text-xs uppercase tracking-[0.4em] ${CREAM_TEXT} font-light opacity-80`}>
      {label}
    </span>
  </div>
);

export default function Countdown({ targetDate, names, locationName }: CountdownProps) {
  const eventDate = new Date(`${targetDate}T14:00:00`); 
  const timeLeft = useCountdown(eventDate);
  
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const addToCalendar = () => {
    const title = `Boda ${names}`;
    const details = `¡Nos casamos! Acompáñanos en este día tan especial.`;
    const loc = locationName || "Ubicación del evento";
    const gDate = targetDate.replace(/-/g, '');
    const start = `${gDate}T200000Z`; 
    const end = `${gDate}T040000Z`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(loc)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  return (
    <div ref={containerRef} className={`relative z-20 w-full min-h-screen overflow-hidden flex flex-col justify-end ${DARK_GREEN_BG}`}>
      
      {/* 1. FONDO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/couple-seated.jpg"
            alt={names}
            fill
            className="object-cover object-center opacity-100" 
          />
        </motion.div>
        {/* Filtros para integrar la foto */}
        <div className="absolute inset-0 bg-[#1A2621]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-top from-[#1A2621] via-transparent to-[#1A2621]/40" />
      </div>

      {/* 2. CONTENIDO */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} 
        transition={{ duration: 2.2, ease: EASE_LUXURY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-4 md:pb-36 text-center"
      >
        <div className="mb-4 space-y-4">
            <h2 className={`font-serif text-5xl md:text-7xl ${CREAM_TEXT} drop-shadow-lg italic`}>
                Solo faltan
            </h2>
        </div>

        {/* 3. EL CONTADOR (GRID LIMPIO) */}
        {/* Sin bordes, sin fondo, sin divisores */}
        <div className="grid grid-cols-4 gap-2 md:gap-8 items-start justify-center">
            <TimeBox value={timeLeft.days} label="Días" />
            <TimeBox value={timeLeft.hours} label="Hrs" />
            <TimeBox value={timeLeft.minutes} label="Min" />
            <TimeBox value={timeLeft.seconds} label="Seg" />
        </div>

        {/* 4. BOTÓN */}
        <div className="mt-10">
            <button 
                onClick={addToCalendar}
                className={`group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden rounded-full border ${ROSE_ACCENT} bg-transparent transition-all duration-500 hover:bg-[#CFA8A8]`}
            >
                <span className={`relative flex items-center gap-3 transition-colors duration-300 ${DUSTY_PINK_TEXT} group-hover:text-[#1A2621]`}>
                    <CalendarDays size={18} />
                    <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold">
                        Agendar Fecha
                    </span>
                </span>
            </button>
        </div>

      </motion.div>
    </div>
  );
}