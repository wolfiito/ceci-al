"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWedding } from "@/context/WeddingContext";

// --- COLORES BASE ---
// La imagen de textura se mezclará con estos colores.
const OLD_PAPER_BG = "bg-[#F2EBD9]";        // Color Crema para la derecha
const OLD_PAPER_TRIANGLE = "bg-[#E0D5B7]";  // Color Tostado para la izquierda

export default function EnvelopeOverlay() {
  const { openEnvelope } = useWedding();
  const [status, setStatus] = useState<'closed' | 'opening' | 'opened'>('closed');

  const handleOpen = () => {
    if (status !== 'closed') return;
    setStatus('opening');
    openEnvelope(); 
    setTimeout(() => {
      setStatus('opened');
    }, 1500);
  };

  if (status === 'opened') return null;

  return (
    <div 
      onClick={handleOpen}
      className="fixed inset-0 z-[100] overflow-hidden cursor-pointer group"
    >
      
      {/* ==============================================================
          1. LADO DERECHO (Rectángulo)
          ============================================================== */}
      <motion.div
        initial={{ x: 0 }}
        animate={status === 'opening' ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 h-full w-full ${OLD_PAPER_BG}`}
      >
         {/* CAPA DE TEXTURA/FILTRO */}
         {/* mix-blend-multiply: Oscurece el color base con la textura */}
         {/* opacity-50: Ajusta esto (0.1 a 1.0) según qué tan fuerte quieras el efecto */}
         <div className="absolute inset-0 z-0 opacity-70 mix-blend-multiply pointer-events-none">
            <Image 
              src="/images/bgcarta.jpg" 
              alt="textura" 
              fill 
              className="object-cover"
              priority
            />
         </div>
      </motion.div>


      {/* ==============================================================
          2. LADO IZQUIERDO (Triángulo + Sello)
          ============================================================== */}
      <motion.div
        initial={{ x: 0 }}
        animate={status === 'opening' ? { x: "-150%" } : { x: 0 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 h-full w-[50vw] z-20 drop-shadow-2xl"
      >
         
         {/* EL TRIÁNGULO (Usando clip-path para permitir textura dentro) */}
         <div 
            className={`relative w-full h-full ${OLD_PAPER_TRIANGLE}`}
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
         >
             {/* CAPA DE TEXTURA PARA EL TRIÁNGULO */}
             <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-none">
                <Image 
                  src="/images/bgcarta.jpg" 
                  alt="textura" 
                  fill 
                  className="object-cover"
                  priority
                />
             </div>
             
             {/* Borde sutil pintado a mano (opcional, para resaltar el corte) */}
             {/* <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/10"></div> */}
         </div>


         {/* === EL SELLO === */}
         {/* Importante: Está FUERA del div con clip-path para no ser cortado */}
         <motion.div
           whileHover={{ scale: 1.1, rotate: 10 }}
           className="absolute right-0 top-1/2 z-30"
           style={{ transform: "translate(50%, -50%)" }}
         >
           <div className="relative w-70 h-70 drop-shadow-xl filter">
              <Image 
                src="/images/sello.png"
                alt="Sello"
                fill
                className="object-contain"
              />
           </div>
         </motion.div>

      </motion.div>
    </div>
  );
}