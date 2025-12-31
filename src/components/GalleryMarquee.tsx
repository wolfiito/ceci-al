"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PHOTOS = [
  "/images/hero.jpg",
  "/images/couple-seated.jpg", 
  "/images/walking.jpg",
  "/images/hero-2.jpg",
  "/images/hero.jpg", 
  "/images/couple-seated.jpg",
];

export default function GalleryMarquee() {
  return (
    <section className="relative py-0 bg-wedding-light overflow-hidden border-y border-wedding-primary/10">
      
      {/* TÍTULO PEQUEÑO */}
      <div className="absolute top-0 left-0 w-full z-10 flex justify-center -translate-y-1/2">
        <div className="bg-wedding-light px-6 py-1 border border-wedding-primary/20 rounded-full">
             <span className="text-[10px] uppercase tracking-[0.3em] text-wedding-primary">
                Nuestra Historia
             </span>
        </div>
      </div>

      {/* CONTENEDOR ROTADO */}
      <div className="flex -rotate-2 scale-110 py-12 md:py-20 bg-wedding-light">
        
        {/* TIRA 1 */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 gap-6 px-3"
        >
          {PHOTOS.map((src, i) => (
            <PhotoItem key={i} src={src} index={i} />
          ))}
        </motion.div>

        {/* TIRA 2 */}
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 gap-6 px-3"
        >
          {PHOTOS.map((src, i) => (
            <PhotoItem key={`dup-${i}`} src={src} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PhotoItem({ src, index }: { src: string, index: number }) {
    const rotate = index % 2 === 0 ? "rotate-1" : "-rotate-1";
    
    return (
        <div className={`relative w-[250px] h-[350px] md:w-[350px] md:h-[450px] shrink-0 overflow-hidden rounded-sm ${rotate} shadow-lg transition-transform hover:scale-105 duration-700`}>
            <Image
                src={src}
                alt="Gallery"
                fill
                // CORRECCIÓN: Eliminé 'grayscale hover:grayscale-0'
                // Ahora siempre se verán a color
                className="object-cover object-center transition-all duration-700"
            />
            {/* Brillo sutil mantenido */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
        </div>
    )
}