"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
// En producción, usa 'next/image'. Aquí usamos 'img' para el preview.
import Image from "next/image";

// FOTOS PLACEHOLDER (Para que el preview se vea bien ahora mismo)
const PHOTOS = [
  "/images/hero.jpg",
  "/images/walking.jpg",
  "/images/couple-seated.jpg",
  "/images/hero-2.jpg",
  "/images/walking.jpg",
  "/images/couple-seated.jpg",
  "/images/hero.jpg", 
];

export default function GalleryMarquee() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-20 md:py-32 bg-stone-50 overflow-hidden">
      
      {/* 1. CABECERA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16 px-4"
      >
          <span className="uppercase tracking-[0.2em] text-[10px] md:text-sm text-stone-500 font-semibold mb-3 block">
              Nuestra Historia
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-stone-800 mb-4 md:mb-6 italic">
              Momentos
          </h2>
          <div className="w-16 md:w-24 h-1 bg-stone-300 mx-auto rounded-full" />
      </motion.div>

      {/* 2. CONTENEDOR DEL MARQUEE */}
      <div className="relative w-full flex">
        
        {/* Máscaras laterales (Gradientes suaves para desvanecer bordes) */}
        <div className="absolute top-0 left-0 w-12 md:w-40 h-full z-20 bg-gradient-to-r from-stone-50 via-stone-50/90 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 md:w-40 h-full z-20 bg-gradient-to-l from-stone-50 via-stone-50/90 to-transparent pointer-events-none" />

        {/* CINTA INFINITA */}
        <div className="flex w-max">
             <MarqueeGroup onImageClick={setSelectedImage} />
             <MarqueeGroup onImageClick={setSelectedImage} />
        </div>

      </div>

      {/* 3. LIGHTBOX (Modal) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Botón Cerrar (Más grande en móvil para facilitar toque) */}
            <button className="absolute top-4 right-4 md:top-6 md:right-6 text-stone-300 hover:text-white transition-colors z-50 p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <X size={24} strokeWidth={1.5} />
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-5xl h-auto max-h-[80vh] rounded-lg overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* IMPORTANTE: En producción cambiar a <Image src={selectedImage} ... /> */}
                <Image
                    src={selectedImage}
                    alt="Full size"
                    fill
                    priority
                    className="w-full h-full object-contain max-h-[80vh] mx-auto bg-black/20"
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Componente individual
const GalleryItem = ({ src, onImageClick }: { src: string; onImageClick: (s: string) => void }) => {
    return (
        <motion.div
            // Dimensiones responsive: Más pequeño en móvil (220px), más grande en desktop (400px)
            className="relative w-[220px] md:w-[400px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-md bg-stone-200 group shrink-0"
            
            // Animación sutil al entrar en vista
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "0px -10% 0px -10%" }} // Se activa antes
            transition={{ duration: 0.6 }}
            
            onClick={() => onImageClick(src)}
            whileHover={{ scale: 1.02 }} // Efecto hover solo notable en desktop
        >
            {/* IMPORTANTE: En producción cambiar a <Image ... /> */}
            <img
                src={src}
                alt="Gallery"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay sutil al hacer hover (Solo Desktop) */}
            <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 p-3 rounded-full shadow-sm backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform">
                     <ZoomIn size={20} className="text-stone-800" />
                </div>
            </div>
        </motion.div>
    );
};

const MarqueeGroup = ({ onImageClick }: { onImageClick: (src: string) => void }) => (
  <motion.div
    initial={{ x: 0 }}
    animate={{ x: "-100%" }}
    transition={{ 
      duration: 40, // Un poco más rápido para mantener interés
      ease: "linear", 
      repeat: Infinity 
    }}
    // Espaciado responsive: gap-4 en móvil, gap-12 en desktop
    className="flex gap-4 md:gap-12 px-2 md:px-6 shrink-0 items-center py-8 md:py-16" 
  >
    {PHOTOS.map((src, index) => (
       <GalleryItem key={index} src={src} onImageClick={onImageClick} />
    ))}
  </motion.div>
);