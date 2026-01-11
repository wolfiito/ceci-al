"use client";

import { motion } from "framer-motion";

interface FormalInvitationProps {
  guestName: string; 
  type?: 'family' | 'individual' | 'couple'; 
}

// COLORES
const CARD_BG = "bg-[#FDFBF7]"; 
const TEXT_PRIMARY = "text-wedding-dark"; 
const TEXT_SECONDARY = "text-wedding-primary"; 
const BORDER_COLOR = "border-wedding-primary/30"; 

// --- CONFIGURACIÓN DE LA ANIMACIÓN ---
// Usamos un ease "backOut" muy suave o un cubic-bezier para que se sienta "pesado" y elegante
const EASE_HEAVY: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  
  const getInvitationText = () => {
    return type === 'individual' 
        ? "y nos honraría que formes parte de este día" 
        : "y nos honraría que formen parte de este día";
  };

  return (
    // 1. PERSPECTIVA PROFUNDA (Clave para que se note la inclinación)
    <section className="relative w-full py-32 md:py-48 px-4 flex justify-center items-center perspective-[1500px] overflow-hidden">
      
      {/* Fondo sutil */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* --- LA TARJETA QUE SE LEVANTA (/ -> |) --- */}
      <motion.div 
        initial={{ 
            opacity: 0, 
            rotateX: 45,   // <--- AQUÍ ESTÁ EL "/" (Inclinación fuerte hacia atrás)
            y: 100         // Empieza un poco más abajo
        }} 
        whileInView={{ 
            opacity: 1, 
            rotateX: 0,    // <--- AQUÍ ESTÁ EL "|" (Vertical perfecta)
            y: 0 
        }}
        viewport={{ once: true, margin: "-15%" }} // Se activa cuando entra bien en pantalla
        transition={{ 
            duration: 1.5, // Duración larga para que se aprecie el movimiento
            ease: EASE_HEAVY 
        }}
        // "bottom" hace que gire desde abajo, como si se levantara del suelo
        style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
        className={`relative max-w-3xl w-full ${CARD_BG} p-10 md:p-20 text-center rounded-[4px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border ${BORDER_COLOR}`}
      >
        {/* Textura */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('/noise.png')] z-0 rounded-[4px]" />

        {/* CONTENIDO INTERNO */}
        {/* (Sin animaciones complejas dentro, para no distraer del movimiento principal de la tarjeta) */}
        <div className="relative z-10 flex flex-col items-center">
            
            {/* Ornamento */}
            <div className="mb-10 opacity-60">
                <svg width="100" height="20" viewBox="0 0 100 20" fill="none" className={TEXT_SECONDARY}>
                    <path d="M0 10H100" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="10" r="3" fill="currentColor" />
                </svg>
            </div>

            <h3 className={`font-serif text-xl md:text-3xl ${TEXT_PRIMARY} italic leading-relaxed max-w-xl mb-8`}>
                "Tenemos el honor de celebrar el pacto de nuestro amor ante Dios..."
            </h3>

            <div className="py-6 w-full mb-8">
                {type === 'family' && (
                <p className={`font-sans text-xs ${TEXT_PRIMARY} uppercase tracking-[0.3em] mb-3 opacity-60`}>
                    Familia
                </p>
                )}
                {/* Nombre */}
                <div className={`font-serif text-5xl md:text-7xl ${TEXT_PRIMARY} leading-none whitespace-nowrap px-2`}>
                    {guestName}
                </div>
                <div className={`h-[1px] w-32 mx-auto mt-6 ${BORDER_COLOR}`} />
            </div>
            
            <p className={`font-sans text-sm ${TEXT_PRIMARY} uppercase tracking-[0.2em] font-medium mb-12`}>
                {getInvitationText()}
            </p>

            <div className="max-w-md mx-auto opacity-80 pt-8 border-t border-wedding-primary/20">
                <p className={`font-serif text-lg ${TEXT_PRIMARY} italic`}>
                    "Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto."
                </p>
                <p className={`font-sans text-[10px] ${TEXT_SECONDARY} uppercase tracking-widest mt-3 font-bold`}>
                    Eclesiastés 4:12
                </p>
            </div>

        </div>
      </motion.div>
    </section>
  );
}