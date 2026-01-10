"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnvelopeOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false); // Estado intermedio para la animación

  // Bloqueo de scroll
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsFlapOpen(true); // 1. Primero abrimos la solapa
    
    // 2. Esperamos a que la solapa abra para sacar el sobre completo
    setTimeout(() => {
        setIsOpen(true);
    }, 1800); // Ajusta este tiempo según la duración de tu animación
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#151E1A] p-4"
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            {/* --- CONTENEDOR DEL SOBRE --- */}
            <div className="relative w-full max-w-[340px] md:max-w-[400px] aspect-[4/3]">
                
                {/* 1. INTERIOR DEL SOBRE (El fondo oscuro del papel) */}
                <div className="absolute inset-0 bg-[#F2EFE9] rounded-sm shadow-2xl overflow-hidden border border-stone-300/50">
                    {/* Textura interna sutil */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]"></div>
                </div>

                {/* 2. LA TARJETA (INVITACIÓN) DENTRO */}
                {/* Esta es la que sube cuando se abre el sobre */}
                <motion.div 
                    className="absolute left-4 right-4 top-4 bottom-4 bg-white shadow-md flex flex-col items-center justify-center text-center p-4 border border-stone-100 z-10"
                    initial={{ y: 0 }}
                    animate={isFlapOpen ? { y: -100 } : { y: 0 }} // Sube al abrir
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                >
                    <p className="font-serif text-sm text-stone-400 uppercase tracking-[0.2em] mb-2">Boda</p>
                    <h2 className="font-serif text-3xl text-stone-800 italic">C & A</h2>
                    <p className="font-sans text-[10px] text-stone-400 mt-2 tracking-widest">09 . 05 . 2026</p>
                </motion.div>

                {/* 3. BOLSILLO DEL SOBRE (Los triángulos de abajo y lados) */}
                {/* Usamos clip-path para crear los triángulos del sobre físico */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Triángulo Izquierdo */}
                    <div 
                        className="absolute left-0 bottom-0 top-0 w-full bg-[#E6E2D6] shadow-[2px_0_5px_rgba(0,0,0,0.05)]"
                        style={{ clipPath: "polygon(0 0, 0% 100%, 50% 50%)" }}
                    />
                    {/* Triángulo Derecho */}
                    <div 
                        className="absolute right-0 bottom-0 top-0 w-full bg-[#E6E2D6] shadow-[-2px_0_5px_rgba(0,0,0,0.05)]"
                        style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
                    />
                    {/* Triángulo Inferior */}
                    <div 
                        className="absolute left-0 right-0 bottom-0 h-full bg-[#EDE9DE] shadow-[0_-2px_5px_rgba(0,0,0,0.05)]"
                        style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)" }}
                    />
                </div>

                {/* 4. LA SOLAPA SUPERIOR (Móvil) */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full z-30 origin-top"
                    initial={{ rotateX: 0 }}
                    animate={isFlapOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Cara Frontal (Cerrada) */}
                    <div 
                        className="absolute inset-0 bg-[#E0DBD0] shadow-lg border-b border-stone-300/30"
                        style={{ 
                            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                            backfaceVisibility: "hidden" 
                        }}
                    >
                         {/* Sombra realista bajo la solapa */}
                         <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/5 to-transparent"></div>
                    </div>

                    {/* Cara Trasera (Abierta - se ve al girar) */}
                    <div 
                        className="absolute inset-0 bg-[#D6D1C4]"
                        style={{ 
                            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                            backfaceVisibility: "hidden",
                            transform: "rotateX(180deg)" 
                        }}
                    ></div>
                </motion.div>

                {/* 5. EL SELLO DE CERA (Botón interactivo) */}
                <motion.button
                    onClick={handleOpen}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={isFlapOpen ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#8B1E1E] shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer group"
                >
                    {/* Borde irregular del sello (pseudo-elemento visual) */}
                    <div className="absolute inset-0 rounded-full border-[3px] border-[#6b1414] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Brillo de cera */}
                    <div className="absolute top-2 left-3 w-4 h-4 bg-white/20 rounded-full blur-[2px]"></div>

                    {/* Texto grabado */}
                    <span className="font-serif text-white/90 text-xl md:text-2xl font-bold tracking-tighter drop-shadow-md">
                        C&A
                    </span>
                </motion.button>
                
                {/* Texto de instrucción */}
                <motion.p
                    animate={isFlapOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute -bottom-12 w-full text-center text-white/50 text-[10px] uppercase tracking-[0.3em]"
                >
                    Toca el sello para abrir
                </motion.p>

            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}