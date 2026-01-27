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
import { backgroundClip } from "html2canvas/dist/types/css/property-descriptors/background-clip";

// --- FUNCIÓN UTILITARIA ---
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
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

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
            className="relative w-[200px] md:w-[350px] aspect-[4/3] md:aspect-[16/10] shrink-0 rounded-lg overflow-hidden cursor-pointer group hover:grayscale-0 transition-all duration-700 ease-out shadow-lg"
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
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>
    );
};


// --- COMPONENTE PRINCIPAL ---
export default function GalleryMarquee() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-10 min-h-100 flex flex-col justify-center">
      <div className="relative z-10">
          <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-(family-name:--font-bodoni) w-100 text-3xl md:text-5xl text-stone-100 italic drop-shadow-l" style={{ marginTop: '-40px' }}
              >
                <div className="container mx-auto px-4 py-10 mb-20 text-center bg-[#DB8C8A]" style={{marginTop: '-5px'}}>
                  Momentos Inolvidables
                </div>

              </motion.h2>

          {/* --- SLIDERS DE VELOCIDAD --- */}
          <div className="relative flex flex-col gap-6 w-full transform scale-100 origin-center"> 
            
            {/* Fila 1 */}
            <ParallaxSlider images={ROW_1} baseVelocity={-0.5} onImageClick={setSelectedImage} />
            
            {/* Fila 2 */}
            <ParallaxSlider images={ROW_2} baseVelocity={0.4} onImageClick={setSelectedImage} />

            {/* Gradientes laterales actualizados para coincidir con la transparencia */}
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#726f6b] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#726f6b] to-transparent z-10 pointer-events-none" />
          </div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50 bg-black/20 rounded-full"
            >
                <X size={32} strokeWidth={1.5} />
            </motion.button>

            <motion.div
                layoutId={selectedImage}
                className="relative w-full max-w-6xl h-[85vh] rounded-lg overflow-hidden shadow-2xl"
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