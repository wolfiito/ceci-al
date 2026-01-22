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

// Variantes suaves para el texto
const textVariants: Variants = {
  hidden: { 
    opacity: 0.3, 
    filter: "blur(2px)",
    scale: 0.95,
    x: 0 
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
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
      // MAGIA DEL VIEWPORT:
      // margin top: "50%" -> Expande el área de detección hacia arriba. Si el item sale por arriba, sigue "activo".
      // margin bottom: "-50%" -> Recorta el área por abajo. Solo se activa cuando el item llega a la mitad de la pantalla.
      // once: false -> Permite que se apague si bajas mucho (retrocedes en el scroll y sale por abajo).
      viewport={{ once: false, margin: "50% 0px -50% 0px" }}
      className={`
        relative z-10 w-full mb-24 md:mb-32
        flex items-center justify-center gap-4 md:gap-8
        ${isEven ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* 1. LADO VACÍO (Mantiene el equilibrio) */}
      <div className="flex-1" />

      {/* 2. CÍRCULO CENTRAL */}
      <motion.div 
        variants={{
          hidden: { 
            backgroundColor: "#FFF5E1", 
            borderColor: "#FFF5E1", 
            scale: 1, 
            boxShadow: "0px 4px 10px rgba(0,0,0,0.05)" 
          },
          visible: { 
            backgroundColor: "#DB8C8A", 
            borderColor: "#DB8C8A", 
            scale: 1.15, // Cuidado con escalar demasiado
            boxShadow: "0px 10px 25px rgba(219,140,138,0.5)" 
          }
        }}
        className="
          relative z-20 
          w-24 h-24 sm:w-32 sm:h-32 
          border-[3px] sm:border-[4px] rounded-full 
          flex items-center justify-center flex-none
          overflow-hidden transition-colors duration-500
        "
      >
        {/* Imagen Inactiva */}
        <motion.div 
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 0 } }}
          className="absolute inset-0 p-4"
        >
          <Image src={images.inactive} alt={data.title} fill className="object-contain" />
        </motion.div>

        {/* Imagen Activa */}
        <motion.div 
          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
          className="absolute inset-0 p-4"
        >
          <Image src={images.active} alt={data.title} fill className="object-contain drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* 3. TEXTO (Ahora con flex-1 para ocupar el espacio restante sin chocar) */}
      <motion.div
        variants={textVariants}
        className={`flex-1 ${isEven ? "text-right" : "text-left"}`}
      >
        <motion.span 
          variants={{ hidden: { color: "#d6d3d1" }, visible: { color: "#DB8C8A" } }}
          className="block font-bold tracking-widest uppercase mb-1 text-xs md:text-sm"
        >
          {data.time}
        </motion.span>

        <motion.h3 
          variants={{ hidden: { color: "#d6d3d1" }, visible: { color: "#292524" } }}
          className="font-serif text-xl sm:text-3xl mb-2 leading-tight"
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
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="text-center mb-24 px-4">
        <span className="uppercase tracking-[0.3em] text-xs text-[#DB8C8A] font-bold block mb-3">
          Agenda del Día
        </span>
        <h2 className="font-serif text-5xl sm:text-7xl text-stone-800">
          Itinerario
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative" ref={containerRef}>
        {/* Líneas Centrales */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-[#F5EFE6]" />
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