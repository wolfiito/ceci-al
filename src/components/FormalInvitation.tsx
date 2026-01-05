"use client";

import { motion } from "framer-motion";

interface FormalInvitationProps {
  guestName: string; 
  type?: 'family' | 'individual' | 'couple'; 
}

// --- PALETA DE COLORES ---
const DARK_GREEN_BG = "bg-[#1A2621]";       
const CREAM_CARD_BG = "bg-[#F2F0E9]";       
const GREEN_INK_TEXT = "text-[#1A2621]";    
const ROSE_ACCENT = "bg-[#CFA8A8]";         
const ROSE_BORDER = "border-[#CFA8A8]";     

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Textos
const MAIN_PHRASE = "Estamos muy alegres porque de la mano de Dios tenemos el privilegio de poder celebrar nuestro matrimonio...";
const BIBLE_VERSE = "Encontré al que ama mi alma.";
const BIBLE_REF = "Cantares 3:4";

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  
  // LOGICA DE NOMBRE
  const getDisplayName = () => {
    return (
      <div className="flex flex-col items-center">
        {type === 'family' && (
           <span className={`font-sans text-xs md:text-sm ${GREEN_INK_TEXT} uppercase tracking-[0.3em] mb-2 opacity-80`}>
             Familia
           </span>
        )}
        <span className={`font-serif text-5xl md:text-7xl lg:text-8xl ${GREEN_INK_TEXT} leading-none drop-shadow-sm px-2 whitespace-nowrap`}>
            {guestName}
        </span>
      </div>
    );
  };

  // LOGICA PARA LA FRASE DE INVITACIÓN
  const getInvitationText = () => {
    return type === 'individual' 
        ? "y nos encantaría que formes parte" 
        : "y nos encantaría que ustedes nos acompañen";
  };

  return (
    <section className={`relative z-20 py-24 md:py-40 px-4 ${DARK_GREEN_BG} flex justify-center items-center overflow-hidden`}>
      
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#F2F0E9_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: EASE_LUXURY }}
        className={`relative max-w-4xl w-full ${CREAM_CARD_BG} shadow-2xl shadow-black/50 p-8 md:p-20 text-center rounded-sm`}
      >
        {/* Marcos Decorativos */}
        <div className={`absolute inset-4 border ${ROSE_BORDER} opacity-40 pointer-events-none`} />
        <div className={`absolute inset-6 border ${ROSE_BORDER} opacity-20 pointer-events-none`} />

        {/* Esquinas */}
        <div className={`absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 ${ROSE_BORDER}`} />
        <div className={`absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 ${ROSE_BORDER}`} />
        <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 ${ROSE_BORDER}`} />
        <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 ${ROSE_BORDER}`} />

        <div className="relative z-10 flex flex-col items-center space-y-8">
            
            {/* 1. MENSAJE PERSONAL (CAMBIO AQUÍ: font-sans y estilos limpios) */}
            <div className="max-w-3xl mx-auto space-y-4">
                <h3 className={`font-sans text-sm md:text-lg ${GREEN_INK_TEXT} uppercase tracking-[0.15em] leading-loose font-light`}>
                    {MAIN_PHRASE}
                </h3>
            </div>

            {/* 2. CONECTOR DINÁMICO */}
            <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex items-center gap-4 opacity-60">
                    <div className={`h-[1px] w-8 ${ROSE_ACCENT}`} />
                    <span className={`text-xl ${GREEN_INK_TEXT}`}>❦</span>
                    <div className={`h-[1px] w-8 ${ROSE_ACCENT}`} />
                </div>
                
                <p className={`font-sans text-xs md:text-sm ${GREEN_INK_TEXT} uppercase tracking-[0.2em] font-bold`}>
                    {getInvitationText()}
                </p>
            </div>

            {/* 3. EL INVITADO + RAYA ANIMADA */}
            <div className="py-2 w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col items-center w-full"
                >
                   {getDisplayName()}

                   <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                      className={`h-[1.5px] ${ROSE_ACCENT} mt-4 max-w-[300px] w-[80%] rounded-full`}
                    />
                </motion.div>
            </div>

            {/* 4. VERSÍCULO / DEDICATORIA FINAL */}
            <div className="pt-6 border-t border-[#CFA8A8]/30 w-full max-w-xs mx-auto mt-4">
                <p className={`font-serif text-lg md:text-xl ${GREEN_INK_TEXT} italic opacity-80`}>
                    "{BIBLE_VERSE}"
                </p>
                <p className={`font-sans text-[10px] md:text-xs ${GREEN_INK_TEXT} uppercase tracking-widest mt-2 opacity-60`}>
                    {BIBLE_REF}
                </p>
            </div>

        </div>
      </motion.div>
    </section>
  );
}