"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function RevealImage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Efecto Parallax Suave: La imagen se mueve un poco más lento que el scroll
  // Esto crea profundidad sin romper el layout con 'position: sticky'
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] overflow-hidden bg-wedding-light z-0">
      <motion.div 
        style={{ y, scale }} 
        className="relative w-full h-[120%] -top-[10%]" // Hacemos la imagen un poco más alta para tener margen de movimiento
      >
        <Image
          src="/images/hero-2.jpg"
          alt="Nosotros"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        
        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Texto flotante - Absoluto al contenedor padre para que no se mueva con la foto */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
         <h2 className="font-serif text-4xl md:text-6xl text-white/95 italic drop-shadow-lg text-center leading-tight">
            &ldquo;Juntos es nuestro<br/>lugar favorito&rdquo;
         </h2>
      </div>
    </div>
  );
}