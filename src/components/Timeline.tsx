"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles,
  LucideIcon 
} from "lucide-react";
import { TimelineItem as TimelineItemType } from "@/types/wedding";

// Importamos nuestros nuevos iconos SVG limpios
import { IconBrindis, IconAnillos, IconComida, IconFotos, IconRecepcion } from "@/components/icons/CustomIcons";

interface TimelineProps {
  items?: TimelineItemType[];
}

type IconComponentType = LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, IconComponentType> = {
  // Lucide Icons (Backups)
  Church, GlassWater, Music, Utensils, PartyPopper, 
  Moon, Camera, MapPin, Heart, Bus, Coffee, Star, Sparkles,
  
  // Custom Icons (Tus SVGs complejos)
  "Brindis": IconBrindis,
  "Fotos": IconFotos,
  "Comida": IconComida,
  "Recepcion": IconRecepcion, // Ahora usa el SVG nuevo, no el PNG
  "Ceremonia": IconAnillos
};

// ... (El resto de tu componente TimelineItem y Timeline queda igual que antes)
// Solo asegúrate de borrar la definición de "PngIcon" y "const IconRecepcion = ..." antigua que tenías arriba.

const TimelineItem = ({ 
    data, 
    isActive, 
    isEven 
}: { 
    data: TimelineItemType, 
    isActive: boolean, 
    isEven: boolean 
}) => {
    const IconComponent = ICON_MAP[data.icon] || Star;

    return (
        <div className={`
            relative z-10 w-full mb-12 md:mb-24
            flex justify-between items-center
            ${isEven ? 'flex-row-reverse' : 'flex-row'}
        `}>
            {/* 1. ESPACIO VACÍO */}
            <div className="block w-[40%] sm:w-[42%]" />

            {/* 2. ICONO CENTRAL */}
            <div className="relative z-20 w-[30%] sm:w-[16%] flex justify-center items-center">
                <motion.div 
                    animate={{ 
                        backgroundColor: isActive ? "var(--color-wedding-secondary)" : "#ffffff",
                        borderColor: "var(--color-wedding-secondary)",
                        scale: isActive ? 1.45 : 1,
                    }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="
                        w-12 h-12 sm:w-20 sm:h-20 
                        border-[2px] sm:border-[3px] rounded-full flex items-center justify-center 
                        shadow-lg bg-white
                    "
                >
                    <motion.div
                        animate={{ color: isActive ? "#ffffff" : "var(--color-wedding-secondary)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <IconComponent className="w-5 h-5 sm:w-10 sm:h-10" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
            </div>

            {/* 3. CONTENIDO DE TEXTO */}
            <motion.div 
                className={`
                    w-[40%] sm:w-[42%]
                    ${isEven ? 'text-right' : 'text-left'}
                `}
                animate={{ 
                    opacity: isActive ? 1 : 0.3, 
                    x: isActive ? 0 : (isEven ? -20 : 20) 
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className={`flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                    <span className={`font-sans font-bold text-sm sm:text-xl tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-wedding-primary' : 'text-wedding-dark/40'}`}>
                        {data.time}
                    </span>
                    <span className="hidden sm:inline text-[10px] sm:text-xs font-bold text-wedding-secondary uppercase tracking-[0.2em]">
                        Horas
                    </span>
                </div>

                <h3 className="font-serif text-lg sm:text-5xl text-wedding-dark leading-tight mb-2 sm:mb-4 break-words">
                    {data.title}
                </h3>

                <p className="font-sans text-xs sm:text-base text-wedding-dark/60 leading-relaxed font-medium">
                    {data.description}
                </p>
            </motion.div>
        </div>
    );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const calculateTotalHeight = () => {
        if (!itemsRef.current.length || items.length === 0) return;
        const lastItem = itemsRef.current[items.length - 1];
        if (lastItem) {
            const height = lastItem.offsetTop + (lastItem.offsetHeight / 2);
            setTotalHeight(height);
        }
    };
    calculateTotalHeight();
    window.addEventListener('resize', calculateTotalHeight);
    const timer = setTimeout(calculateTotalHeight, 100);
    return () => {
        window.removeEventListener('resize', calculateTotalHeight);
        clearTimeout(timer);
    };
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const offset = windowHeight / 2;
      const relativeScroll = -rect.top + offset;
      const limit = totalHeight > 0 ? totalHeight : rect.height;
      const currentHeight = Math.max(0, Math.min(limit, relativeScroll));
      
      setLineHeight(currentHeight);

      let lastActiveIndex = -1;
      itemsRef.current.forEach((item, index) => {
        if (item) {
           const triggerPoint = item.offsetTop + (item.offsetHeight * 0.1); 
           if (currentHeight > triggerPoint) {
             lastActiveIndex = index;
           }
        }
      });
      setActiveStep(lastActiveIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length, totalHeight]);

  if (items.length === 0) return null;

  return (
    <section className="relative py-12 md:py-24 px-2 sm:px-4 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-10 sm:mb-16">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-serif text-5xl sm:text-9xl text-wedding-dark drop-shadow-sm">
                    Itinerario
                </h2>
            </motion.div>
         </div>

         <div ref={containerRef} className="relative"> 
            <div 
                style={{ height: `${lineHeight}px` }}
                className="absolute top-0 w-[4px] -ml-[2px] bg-wedding-secondary z-0 rounded-b-full transition-[height] duration-75 ease-linear shadow-[0_0_15px_rgba(215,86,114,0.4)] left-1/2 transform"
            />
            <div 
                style={{ height: totalHeight > 0 ? `${totalHeight}px` : '100%' }}
                className="absolute top-0 w-[4px] -ml-[2px] bg-wedding-dark/5 z-0 left-1/2 transform" 
            />

            <div className="space-y-0">
                {items.map((event, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div 
                            key={event.id}
                            ref={el => { itemsRef.current[index] = el }}
                        >
                            <TimelineItem 
                                data={event} 
                                isActive={index <= activeStep}
                                isEven={isEven} 
                            />
                        </div>
                    );
                })}
            </div>
         </div>
      </div>
    </section>
  );
}