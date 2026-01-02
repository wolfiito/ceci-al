"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// TUS FOTOS
// Puedes repetir las mismas o poner nuevas. Lo importante es que haya suficientes para llenar el ancho.
const PHOTOS = [
  "/images/hero-1.jpg",
  "/images/walking-1.jpg",
  "/images/couple-seated-1.jpg",
  // "/images/dresscode.jpg", // Asegúrate de tener estas rutas o usa las tuyas
  // "/images/hero-2.jpg",
  // "/images/hero.jpg", 
  // "/images/walking.jpg",
];

export default function GalleryMarquee() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* 1. TÍTULO FLOTANTE (Opcional, pero da contexto) */}
      <div className="text-center mb-12 px-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-wedding-secondary font-bold mb-2">
              Nuestra Historia
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-dark italic">
              Momentos Inolvidables
          </h2>
      </div>

      {/* 2. CONTENEDOR DEL MARQUEE */}
      {/* 'flex' y 'whitespace-nowrap' son clave para la fila horizontal */}
      <div className="relative w-full flex">
        
        {/* --- MÁSCARAS DE DIFUMINADO (La clave de la fluidez) --- */}
        {/* Izquierda */}
        <div className="absolute top-0 left-0 w-12 md:w-32 h-full z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Derecha */}
        <div className="absolute top-0 right-0 w-12 md:w-32 h-full z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />


        {/* --- CINTA ANIMADA 1 --- */}
        <MarqueeGroup />
        
        {/* --- CINTA ANIMADA 2 (Duplicada para el bucle infinito) --- */}
        <MarqueeGroup />

      </div>
    </section>
  );
}

// Componente auxiliar para no repetir código
const MarqueeGroup = () => (
  <motion.div
    initial={{ x: 0 }}
    animate={{ x: "-100%" }} // Se mueve hacia la izquierda
    transition={{ 
      duration: 40, // Ajusta la velocidad aquí (más alto = más lento)
      ease: "linear", 
      repeat: Infinity 
    }}
    className="flex gap-4 md:gap-8 px-2 md:px-4 shrink-0" // shrink-0 evita que se aplasten
  >
    {PHOTOS.map((src, index) => (
      <div 
        key={index} 
        className="relative w-[250px] md:w-[400px] h-[350px] md:h-[500px] rounded-xl overflow-hidden group cursor-pointer"
      >
        {/* IMAGEN */}
        <Image
          src={src}
          alt={`Gallery ${index}`}
          fill
          className="object-cover object-center transition-all duration-700 ease-out 
                     grayscale-0 sm:grayscale-[0.5] sm:hover:grayscale-0 
                     group-hover:scale-105"
          sizes="(max-width: 768px) 250px, 400px"
        />
        
        {/* OVERLAY BRILLO (Efecto cristal al pasar el mouse) */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    ))}
  </motion.div>
);