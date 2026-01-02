"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ParallaxDivider() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // La imagen se moverá más lento que el scroll, creando profundidad
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  // Texto que aparece suavemente
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[40vh] overflow-hidden flex items-center justify-center"
    >
      {/* IMAGEN DE FONDO PARALLAX */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <Image
          src="/images/hero-1.jpg" // Usa una foto linda horizontal aquí
          alt="Divider"
          fill
          className="object-cover object-center grayscale brightness-75"
        />
      </motion.div>

      {/* TEXTO FLOTANTE */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center text-white px-4"
      >
        <p className="font-serif text-3xl md:text-5xl italic drop-shadow-lg">
          &ldquo;Nuestros mejores momentos&rdquo;
        </p>
        <div className="w-12 h-[1px] bg-white/60 mx-auto mt-4" />
      </motion.div>

    </div>
  );
}