"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles,
  LucideIcon 
} from "lucide-react";

// 1. DEFINICIÓN DE INTERFACES (Para limpiar los errores ts(2304) y ts(7006))
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

// Componente Interno con Tipado Estricto
const TimelineItem = ({ data, index, isLast }: { data: TimelineItemData, index: number, isLast: boolean }) => {
    const IconComponent = ICON_MAP[data.icon] || Star;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative pl-12 sm:pl-40 py-10 group"
        >
            {!isLast && (
                <div className="absolute left-[0.6rem] sm:left-[6.1rem] top-12 bottom-0 w-[0.5px] bg-wedding-secondary/20 z-0" />
            )}
            
            <div className="absolute left-[0.35rem] sm:left-[5.85rem] top-11 w-2 h-2 bg-wedding-secondary rounded-full z-10" />

            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-16">
                <div className="sm:w-24 text-left sm:text-right shrink-0">
                    <span className="font-serif text-3xl sm:text-4xl text-wedding-secondary/40 font-light italic tabular-nums block sm:mt-[-8px]">
                        {data.time}
                    </span>
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 text-wedding-secondary/70">
                        <IconComponent size={18} strokeWidth={1.2} />
                        <h3 className="font-serif text-2xl text-wedding-dark tracking-tight">
                            {data.title}
                        </h3>
                    </div>
                    
                    <p className="text-base font-sans text-wedding-dark/50 leading-relaxed max-w-lg font-light">
                        {data.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (items.length === 0) return null;

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden bg-[#Fdfbf7]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('/noise.png')] z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
         <div className="relative pl-12 sm:pl-40 mb-20 text-left">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-serif text-5xl md:text-7xl text-wedding-dark font-light italic leading-none mb-6">
                    El Itinerario
                </h2>
                <div className="h-[1px] w-24 bg-wedding-secondary/30" />
            </motion.div>
         </div>

         <div className="relative">
            <div className="absolute left-[0.6rem] sm:left-[6.1rem] top-0 bottom-0 w-[1px] bg-wedding-primary/5 z-0" />
            
            <motion.div 
                style={{ height }}
                className="absolute left-[0.6rem] sm:left-[6.1rem] top-0 w-[1px] bg-wedding-secondary z-10 origin-top opacity-60"
            />

            <div className="space-y-2 pt-4">
                {/* TIPADO EXPLÍCITO EN EL MAP PARA ELIMINAR TS(7006) */}
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