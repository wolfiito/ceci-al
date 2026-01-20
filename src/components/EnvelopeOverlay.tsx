"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useWedding } from "@/context/WeddingContext";

interface EnvelopeOverlayProps {
  onOpenComplete?: () => void;
}

export default function EnvelopeOverlay({ onOpenComplete }: EnvelopeOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // 1. IMPORTAMOS EL CONTEXTO
  const { togglePlay, setIsEnvelopeOpen } = useWedding();

  // Color del sobre (Crema suave)
  const ENVELOPE_COLOR = "#F2EFE9"; 
  useEffect(() => {
    // 1. Forzar que la página empiece arriba de todo
    window.scrollTo(0, 0);

    // 2. Evitar que el navegador recuerde la posición anterior al recargar
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 3. Bloquear el scroll si el sobre es visible
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh"; // Evita saltos en móviles
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }

    // Limpieza: Si el componente se desmonta abruptamente, devolvemos el scroll
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, [isVisible]);
  
  const handleOpen = () => {
    setIsOpen(true);
    togglePlay(); // Prende la música

    // 2. AVISAMOS AL CONTEXTO QUE EL SOBRE SE ABRIÓ (Para que salga el botón de música)
    if (setIsEnvelopeOpen) setIsEnvelopeOpen(true);

    // 3. TIMEOUT PARA ANIMACIONES
    setTimeout(() => {
        if (onOpenComplete) onOpenComplete();
        setIsVisible(false);
    }, 1500); // 1.5 segundos de animación
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col h-full w-full touch-none">
        {/* --- MITAD SUPERIOR (Se va hacia arriba) --- */}
      <div 
        className={cn(
            "relative w-full h-1/2 z-20 shadow-md transition-transform duration-[1500ms] ease-in-out will-change-transform",
            isOpen ? "-translate-y-full" : "translate-y-0"
        )}
        style={{ backgroundColor: ENVELOPE_COLOR }}
      >
        {/* LA SOLAPA "V" (Cuelga de la parte superior) */}
        {/* Usamos top-full para que empiece exactamente donde termina el div de arriba */}
        <div className="absolute top-full left-0 w-full flex justify-center z-30 drop-shadow-sm">
            
            {/* EL TRIÁNGULO (Truco CSS) */}
            {/* border-l y border-r transparentes crean los lados */}
            {/* border-t crea el color y la altura */}
            <div>
                {/* EL BOTÓN DEL SELLO (Posicionado absoluto respecto al triángulo) */}
                <button 
                    onClick={handleOpen}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] cursor-pointer group outline-none"
                    aria-label="Abrir invitación"
                >
                    <div className="relative w-38 h-38 md:w-32 md:h-32 transition-transform duration-500 group-hover:scale-105 active:scale-95">
                        
                        {/* IMAGEN DEL SELLO */}
                        <Image 
                            src="/images/sobre_sello.png" 
                            alt="Sello C&A"
                            fill
                            className="object-contain drop-shadow-xl"
                            priority
                        />
                        
                    </div>  
                    
                    {/* TEXTO DE AYUDA */}
                    <div className={cn(
                        "absolute top-24 left-1/2 -translate-x-1/2 w-48 text-center transition-opacity duration-300 pointer-events-none",
                        isOpen ? "opacity-0" : "opacity-100"
                    )}>
                        <p className="text-[#4A3B3B]/60 text-[14px] uppercase tracking-[0.3em] font-sans mt-14 animate-pulse">
                            Toca para abrir
                        </p>
                    </div>
                </button>
            </div>
        </div>
      </div>

      {/* --- MITAD INFERIOR (Se va hacia abajo) --- */}
      <div 
        className={cn(
            "relative w-full h-1/2 z-10 transition-transform duration-[1500ms] ease-in-out will-change-transform border-t border-black/5",
            isOpen ? "translate-y-full" : "translate-y-0"
        )}
        style={{ backgroundColor: ENVELOPE_COLOR }}
      >
         {/* Sombra interna sutil para dar profundidad */}
         <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
      </div>

    </div>
  );
}