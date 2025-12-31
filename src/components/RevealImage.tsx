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

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]); // Zoom sutil hacia afuera

  return (
    // Altura controlada para que funcione el efecto sticky
    <div ref={containerRef} className="relative w-full h-[80vh] -z-10">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <motion.div style={{ scale }} className="relative w-full h-full">
          <Image
            src="/images/hero-2.jpg" // Asegúrate que esta foto sea distinta a la del Hero
            alt="Nosotros"
            fill
            className="object-cover object-center"
          />
          
          {/* Capa oscura cinematográfica */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Texto que flota sobre la foto (Opcional) */}
          <div className="absolute inset-0 flex items-center justify-center">
             <h2 className="font-serif text-5xl md:text-7xl text-white/90 italic drop-shadow-xl text-center px-4">
                &ldquo;Juntos es nuestro<br/>lugar favorito&rdquo;
             </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}