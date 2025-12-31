"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Church, GlassWater, Utensils, Music, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. DEFINIMOS EL TIPO DE DATO (Para evitar el 'any')
interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon; // Tipo correcto para los iconos de Lucide
}

const EVENTS: TimelineEvent[] = [
    { time: "14:00", title: "Ceremonia Religiosa", description: "Capilla de San Francisco", icon: Church },
    { time: "15:30", title: "Cóctel de Bienvenida", description: "Jardín Principal", icon: GlassWater },
    { time: "17:00", title: "Banquete", description: "Salón Los Pinos", icon: Utensils },
    { time: "19:00", title: "Primer Baile", description: "¡Que comience la fiesta!", icon: Music },
    { time: "00:00", title: "Tornaboda", description: "Un snack para seguir", icon: Sparkles },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      
      {/* TÍTULO */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 md:mb-32"
      >
        <span className="text-[#E8DCC4] text-xs uppercase tracking-[0.4em] font-sans block mb-2">
            Agenda
        </span>
        <h2 className="font-serif text-5xl text-[#2C3E2E]">
            Gran Día
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto relative px-4">
        
        {/* LÍNEA CENTRAL */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 h-full z-0">
            <div className="w-full h-full bg-[#E8DCC4]/20" />
            <motion.div 
                style={{ height: lineHeight }}
                className="absolute top-0 left-0 w-full bg-[#E8DCC4] shadow-[0_0_15px_rgba(232,220,196,0.6)]"
            />
        </div>

        {/* EVENTOS */}
        <div className="relative z-10 space-y-24 md:space-y-32">
          {EVENTS.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="relative flex items-center justify-center w-full">
                
                {/* IZQUIERDA */}
                <div className={cn(
                  "hidden md:flex w-1/2 justify-end pr-16",
                  !isEven && "invisible"
                )}>
                  <EventCard event={event} align="right" delay={index} />
                </div>

                {/* CENTRO (Icono) */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                   <motion.div
                     initial={{ scale: 0, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                     className="w-14 h-14 rounded-full bg-white border border-[#E8DCC4] shadow-xl flex items-center justify-center relative z-20"
                   >
                     <Icon size={20} className="text-[#2C3E2E]" />
                     <div className="absolute -inset-2 rounded-full border border-[#E8DCC4]/20" />
                   </motion.div>
                </div>

                {/* DERECHA */}
                <div className={cn(
                  "hidden md:flex w-1/2 justify-start pl-16",
                  isEven && "invisible"
                )}>
                  <EventCard event={event} align="left" delay={index} />
                </div>

                {/* MÓVIL */}
                <div className="md:hidden w-full pl-20 relative">
                   <div className="absolute left-1/2 -translate-x-1/2 top-0">
                      {/* El icono usa el espacio del absolute padre */}
                   </div>
                   
                   <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={cn(
                        "text-center pt-16",
                        isEven ? "text-right pr-8 -ml-20" : "text-left pl-8"
                      )}
                   >
                      <span className="font-serif text-2xl text-[#E8DCC4] block mb-1">{event.time}</span>
                      <h3 className="font-serif text-xl text-[#2C3E2E] leading-tight">{event.title}</h3>
                      <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">{event.description}</p>
                   </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 2. CORRECCIÓN AQUÍ: Usamos la interfaz 'TimelineEvent' en lugar de 'any'
function EventCard({ event, align, delay }: { event: TimelineEvent, align: "left" | "right", delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: align === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay * 0.1 }}
            className={cn(
                "flex flex-col",
                align === "right" ? "items-end text-right" : "items-start text-left"
            )}
        >
            <div className="flex items-center gap-4 mb-2">
                {align === "right" && <div className="h-[1px] w-12 bg-[#E8DCC4]" />}
                <span className="font-serif text-4xl text-[#E8DCC4]">{event.time}</span>
                {align === "left" && <div className="h-[1px] w-12 bg-[#E8DCC4]" />}
            </div>
            
            <h3 className="font-serif text-3xl text-[#2C3E2E] mb-2">{event.title}</h3>
            <p className="font-sans text-sm text-gray-500 uppercase tracking-widest font-light">
                {event.description}
            </p>
        </motion.div>
    )
}