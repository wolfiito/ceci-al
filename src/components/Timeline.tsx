"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const TimelineItem = ({
  data,
  isActive,
  isEven,
}: {
  data: TimelineItemType;
  isActive: boolean;
  isEven: boolean;
}) => {
  const images = IMAGE_MAP[data.icon] || IMAGE_MAP.Recepcion;

  return (
    <div
      className={`
        relative z-10 w-full mb-16 md:mb-32
        flex justify-between items-center
        ${isEven ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* Espacio */}
      <div className="block w-[35%] sm:w-[38%]" />

      {/* Círculo */}
      <div className="relative z-20 w-[30%] sm:w-[24%] flex justify-center items-center">
        <motion.div
          animate={{
            backgroundColor: isActive ? "#DB8C8A" : "#FFF5E1",
            borderColor: isActive ? "#DB8C8A" : "#FFF5E1",
            scale: isActive ? 1.15 : 1,
            boxShadow: isActive
              ? "0px 10px 25px rgba(219,140,138,0.5)"
              : "0px 4px 10px rgba(0,0,0,0.05)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="
            w-24 h-24 sm:w-32 sm:h-32
            border-[3px] sm:border-[4px]
            rounded-full flex items-center justify-center
            overflow-hidden relative flex-shrink-0
          "
        >
          {/* Inactivo */}
          <div className="absolute inset-0 p-3 sm:p-4">
            <motion.div
              animate={{ opacity: isActive ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={images.inactive}
                alt={data.title}
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Activo */}
          <div className="absolute inset-0 p-3 sm:p-4">
            <motion.div
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={images.active}
                alt={`${data.title} active`}
                fill
                className="object-contain drop-shadow-md"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Texto */}
      <motion.div
        className={`w-[35%] sm:w-[38%] ${isEven ? "text-right" : "text-left"}`}
        animate={{
          opacity: isActive ? 1 : 0.3,
          x: isActive ? 0 : isEven ? -20 : 20,
          filter: isActive ? "blur(0px)" : "blur(1px)",
        }}
        transition={{ duration: 0.6 }}
      >
        <span
          className={`block font-bold tracking-widest uppercase mb-1 text-sm ${
            isActive ? "text-[#DB8C8A]" : "text-stone-300"
          }`}
        >
          {data.time}
        </span>

        <h3
          className={`font-serif text-lg sm:text-3xl mb-2 ${
            isActive ? "text-stone-800" : "text-stone-300"
          }`}
        >
          {data.title}
        </h3>

        <p className="text-sm text-stone-500 leading-relaxed">
          {data.description}
        </p>
      </motion.div>
    </div>
  );
};

export default function Timeline({ items = [] }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [lineStart, setLineStart] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  /* MEDICIONES */
  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current || !items.length) return;

      const first = itemsRef.current[0];
      const last = itemsRef.current[items.length - 1];
      if (!first || !last) return;

      const start = first.offsetTop + first.offsetHeight / 2;
      const end = last.offsetTop + last.offsetHeight / 2;

      setLineStart(start);
      setTotalHeight(end - start);
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [items]);

  /* SCROLL */
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const trigger = window.innerHeight * 0.5;

      const raw = -rect.top + trigger - lineStart;
      const height = Math.max(0, Math.min(totalHeight, raw));

      setLineHeight(height);

      let active = -1;
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const center = item.offsetTop + item.offsetHeight / 2;
        if (height + lineStart >= center) active = i;
      });

      setActiveStep(active);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lineStart, totalHeight]);

  if (!items.length) return null;

  return (
    <section className="relative py-16 md:py-32 bg-white overflow-hidden">
      {/* TÍTULO */}
      <div className="text-center mb-20 md:mb-32">
        <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-[#DB8C8A] font-bold block mb-3">
          Agenda del Día
        </span>
        <h2 className="font-serif text-5xl sm:text-8xl text-stone-800">
          Itinerario
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative" ref={containerRef}>
        {/* Línea base */}
        <div
          style={{ top: lineStart, height: totalHeight }}
          className="absolute left-1/2 w-[4px] -ml-[2px] bg-[#EFE5D5]"
        />

        {/* Línea progreso */}
        <div
          style={{ top: lineStart, height: lineHeight }}
          className="absolute left-1/2 w-[4px] -ml-[2px] bg-[#DB8C8A] rounded-b-full shadow-lg"
        />

        <div className="relative z-10">
          {items.map((item, i) => (
            <div key={item.id} ref={(el) => {
                itemsRef.current[i] = el;    
            }}>
              <TimelineItem
                data={item}
                isEven={i % 2 === 0}
                isActive={i <= activeStep}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
