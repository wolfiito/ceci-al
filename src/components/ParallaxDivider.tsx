"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax más suave para una imagen tan grande
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    // CAMBIO: h-screen para ocupar toda la vertical
    <div ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      
      {/* 1. FONDO CON MOVIMIENTO */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/images/walking.jpg" 
          alt="Nuestra Historia"
          fill
          priority
          className="object-cover"
        />
        {/* Capa oscura sutil para que el texto resalte, pero la foto brille */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Gradiente abajo para integrar con la siguiente sección blanca */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" />
      </motion.div>
    </div>
  );
}