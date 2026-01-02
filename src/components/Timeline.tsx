"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles,
  LucideIcon 
} from "lucide-react";

// 1. INTERFACES
interface TimelineItemData {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineProps {
  items?: TimelineItemData[];
}

// Mapeo de iconos
const ICON_MAP: Record<string, LucideIcon> = {
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles
};

// Componente Interno Rediseñado
const TimelineItem = ({ data, index, isLast }: { data: TimelineItemData, index: number, isLast: boolean }) => {
    const IconComponent = ICON_MAP[data.icon] || Star;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative grid grid-cols-[80px_auto] sm:grid-cols-[160px_auto] gap-6 sm:gap-12 py-8 group"
        >
            {/* LÍNEA CONECTORA (Fondo gris tenue) */}
            {!isLast && (
                <div className="absolute left-[80px] sm:left-[160px] top-12 bottom-0 w-[1px] -ml-[0.5px] bg-wedding-dark/10 z-0" />
            )}
            
            {/* COLUMNA IZQUIERDA: HORA */}
            <div className="text-right flex flex-col items-end pt-2">
                <span className="font-sans font-extrabold text-2xl sm:text-4xl text-wedding-dark leading-none tracking-tight">
                    {data.time}
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-widest text-wedding-primary font-bold mt-1">
                    Horas
                </span>
            </div>

            {/* NODO CENTRAL (ICONO) - Se posiciona absolutamente en el centro del gap */}
            <div className="absolute left-[80px] sm:left-[160px] top-0 -translate-x-1/2 mt-1 z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-wedding-secondary/30 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={20} className="text-wedding-primary" strokeWidth={1.5} />
                </div>
            </div>

            {/* COLUMNA DERECHA: CONTENIDO */}
            <div className="pt-1 pb-8 pl-6 sm:pl-0">
                <h3 className="font-serif text-3xl sm:text-5xl text-wedding-dark leading-none mb-3 transform -rotate-1 origin-left">
                    {data.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-wedding-dark/60 leading-relaxed font-medium max-w-md">
                    {data.description}
                </p>
            </div>

        </motion.div>
    );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animación de la línea de progreso (se llena de color)
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (items.length === 0) return null;

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 px-4 overflow-hidden bg-white">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
         
         {/* CABECERA */}
         <div className="text-center mb-24">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <p className="font-sans text-xs font-bold tracking-[0.4em] text-wedding-primary uppercase mb-4">
                    Cronograma del Evento
                </p>
                <h2 className="font-serif text-6xl md:text-8xl text-wedding-dark drop-shadow-sm">
                    Itinerario
                </h2>
            </motion.div>
         </div>

         {/* CONTENEDOR DE LA LÍNEA DE TIEMPO */}
         <div className="relative">
            
            {/* LÍNEA DE PROGRESO GLOBAL (Color activo que baja) */}
            {/* Se posiciona igual que la línea de los items para superponerse */}
            <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[80px] sm:left-[160px] top-12 w-[2px] -ml-[1px] bg-wedding-primary/40 z-0 origin-top"
            />

            <div className="space-y-0">
                {items.map((event: TimelineItemData, index: number) => (
                    <TimelineItem 
                        key={event.id} 
                        data={event} 
                        index={index} 
                        isLast={index === items.length - 1} 
                    />
                ))}
            </div>
         </div>
      </div>
    </section>
  );
}