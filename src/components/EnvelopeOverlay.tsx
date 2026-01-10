"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Quitamos AnimatePresence que no se usa
import Image from "next/image";
import { useWedding } from "@/context/WeddingContext";

// Definimos explícitamente la tupla para la curva de animación
const PAPER_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Definimos los estados posibles
type EnvelopeStatus = 'closed' | 'opening' | 'opened';

export default function EnvelopeOverlay() {
  const { openEnvelope } = useWedding();
  const [status, setStatus] = useState<EnvelopeStatus>('closed');

  const handleOpen = () => {
    if (status !== 'closed') return;
    
    setStatus('opening');
    openEnvelope();
    
    // Esperamos a que termine la animación (1.5s) antes de desmontar
    setTimeout(() => {
      setStatus('opened');
    }, 1600);
  };

  // 1. GUARD CLAUSE: Si ya está abierto, desmontamos todo el componente.
  // Esto asegura que TypeScript sepa que abajo el status solo puede ser 'closed' | 'opening'
  if (status === 'opened') return null;

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
      role="button"
      tabIndex={0}
      aria-label="Abrir invitación"
      onClick={handleOpen}
    >
        {/* Ya no necesitamos AnimatePresence ni verificar status !== 'opened' 
           porque el return null de arriba ya se encargó de eso.
        */}

        {/* ==============================================================
            LADO IZQUIERDO
            ============================================================== */}
        <motion.div
          initial={{ x: 0 }}
          animate={status === 'opening' ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 1.5, ease: PAPER_EASE }}
          className="absolute left-0 top-0 h-full w-1/2 bg-[#F2EBD9] z-20 border-r border-black/5"
        >
          <div className="absolute inset-0 opacity-60 mix-blend-multiply pointer-events-none">
            <Image 
              src="/images/bgcarta.jpg" 
              alt="textura papel" 
              fill 
              className="object-cover"
              priority
              sizes="50vw"
            />
          </div>
        </motion.div>

        {/* ==============================================================
            LADO DERECHO
            ============================================================== */}
        <motion.div
          initial={{ x: 0 }}
          animate={status === 'opening' ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 1.5, ease: PAPER_EASE }}
          className="absolute right-0 top-0 h-full w-1/2 bg-[#F2EBD9] z-20 border-l border-black/5"
        >
          <div className="absolute inset-0 opacity-60 mix-blend-multiply pointer-events-none">
            <Image 
              src="/images/bgcarta.jpg" 
              alt="textura papel" 
              fill 
              className="object-cover"
              priority
              sizes="50vw"
            />
          </div>
        </motion.div>

        {/* ==============================================================
            EL SELLO
            ============================================================== */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={
            status === 'opening' 
              ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } 
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.8 }}
          className="absolute z-30 cursor-pointer flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
          >
            <Image 
              src="/images/sello.png"
              alt="Sello de lacre"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-serif text-wedding-dark/60 text-lg tracking-widest uppercase text-center bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full"
          >
            Abrir
          </motion.p>
        </motion.div>
    </div>
  );
}