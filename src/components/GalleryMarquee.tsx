"use client";

import { useState, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame,
  AnimatePresence 
} from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

// --- FUNCIÓN UTILITARIA (Reemplazo de @motionone/utils) ---
// Esto hace que el número vuelva a empezar cuando llega al límite (loop infinito)
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- CONFIGURACIÓN DE IMÁGENES ---
const ROW_1 = [
  "/images/carrusel1.jpeg",
  "/images/carrusel2.jpeg",
  "/images/carrusel3.jpeg",
  "/images/carrusel4.jpeg",
  "/images/carrusel5.jpeg",
  "/images/carrusel6.jpeg",
  "/images/carrusel7.jpeg",
  "/images/carrusel8.jpeg",
  "/images/carrusel9.jpeg",
  "/images/carrusel10.jpeg",
  "/images/carrusel11.jpeg",
  "/images/carrusel12.jpeg",
  "/images/carrusel13.jpeg",
  "/images/carrusel14.jpeg",
  "/images/carrusel15.jpeg",
  "/images/carrusel16.jpeg",
  "/images/carrusel17.jpeg",
  "/images/carrusel18.jpeg",
  "/images/carrusel19.jpeg"
];

const ROW_2 = [
  "/images/carrusel19.jpeg",
  "/images/carrusel18.jpeg",
  "/images/carrusel17.jpeg",
  "/images/carrusel16.jpeg",
  "/images/carrusel15.jpeg",
  "/images/carrusel14.jpeg",
  "/images/carrusel13.jpeg",
  "/images/carrusel12.jpeg",
  "/images/carrusel11.jpeg",
  "/images/carrusel10.jpeg",
  "/images/carrusel9.jpeg",
  "/images/carrusel8.jpeg",
  "/images/carrusel7.jpeg",
  "/images/carrusel6.jpeg",
  "/images/carrusel5.jpeg",
  "/images/carrusel4.jpeg",
  "/images/carrusel3.jpeg",
  "/images/carrusel2.jpeg",
  "/images/carrusel1.jpeg",
];

// --- COMPONENTE DE LA BANDA DESLIZANTE (PARALLAX) ---
interface ParallaxProps {
  images: string[];
  baseVelocity: number;
  onImageClick: (src: string) => void;
}

function ParallaxSlider({ images, baseVelocity = 100, onImageClick }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Magia: La velocidad depende del scroll
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  // Animación suave en cada frame
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Si el usuario hace scroll, aceleramos el movimiento
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden py-4">
      <motion.div className="flex flex-nowrap gap-4 md:gap-8" style={{ x }}>
        {/* Renderizamos 4 veces la lista para asegurar el loop infinito sin cortes */}
        {[...images, ...images, ...images, ...images].map((src, idx) => (
          <GalleryItem key={idx} src={src} onImageClick={onImageClick} />
        ))}
      </motion.div>
    </div>
  );
}

// --- ITEM INDIVIDUAL ---
const GalleryItem = ({ src, onImageClick }: { src: string; onImageClick: (s: string) => void }) => {
    return (
        <motion.div
            className="relative w-[200px] md:w-[350px] aspect-[4/3] md:aspect-[16/10] shrink-0 rounded-lg overflow-hidden cursor-pointer group  hover:grayscale-0 transition-all duration-700 ease-out"
            onClick={() => onImageClick(src)}
            whileHover={{ scale: 1.02 }}
        >
            <Image
                src={src}
                alt="Momentos"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 200px, 350px"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>
    );
};


// --- COMPONENTE PRINCIPAL ---
export default function GalleryMarquee() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[#F9F5F0] overflow-hidden">
        
      {/* TÍTULO ELEGANTE */}
      <div className="container mx-auto px-4 mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-4"
          >
              Galería de Recuerdos
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl text-stone-800 italic"
          >
              Momentos Inolvidables
          </motion.h2>
      </div>

      {/* --- SLIDERS DE VELOCIDAD --- */}
      <div className="relative flex flex-col gap-6 w-full transform -rotate-2 scale-105 origin-center"> 
        
        {/* Fila 1: Mueve a la Izquierda (-1.5) */}
        <ParallaxSlider images={ROW_1} baseVelocity={-0.3} onImageClick={setSelectedImage} />
        
        {/* Fila 2: Mueve a la Derecha (1.5) */}
        <ParallaxSlider images={ROW_2} baseVelocity={0.3} onImageClick={setSelectedImage} />

        {/* Gradientes laterales para suavizar la entrada/salida */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F9F5F0] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F9F5F0] to-transparent z-10 pointer-events-none" />
      </div>


      {/* --- LIGHTBOX MEJORADO --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            >
                <X size={32} strokeWidth={1} />
            </motion.button>

            <motion.div
                layoutId={selectedImage}
                className="relative w-full max-w-6xl h-[80vh] rounded-sm overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={selectedImage}
                    alt="Full View"
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}