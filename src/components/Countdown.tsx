"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react"; 
import Image from "next/image";

// --- 1. LÓGICA DEL HOOK (Versión Local para Preview) ---
// En tu proyecto real, descomenta la siguiente línea y borra esta función local:
import { useCountdown } from "@/hooks/useCountdown";

// --- 2. COMPONENTES VISUALES ---

interface CountdownProps {
  targetDate: string; 
  names: string;      
  locationName?: string; 
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group min-w-15 md:min-w-25">
    <div className="relative">
        <span className="absolute top-1 left-1 text-4xl sm:text-6xl md:text-8xl font-(family-name:--font-bodoni) font-medium text-black/20 select-none blur-[2px]">
             {value.toString().padStart(2, '0')}
        </span>
        <span className="relative text-4xl sm:text-6xl md:text-8xl font-(family-name:--font-bodoni) font-medium text-stone-100 tabular-nums leading-none tracking-tight drop-shadow-lg">
             {value.toString().padStart(2, '0')}
        </span>
    </div>
    <div className="mt-1 md:mt-4 flex items-center gap-1 md:gap-2">
        <div className="h-px w-2 md:w-6 bg-stone-300/60" />
        <span className="text-[8px] sm:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-200 font-semibold drop-shadow-md">
            {label}
        </span>
        <div className="h-1px w-2 md:w-6 bg-stone-300/60" />
    </div>
  </motion.div>
);

const Separator = () => (
    <motion.div 
        variants={itemVariants} 
        className="hidden md:flex flex-col justify-start items-center h-full pt-2 md:pt-4"
    >
        <span className="text-2xl md:text-4xl text-stone-300/80 font-(family-name:--font-bodoni) drop-shadow-md">:</span>
    </motion.div>
);

export default function Countdown({ targetDate, names, locationName }: CountdownProps) {
  const target = targetDate ? new Date(targetDate) : new Date(new Date().getFullYear() + 1, 0, 1);
  const timeLeft = useCountdown(target); 
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]); 

  const addToCalendar = () => {
    const title = `Boda ${names || 'Nuestra Boda'}`;
    const details = `¡Nos casamos! Acompáñanos en este día tan especial.`;
    const loc = locationName || "Ubicación del evento";
    const cleanDate = targetDate ? targetDate.replace(/-/g, '') : '20251220'; 
    const start = `${cleanDate}T140000Z`; 
    const end = `${cleanDate}T235900Z`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(loc)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  return (
    <section 
        ref={containerRef} 
        className="relative w-full h-screen flex flex-col justify-between items-center overflow-hidden py-12 md:py-24 px-4"
    >
      <div className="absolute inset-0 w-full h-full z-0">
          <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
             <Image 
                src="/images/couple-seated.jpg" 
                alt="Fondo Pareja"
                fill
                priority={false}
                className="w-full h-full object-cover object-center brightness-[0.70]" 
             />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-linear-to-t from-black/60 to-transparent" />
          {/* Degradado superior para que el título se lea bien arriba */}
          <div className="absolute inset-x-0 top-0 h-[30vh] bg-linear-to-b from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center h-full flex flex-col justify-between">
        
        {/* PARTE SUPERIOR: TÍTULO */}
        <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="pt-8 md:pt-12" // Padding superior extra
        >
            <div className="inline-flex items-center gap-2 text-stone-200 mb-2 md:mb-3 bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <Clock size={10} className="md:w-3 md:h-3" />
                <span className="text-[10px] md:text-[10px] uppercase tracking-[0.2em] font-bold">La Cuenta Regresiva</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-white italic tracking-tight drop-shadow-lg">
                Solo faltan...
            </h2>
        </motion.div>

        {/* PARTE INFERIOR: CONTADOR + BOTÓN */}
        <div className="md:pb-12"> {/* Padding inferior para separarlo del borde */}
            {/* CONTADOR */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px" }}
                className="flex flex-nowrap justify-center items-start gap-3 md:gap-10 mb-2 md:mb-12"
            >
                <TimeBox value={timeLeft.days} label="Días" />
                <Separator />
                <TimeBox value={timeLeft.hours} label="Hrs" />
                <Separator />
                <TimeBox value={timeLeft.minutes} label="Min" />
                <Separator />
                <TimeBox value={timeLeft.seconds} label="Seg" />
            </motion.div>

            {/* BOTÓN */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ margin: "-20px" }}
            >
                <button 
                    onClick={addToCalendar}
                    className="group relative mt-4 mb-4 inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-4 overflow-hidden rounded-full bg-white/90 text-stone-900 shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 transform active:scale-95 border border-white"
                >
                    <CalendarDays className="w-4 h-4 md:w-4.5 md:h-4.5 text-stone-500 group-hover:text-stone-800 transition-colors" />
                    <span className="font-sans text-[10px] md:text-sm uppercase tracking-[0.2em] font-bold">
                        Agendar Fecha
                    </span>
                </button>
                
                <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-stone-300 font-medium tracking-wide opacity-80 drop-shadow-md">
                    ¡Reserva este día en tu calendario!
                </p>
            </motion.div>
        </div>

      </div>
    </section>
  );
}