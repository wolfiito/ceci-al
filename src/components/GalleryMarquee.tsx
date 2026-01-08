"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

// TUS FOTOS
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
    <section className="relative py-32 bg-white overflow-hidden">
      
      {/* 1. CABECERA */}
      <div className="text-center mb-16 px-4">
          <div className="flex justify-center mb-4">
            <div className="h-px w-12 bg-wedding-secondary" />
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-wedding-dark mb-4">
              Momentos
          </h2>
          <p className="font-sans text-xs font-bold tracking-[0.3em] text-wedding-secondary uppercase">
              Nuestra Historia
          </p>
      </div>

      {/* 2. CONTENEDOR DEL MARQUEE */}
      <div className="relative w-full flex">
        
        {/* Máscaras laterales */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full z-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full z-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* CINTA 1 */}
        <MarqueeGroup onImageClick={setSelectedImage} />
        {/* CINTA 2 (Loop) */}
        <MarqueeGroup onImageClick={setSelectedImage} />

      </div>

      {/* 3. LIGHTBOX (Modal) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50">
                <X size={32} strokeWidth={1} />
            </button>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl h-[85vh] rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={selectedImage}
                    alt="Full size"
                    fill
                    className="object-contain"
                    quality={100}
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Componente individual con "Sensor Estricto"
const GalleryItem = ({ src, onImageClick }: { src: string; onImageClick: (s: string) => void }) => {
    return (
        <motion.div
            className="relative w-[280px] md:w-[400px] aspect-[3/4] rounded-lg overflow-hidden cursor-pointer shadow-sm bg-gray-100"
            
            // --- AJUSTE MAESTRO DE ZONA ---
            // margins: "-49.5%" deja solo un 1% en el centro libre.
            // Es una línea muy fina. Solo UNA foto puede cruzarla a la vez (porque hay espacio entre ellas).
            viewport={{ root: undefined, margin: "0px -49.5% 0px -49.5%" }}
            
            whileInView={{ 
                scale: 1.15, // Zoom
                zIndex: 10,  
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            }}
            // Estado normal (cuando sale de la línea fina)
            initial={{ scale: 0.95, zIndex: 1, boxShadow: "none" }} 
            
            // Transición RÁPIDA (0.3s) para que se "desinfle" al toque
            transition={{ duration: 0.3, ease: "easeOut" }}
            
            onClick={() => onImageClick(src)}
            whileHover={{ scale: 1.05 }}
        >
            <Image
                src={src}
                alt="Gallery"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 280px, 400px"
            />
        </motion.div>
    );
};

const MarqueeGroup = ({ onImageClick }: { onImageClick: (src: string) => void }) => (
  <motion.div
    initial={{ x: 0 }}
    animate={{ x: "-100%" }}
    transition={{ 
      duration: 60, 
      ease: "linear", 
      repeat: Infinity 
    }}
    // Aumenté el gap a 'gap-12' (48px) para asegurar que haya espacio suficiente 
    // entre fotos y que la línea del sensor detecte el vacío entre ellas.
    className="flex gap-12 px-6 shrink-0 items-center py-16" 
  >
    {PHOTOS.map((src, index) => (
       <GalleryItem key={index} src={src} onImageClick={onImageClick} />
    ))}
  </motion.div>
);