"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { CalendarDays } from "lucide-react"; // Agregamos MapPin por si queremos usarlo
import Image from "next/image";

// 1. ACTUALIZAMOS PROPS para recibir ubicación real
interface CountdownProps {
  targetDate: string; 
  names: string;      
  locationName?: string; // Opcional, por si no llega
}

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Caja de tiempo rediseñada
const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="relative group w-full flex flex-col items-center justify-center py-6 sm:py-8">
    {/* CAMBIO CLAVE: Usamos 'font-sans' (Open Sans) y 'font-extrabold' 
       para que los números sean legibles, gordos e impactantes.
    */}
    <span className="text-4xl sm:text-6xl md:text-8xl font-sans font-extrabold tabular-nums leading-none text-wedding-secondary drop-shadow-md">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-wedding-light/80 font-sans font-medium">
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
  
  // Parallax suave para la foto de fondo
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const addToCalendar = () => {
    const title = `Boda ${names}`;
    const details = `¡Nos casamos! Acompáñanos en este día tan especial.`;
    // Usamos la prop o un fallback
    const loc = locationName || "Ubicación del evento";
    
    const gDate = targetDate.replace(/-/g, '');
    const start = `${gDate}T200000Z`; 
    const end = `${gDate}T040000Z`;
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(loc)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  return (
    <div ref={containerRef} className="relative z-20 w-full h-screen overflow-hidden flex flex-col justify-end">
      <div className="absolute inset-0 w-full h-full z-0">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/couple-seated-1.jpg" 
            alt={names}
            fill
            className="object-cover object-center opacity-60" 
          />
        </motion.div>
        {/* Gradiente más cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} 
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-20 md:pb-32 text-center"
      >
        <div className="mb-12 space-y-6">
            {/* Título en Cursiva (Alex Brush) */}
            <h2 className="font-serif text-5xl md:text-7xl text-wedding-light drop-shadow-lg">
                El tiempo vuela...
            </h2>
            
            <div className="flex items-center justify-center gap-4 opacity-80">
                 <div className="h-[1px] w-12 bg-wedding-secondary/60" />
                 <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-wedding-secondary font-semibold">
                    Cuenta regresiva
                 </p>
                 <div className="h-[1px] w-12 bg-wedding-secondary/60" />
            </div>
        </div>

        {/* CONTADOR */}
        <div className="w-full border-y border-white/10 bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-4 divide-x divide-white/10">
                <TimeBox value={timeLeft.days} label="Días" />
                <TimeBox value={timeLeft.hours} label="Hrs" />
                <TimeBox value={timeLeft.minutes} label="Min" />
                <TimeBox value={timeLeft.seconds} label="Seg" />
            </div>
        </div>

        <div className="mt-12">
            <button 
                onClick={addToCalendar}
                className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500"
            >
                <span className="relative flex items-center gap-3">
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