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
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="relative h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/images/walking.jpg"
          alt="Caminando juntos"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      
      <div className="relative z-10 text-white text-center p-6 bg-black/30 backdrop-blur-[2px] rounded-xl border border-white/20">
        <p className="font-serif text-2xl md:text-4xl italic">
          `El amor es un viaje que se hace paso a paso`
        </p>
      </div>
    </div>
  );
}