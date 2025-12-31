"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Church, GlassWater, Utensils, Music, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// DATOS
interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const EVENTS: TimelineEvent[] = [
    { time: "14:00", title: "Ceremonia Religiosa", description: "Capilla de San Francisco", icon: Church },
    { time: "15:30", title: "Cóctel de Bienvenida", description: "Jardín Principal", icon: GlassWater },
    { time: "17:00", title: "Banquete", description: "Salón Los Pinos", icon: Utensils },
    { time: "19:00", title: "Primer Baile", description: "¡Que comience la fiesta!", icon: Music },
    { time: "00:00", title: "Tornaboda", description: "Un snack para seguir", icon: Sparkles },
];

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative z-20 py-32 bg-wedding-light overflow-hidden">
      
      {/* TEXTURA */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply bg-[url('/noise.png')] z-0" />

      {/* HEADER ANIMADO */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE_LUXURY }}
        className="text-center mb-20 relative z-10"
      >
        <span className="text-wedding-primary text-xs uppercase tracking-[0.4em] font-sans block mb-3">
            Agenda
        </span>
        <h2 className="font-serif text-5xl md:text-6xl text-wedding-dark">
            Gran Día
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto relative px-4 z-10">
        
        {/* === LÍNEA CENTRAL (Solo Desktop) === */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2 h-full z-0 bg-wedding-primary/10">
             <motion.div 
                style={{ height: lineHeight }}
                className="w-full bg-wedding-primary origin-top"
            />
        </div>

        {/* === EVENTOS === */}
        <div className="space-y-12 md:space-y-24">
          {EVENTS.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0; 
            
            return (
              <motion.div 
                key={index}
                // ANIMACIÓN: Detecta cuando la fila entra en pantalla
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }} // Margen para que anime cuando ya esté bien adentro
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } } // Lógica de Cascada
                }}
                className="relative flex flex-col md:flex-row items-center w-full"
              >
                
                {/* 1. IZQUIERDA */}
                <div className={cn(
                    "hidden md:flex w-[45%] justify-end pr-12 text-right",
                    !isEven ? "invisible" : "" 
                )}>
                    {/* Pasamos 'right' para animar desde la derecha */}
                    <EventDetails event={event} align="right" />
                </div>

                {/* 2. ICONO CENTRAL (Pop Effect) */}
                <div className="relative w-full md:w-[10%] flex md:justify-center items-center pl-8 md:pl-0 mb-4 md:mb-0">
                    <motion.div 
                        variants={{
                            hidden: { scale: 0, opacity: 0 },
                            visible: { 
                                scale: 1, 
                                opacity: 1,
                                transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.8 } 
                            }
                        }}
                        className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-wedding-secondary/50 flex items-center justify-center shadow-md"
                    >
                        <Icon size={20} className="text-wedding-dark" strokeWidth={1.5} />
                    </motion.div>
                </div>

                {/* 3. DERECHA */}
                <div className={cn(
                    "hidden md:flex w-[45%] justify-start pl-12 text-left",
                    isEven ? "invisible" : "" 
                )}>
                     <EventDetails event={event} align="left" />
                </div>

                {/* === MÓVIL === */}
                <div className="md:hidden pl-24 pr-4 w-full -mt-10">
                    <EventDetails event={event} align="left" />
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Subcomponente animado
function EventDetails({ event, align }: { event: TimelineEvent, align: "left" | "right" }) {
    // Configuramos la dirección de entrada del texto
    const xOffset = align === "left" ? 30 : -30;

    return (
        <motion.div 
            variants={{
                hidden: { opacity: 0, x: xOffset },
                visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // EASE_LUXURY
                }
            }}
            className={cn("flex flex-col", align === "right" ? "items-end" : "items-start")}
        >
            <span className="font-serif text-3xl md:text-4xl text-wedding-secondary italic mb-2">
                {event.time}
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-wedding-dark mb-1">
                {event.title}
            </h3>
            <p className="font-sans text-xs md:text-sm text-gray-500 uppercase tracking-widest font-light">
                {event.description}
            </p>
        </motion.div>
    );
}