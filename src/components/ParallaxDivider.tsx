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
  
  // Movimiento Parallax Suave (La foto se mueve más lento que el scroll)
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Un leve zoom para darle vida
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    // Altura de 70vh (no pantalla completa, pero sí grande) para que funcione como separador
    <div ref={ref} className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden flex items-center justify-center bg-black">
      
      {/* IMAGEN DE FONDO */}
      <motion.div 
        style={{ y, scale }} 
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <Image
          src="/images/walking.jpg" // Asegúrate de tener esta foto en public/images/
          alt="Nosotros"
          fill
          className="object-cover object-center"
          priority={false}
        />
        
        {/* Capa oscura muy sutil para homogeneizar */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    </div>
  );
}