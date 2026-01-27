"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { TimelineItem as TimelineItemType } from "@/types/wedding";

interface TimelineProps {
  items?: TimelineItemType[];
}
const DUSTY_PINK_TEXT = "text-[#DB8C8A]";
const IMAGE_MAP: Record<string, { inactive: string; active: string }> = {
  Recepcion: { inactive: "/images/recepcion.png", active: "/images/recepcion.png" },
  Ceremonia: { inactive: "/images/ceremonia_2.png", active: "/images/ceremonia_1.png" },
  Fotos: { inactive: "/images/fotos_2.png", active: "/images/fotos_1.png" },
  Comida: { inactive: "/images/Banquete_2.png", active: "/images/Banquete_1.png" },
  Brindis: { inactive: "/images/Fiesta_2.png", active: "/images/Fiesta_1.png" },
  Salida: { inactive: "/images/recien-casados.png", active: "/images/recien-casados.png"}
};

// === MEJORA 1: Variantes más "snappy" (rápidas) ===
// Quitamos el 'blur' que consume GPU y bajamos la duración.
const textVariants: Variants = {
  hidden: { 
    opacity: 0.2, 
    y: 10,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" } // Más rápido
  }
};

const TimelineItem = ({
  data,
  isEven,
}: {
  data: TimelineItemType;
  isEven: boolean;
}) => {
  const images = IMAGE_MAP[data.icon] || IMAGE_MAP.Recepcion;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      // === MEJORA 2: Ajuste del Viewport ===
      // Hacemos que reaccione un poco antes al entrar
      viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
      className={`
        relative z-10 w-full mb-20 md:mb-32
        flex items-center justify-center gap-4 md:gap-8
        ${isEven ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* 1. ESPACIO VACÍO */}
      <div className="flex-1" />

      {/* 2. CÍRCULO CENTRAL */}
      <motion.div 
        variants={{
          hidden: { 
            backgroundColor: "#FFF5E1", 
            borderColor: "#FFF5E1", 
            scale: 1, 
            boxShadow: "0px 2px 5px rgba(0,0,0,0.05)" 
          },
          visible: { 
            backgroundColor: "#DB8C8A", 
            borderColor: "#DB8C8A", 
            scale: 1.1, 
            boxShadow: "0px 8px 20px rgba(219,140,138,0.4)" 
          }
        }}
        // Transición más rápida para el círculo también
        transition={{ duration: 0.35 }}
        className="
          relative z-20 
          w-20 h-20 sm:w-32 sm:h-32 
          border-[3px] sm:border-[4px] rounded-full 
          flex items-center justify-center flex-none
          overflow-hidden
        "
      >
        {/* Imagen Inactiva */}
        <motion.div 
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 0 } }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 p-4"
        >
          {/* === MEJORA 3: Propiedad 'sizes' === 
              Esto evita descargar la imagen gigante en móviles. */}
          <Image 
            src={images.inactive} 
            alt={data.title} 
            fill 
            sizes="(max-width: 768px) 100px, 150px"
            className="object-contain" 
          />
        </motion.div>

        {/* Imagen Activa */}
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 p-4"
        >
           {/* 'sizes' y 'priority' para que esté lista antes */}
          <Image 
            src={images.active} 
            alt={data.title} 
            fill 
            sizes="(max-width: 768px) 100px, 150px"
            className="object-contain drop-shadow-md" 
          />
        </motion.div>
      </motion.div>

      {/* 3. TEXTO */}
      <motion.div
        variants={textVariants}
        className={`flex-1 ${isEven ? "text-right" : "text-left"}`}
      >
        <motion.span 
          variants={{ hidden: { color: "#d6d3d1" }, visible: { color: "#DB8C8A" } }}
          className="block font-bold tracking-widest uppercase mb-1 text-xl md:text-2xl"
        >
          {data.time}
        </motion.span>

        <motion.h3 
          variants={{ hidden: { color: "#d6d3d1" }, visible: { color: "#ffffff" } }}
          className="font-(family-name:--font-bodoni) font-bold text-2xl sm:text-3xl mb-2 leading-tight"
        >
          {data.title}
        </motion.h3>

        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light max-w-[200px] sm:max-w-none ml-0 sm:mx-0 inline-block">
          {data.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  if (!items.length) return null;

  return (
    <section className="relative py-6 md:py-32 overflow-hidden">
      <div className="text-center mb-20 px-4">
        <h2 className="font-(family-name:--font-bodoni) text-5xl sm:text-7xl text-[#DB8C8A]">
          Itinerario
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative" ref={containerRef}>
        {/* Línea Base */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#F5EFE6]" />
        
        {/* Línea de Progreso */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#DB8C8A]"
        />

        <div className="relative z-10 w-full">
          {items.map((item, i) => (
            <TimelineItem
              key={item.id || i}
              data={item}
              isEven={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}