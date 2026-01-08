"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { 
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles,
  LucideIcon 
} from "lucide-react";
import { TimelineItem as TimelineItemType } from "@/types/wedding";

// 1. INTERFACES
interface TimelineProps {
  items?: TimelineItemType[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles
};

// 2. COMPONENTE ITEM (SENSOR AJUSTADO: LIGERO ADELANTO)
const TimelineItem = ({ data, index, isLast }: { data: TimelineItemType, index: number, isLast: boolean }) => {
    const IconComponent = ICON_MAP[data.icon] || Star;
    const itemRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    const { scrollY } = useScroll();

    const checkVisibility = () => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();

        const triggerPoint = window.innerHeight * 0.60;

        const elementCenter = rect.top + (rect.height / 2);
        
        const isPastCenter = elementCenter < triggerPoint;

        if (isPastCenter !== isActive) {
            setIsActive(isPastCenter);
        }
    };

    useMotionValueEvent(scrollY, "change", checkVisibility);

    useEffect(() => {
        checkVisibility();
        window.addEventListener("resize", checkVisibility);
        return () => window.removeEventListener("resize", checkVisibility);
    }, []); 

    return (
        <div className="relative grid grid-cols-[60px_auto] sm:grid-cols-[120px_auto] gap-4 sm:gap-8 py-10 group">
            
            {/* LÍNEA BASE (Gris inactiva) */}
            
            {/* COLUMNA IZQUIERDA: BOLA E ICONO */}
            <div className="relative flex justify-center items-start pt-1 z-20">
                <motion.div 
                    ref={itemRef} 
                    animate={{ 
                        backgroundColor: isActive ? "var(--color-wedding-secondary)" : "#ffffff",
                        borderColor: "var(--color-wedding-secondary)",
                        scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 border-[3px] rounded-full flex items-center justify-center shadow-lg bg-white relative"
                >
                    <motion.div
                        animate={{ color: isActive ? "#ffffff" : "var(--color-wedding-secondary)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconComponent className="w-6 h-6 sm:w-10 sm:h-10" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
            </div>

            {/* COLUMNA DERECHA: TEXTO */}
            <motion.div 
                className={`flex flex-col justify-start pt-2 sm:pt-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className={`font-sans font-bold text-lg sm:text-xl tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-wedding-primary' : 'text-wedding-dark/40'}`}>
                        {data.time}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-wedding-secondary uppercase tracking-[0.2em]">
                        Horas
                    </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-5xl text-wedding-dark leading-none mb-3">
                    {data.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-wedding-dark/60 leading-relaxed font-medium max-w-lg">
                    {data.description}
                </p>
            </motion.div>

        </div>
    );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const timelineWrapperRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: timelineWrapperRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (items.length === 0) return null;

  return (
    <section className="relative py-24 md:py-40 px-4 overflow-hidden bg-white">
      
      {/* Fondos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
         
         <div className="text-center mb-32">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <p className="font-sans text-sm font-bold tracking-[0.4em] text-wedding-secondary uppercase mb-6">
                    Cronograma del Evento
                </p>
                <h2 className="font-serif text-7xl md:text-9xl text-wedding-dark drop-shadow-sm">
                    Itinerario
                </h2>
            </motion.div>
         </div>

         <div ref={timelineWrapperRef} className="relative pb-24 pl-4 sm:pl-10"> 
            
            {/* LÍNEA ROSA VIVA */}
            <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[46px] sm:left-[60px] top-2 w-[4px] -ml-[1.5px] bg-wedding-secondary z-10 origin-top"
            />

            <div className="space-y-0">
                {items.map((event, index) => (
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