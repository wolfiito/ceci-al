"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 1. Parallax del fondo (se mueve lento)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // 2. EL TEXTO VIAJERO (Con parada técnica)
  // Del 0% al 70% del scroll: Baja de 0vh a 60vh.
  // Del 70% al 100% del scroll: Se queda en 60vh (Fijo).
  const textY = useTransform(scrollYProgress, [0, 0.7, 1], ["0vh", "60vh", "60vh"]);
  
  // 3. Opacidad
  // Se mantiene visible casi todo el tiempo, solo se desvanece un poco al puro final
  // para que la tarjeta blanca lo tape suavemente.
  const textOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div 
      ref={ref} 
      className="sticky top-0 h-screen w-full overflow-hidden flex justify-center pt-32 -z-10"
    >
      {/* Fondo */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.jpg"
          alt="Ceci y Alejandro"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradiente superior para leer el texto al inicio */}
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-black/60 to-transparent" />
        {/* Gradiente inferior para leer el texto cuando aterriza */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </motion.div>

      {/* Texto */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center px-4"
      >
        <p className="text-lg md:text-2xl font-sans tracking-[0.2em] mb-4 uppercase text-white drop-shadow-md opacity-90">
          Nuestra Boda
        </p>
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-xl">
          Ceci <span className="font-light italic text-wedding-secondary/90">&</span> Alejandro
        </h1>
      </motion.div>
    </div>
  );
}