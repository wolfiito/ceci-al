"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

// 1. DEFINIMOS LAS PROPS
interface CountdownProps {
  targetDate: string; // Recibe "YYYY-MM-DD"
  names: string;      // Recibe "Ceci & Alejandro"
}

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

export default function Countdown({ targetDate, names }: CountdownProps) {
  // 2. CONVERTIMOS LA FECHA DINÁMICA
  // Creamos el objeto Date usando la fecha que viene de Firebase
  const eventDate = new Date(`${targetDate}T14:00:00`); 
  const timeLeft = useCountdown(eventDate);
  
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // 3. CALENDARIO DINÁMICO
  const addToCalendar = () => {
    const title = `Boda ${names}`;
    const details = `¡Nos casamos! Acompáñanos en este día tan especial para ${names}.`;
    const location = "Hacienda Los Arcángeles, San Miguel de Allende";
    
    // Formateamos la fecha para Google Calendar (YYYYMMDD)
    const gDate = targetDate.replace(/-/g, '');
    const start = `${gDate}T200000Z`; 
    const end = `${gDate}T040000Z`;
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  return (
    <div ref={containerRef} className="relative z-20 w-full h-screen overflow-hidden bg-wedding-dark flex flex-col justify-end">
      
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/couple-seated.jpg" 
            alt={names}
            fill
            className="object-cover object-center opacity-70" 
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-wedding-dark via-wedding-dark/50 to-transparent" />
      </div>

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