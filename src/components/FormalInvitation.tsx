"use client";

import { motion } from "framer-motion";

interface FormalInvitationProps {
  guestName: string; 
  type?: 'family' | 'individual' | 'couple'; 
}

// COLORES
const PAPER_BG = "bg-[#FDFBF7]";   
const INK_DARK = "text-[#4A3B3B]"; 
const ACCENT_GOLD = "text-[#CFA8A8]"; 

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  
  const getInvitationText = () => {
    return type === 'individual' 
        ? "y nos honraría que formes parte de este día" 
        : "y nos honraría que formen parte de este día";
  };

  return (
    // 1. FORZAMOS EL COLOR VERDE AQUÍ CON STYLE (Infalible en iPhone)
    // Agregamos z-20 para asegurar que esté encima de cualquier fondo global
    <section 
        className="relative w-full py-24 md:py-32 px-4 flex justify-center items-center overflow-hidden z-20"
        style={{ backgroundColor: '#2C3E2E' }}
    >
      
      {/* TARJETA ANIMADA */}
      <motion.div 
        initial={{ opacity: 0, y: 100, rotate: 6 }} 
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }} 
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`relative max-w-2xl w-full ${PAPER_BG} shadow-2xl rounded-[4px] overflow-hidden`}
      >
        
        {/* TEXTURA (Muy sutil) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] z-0" />
        
        {/* MARCO */}
        <div className="absolute inset-3 border border-[#DCC5C5] opacity-50 z-0 pointer-events-none" />
        <div className="absolute inset-4 border border-[#DCC5C5] opacity-30 z-0 pointer-events-none" />

        {/* CONTENIDO */}
        <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">
            
            {/* Encabezado */}
            <div className="mb-8">
                <span className={`font-sans text-[10px] md:text-xs ${INK_DARK} uppercase tracking-[0.3em] opacity-60`}>
                    La Boda de
                </span>
                <h3 className={`font-serif text-2xl md:text-3xl ${INK_DARK} mt-2`}>
                    Ceci & Alejandro
                </h3>
            </div>

            {/* Cuerpo */}
            <div className="w-full py-6 border-t border-b border-[#E8E4D8] mb-8 relative">
                <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#DCC5C5] rounded-full" />
                <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#DCC5C5] rounded-full" />

                <p className={`font-serif text-lg ${INK_DARK} italic mb-4 opacity-80`}>
                    Tenemos el honor de invitar a:
                </p>

                {/* NOMBRE */}
                <div className="py-4">
                    {type === 'family' && (
                        <p className={`font-sans text-[10px] ${ACCENT_GOLD} uppercase tracking-[0.4em] mb-2`}>
                            Familia
                        </p>
                    )}
                    <h2 
                        className={`font-alex text-5xl md:text-7xl ${INK_DARK} leading-none px-2`}
                        style={{ fontFamily: 'var(--font-alex)' }}
                    >
                        {guestName}
                    </h2>
                </div>

                <p className={`font-sans text-[10px] md:text-xs ${INK_DARK} uppercase tracking-[0.2em] mt-4 opacity-70`}>
                    {getInvitationText()}
                </p>
            </div>

            {/* Pie */}
            <div className="max-w-md mx-auto opacity-70">
                <p className={`font-serif text-sm md:text-base ${INK_DARK} italic leading-relaxed`}>
                    "Cordón de tres dobleces no se rompe pronto."
                </p>
                <p className={`font-sans text-[9px] ${ACCENT_GOLD} uppercase tracking-widest mt-2`}>
                    Eclesiastés 4:12
                </p>
            </div>

        </div>
      </motion.div>
    </section>
  );
}