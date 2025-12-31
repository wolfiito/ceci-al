"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

const WEDDING_DATE = new Date('2026-05-09T14:00:00');

// Componente de Número "Editorial" con efecto Shimmer
const LuxuryNumber = ({ value, label, showSeparator }: { value: number; label: string, showSeparator?: boolean }) => (
  <div className="flex items-center">
    <div className="flex flex-col items-center mx-2 md:mx-6">
      {/* EL NÚMERO: Grande, Serif, con gradiente animado */}
      <div className={cn(
        "text-5xl md:text-7xl font-serif font-medium tabular-nums leading-none mb-2",
        // Gradiente: Verde Oscuro -> Rosa Palo (Brillo) -> Verde Oscuro
        "bg-clip-text text-transparent bg-gradient-to-r from-wedding-dark via-wedding-secondary to-wedding-dark",
        "bg-[length:200%_auto] animate-shimmer"
      )}>
        {value.toString().padStart(2, '0')}
      </div>
      
      {/* La Etiqueta: Pequeña, sans-serif, muy espaciada */}
      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-sans">
        {label}
      </span>
    </div>

    {/* SEPARADOR: Línea vertical fina y elegante (solo si no es el último) */}
    {showSeparator && (
      <div className="h-12 w-[1px] bg-wedding-secondary/30 mx-2 hidden md:block" />
    )}
  </div>
);

export default function Countdown() {
  const timeLeft = useCountdown(WEDDING_DATE);

  const handleAddToCalendar = () => {
    console.log("Agregar al calendario");
  };

  return (
    // SECCIÓN FONDO ROSA (#D4B9B9)
    <section className="py-20 px-4 flex justify-center bg-[#D4B9B9] rounded-t-[3rem]">
        
        {/* CARD BLANCA TIPO MEDIA LUNA */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white w-full max-w-3xl rounded-t-[12rem] rounded-b-[3rem] shadow-2xl px-6 pt-24 pb-14 text-center relative"
        >
            {/* Título */}
            <h2 className="font-serif italic text-5xl md:text-6xl text-wedding-dark mb-4 drop-shadow-sm">
                ¡Nos Casamos!
            </h2>
            
            {/* Fecha Estilizada */}
            <div className="flex items-center justify-center gap-4 mb-14 opacity-90">
                <span className="h-[1px] w-12 bg-wedding-primary/20"></span>
                <p className="font-serif text-wedding-primary text-lg md:text-2xl tracking-wide">
                    Sábado 09 de Mayo, 2026
                </p>
                <span className="h-[1px] w-12 bg-wedding-primary/20"></span>
            </div>

            {/* CONTADOR EDITORIAL */}
            {/* Flex row para alinearlos horizontalmente */}
            <div className="flex flex-wrap justify-center items-center mb-14">
                <LuxuryNumber value={timeLeft.days} label="Días" showSeparator />
                <LuxuryNumber value={timeLeft.hours} label="Hrs" showSeparator />
                <LuxuryNumber value={timeLeft.minutes} label="Min" showSeparator />
                <LuxuryNumber value={timeLeft.seconds} label="Seg" />
            </div>

            {/* Botón Sofisticado */}
            <button 
                onClick={handleAddToCalendar}
                className="group relative overflow-hidden bg-wedding-primary text-white font-serif py-4 px-10 rounded-full shadow-lg transition-all hover:shadow-xl mx-auto flex items-center gap-3"
            >
                {/* Efecto de fondo al hover */}
                <div className="absolute inset-0 w-full h-full bg-wedding-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center gap-2">
                    <CalendarDays size={18} />
                    <span className="tracking-widest text-sm uppercase">Agendar Fecha</span>
                </span>
            </button>

        </motion.div>
    </section>
  );
}