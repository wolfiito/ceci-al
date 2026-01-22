"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { TimelineItem as TimelineItemType } from "@/types/wedding";

interface TimelineProps {
  items?: TimelineItemType[];
}

const IMAGE_MAP: Record<string, { inactive: string; active: string }> = {
  Recepcion: { inactive: "/images/recepcion_2.png", active: "/images/recepcion_1.png" },
  Ceremonia: { inactive: "/images/ceremonia_2.png", active: "/images/ceremonia_1.png" },
  Fotos: { inactive: "/images/fotos_2.png", active: "/images/fotos_1.png" },
  Comida: { inactive: "/images/Banquete_2.png", active: "/images/Banquete_1.png" },
  Brindis: { inactive: "/images/Fiesta_2.png", active: "/images/Fiesta_1.png" },
};

// Variantes para animar el texto y el círculo
const itemVariants: Variants = {
  hidden: { 
    opacity: 0.3, 
    filter: "blur(2px)",
    scale: 0.95,
    x: 0 // Posición neutral
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
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
      viewport={{ once: true, amount: 0.5, margin: "-10% 0px -10% 0px" }}
      className={`
        relative z-10 w-full mb-24 md:mb-40
        flex justify-between items-center
        ${isEven ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* Espacio vacío para equilibrar */}
      <div className="w-[35%] sm:w-[38%]" />

      {/* Círculo Central */}
      <motion.div 
        variants={{
          hidden: { backgroundColor: "#FFF5E1", borderColor: "#FFF5E1", scale: 1, boxShadow: "0px 4px 10px rgba(0,0,0,0.05)" },
          visible: { backgroundColor: "#DB8C8A", borderColor: "#DB8C8A", scale: 1.15, boxShadow: "0px 10px 25px rgba(219,140,138,0.5)" }
        }}
        className="
          relative z-20 w-24 h-24 sm:w-32 sm:h-32
          border-[3px] sm:border-[4px] rounded-full 
          flex items-center justify-center
          overflow-hidden flex-shrink-0 transition-colors duration-500
        "
      >
        {/* Imagen Inactiva (Se desvanece al activarse) */}
        <motion.div 
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 0 } }}
          className="absolute inset-0 p-3 sm:p-4"
        >
          <Image src={images.inactive} alt={data.title} fill className="object-contain" />
        </motion.div>

        {/* Imagen Activa (Aparece al activarse) */}
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
          className="absolute inset-0 p-3 sm:p-4"
        >
          <Image src={images.active} alt={data.title} fill className="object-contain drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* Texto */}
      <motion.div
        variants={itemVariants}
        className={`w-[35%] sm:w-[38%] ${isEven ? "text-right" : "text-left"}`}
      >
        <motion.span 
          variants={{ hidden: { color: "#d6d3d1" }, visible: { color: "#DB8C8A" } }}
          className="block font-bold tracking-widest uppercase mb-1 text-xs md:text-sm"
        >
          {data.time}
        </motion.span>

        <motion.h3 
          variants={{ hidden: { color: "#d6d3d1" }, visible: { color: "#292524" } }}
          className="font-serif text-lg sm:text-3xl mb-2"
        >
          {data.title}
        </motion.h3>

        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-light">
          {data.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook de Scroll para la línea conectora (Reemplaza cálculos manuales)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] // La línea se llena mientras escroleas el contenedor
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!items.length) return null;

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="text-center mb-24">
        <span className="uppercase tracking-[0.3em] text-xs text-[#DB8C8A] font-bold block mb-3">
          Agenda del Día
        </span>
        <h2 className="font-serif text-5xl sm:text-7xl text-stone-800">
          Itinerario
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative" ref={containerRef}>
        {/* Línea Base (Gris clara) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#F5EFE6]" />

        {/* Línea de Progreso (Rosa) - Se llena automáticamente */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#DB8C8A]"
        />

        <div className="relative z-10 space-y-10">
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