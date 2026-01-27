"use client";

import { useState } from "react";
import { motion, Transition, Variants } from "framer-motion"; 
import { Copy, Check, CreditCard, Gift, ExternalLink, Sparkles } from "lucide-react";

interface GiftsProps {
  gifts?: {
    bankAccount?: { bankName: string; clabe: string; holder: string };
    registries?: { id: string; store: string; url: string }[];
    cashInstructions?: string;
  };
}

// --- ICONOS ---

const IconAmazon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0.000000,394.000000) scale(0.100000,-0.100000)" stroke="none">
      <path d="M1687 3738 c-372 -38 -651 -210 -791 -489 -48 -95 -83 -221 -72 -262 11 -43 50 -55 262 -77 110 -11 215 -22 234 -25 55 -9 83 19 116 118 24 71 35 90 88 143 81 81 146 107 271 108 188 1 302 -78 334 -232 6 -29 11 -109 11 -177 l0 -124 -32 -5 c-18 -3 -85 -10 -148 -16 -308 -30 -559 -80 -703 -140 -300 -125 -492 -394 -513 -720 -21 -321 113 -594 347 -709 112 -55 182 -72 320 -78 307 -15 517 63 744 275 37 34 70 62 74 62 3 0 35 -40 69 -89 72 -102 169 -203 217 -226 40 -19 70 -10 124 38 21 17 102 88 182 156 79 68 152 133 162 144 29 33 16 77 -51 169 -59 81 -104 163 -125 223 -7 19 -13 270 -17 675 -6 622 -7 648 -28 725 -36 130 -76 199 -172 296 -72 73 -101 94 -181 133 -199 97 -447 133 -722 104z m453 -1558 c0 -281 -41 -412 -171 -543 -91 -91 -138 -112 -254 -112 -106 0 -151 19 -209 86 -60 71 -80 136 -81 264 0 141 23 207 101 293 104 115 287 176 547 181 l67 1 0 -170z" />
      <path d="M3161 1025 c-88 -16 -224 -81 -229 -109 -4 -17 2 -18 100 -10 176 15 300 12 331 -9 24 -16 27 -23 27 -75 0 -69 -14 -122 -69 -266 -22 -60 -41 -113 -41 -118 0 -4 9 -8 19 -8 31 0 118 105 161 194 49 101 70 178 77 282 5 78 5 82 -18 97 -56 36 -223 46 -358 22z" />
      <path d="M203 953 c-8 -21 59 -83 204 -189 330 -241 701 -391 1118 -450 167 -24 498 -24 660 0 354 51 664 156 913 308 104 63 142 96 142 123 0 46 -30 48 -137 9 -54 -20 -143 -51 -198 -69 -819 -273 -1721 -200 -2515 202 -90 45 -168 83 -172 83 -5 0 -12 -8 -15 -17z" />
    </g>
  </svg>
);

const IconLiverpool = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
        <path d="M48.34,54.19h24.21v247.34s0,17.85,15.94,17.85h130v26.83H77.11s-28.82-.06-28.82-31.96l.05-260.06Z" />
        <path d="M81.75,54.19h24.14v212.16s-1.69,16.49,14,16.45c77.66-.13,98.48,0,98.48,0v26.49h-122.46s-14.29-1.09-14.16-15.72c.08-10.41,0-239.37,0-239.37h0Z" />
        <path d="M114.97,54.19h24.26l.03,179.46s-1.4,12.21,10.13,12.21h69.1l-.12,26.68h-93.07s-10.33-2.06-10.33-14.46V54.19Z" />
        <path d="M148.3,54.19h24.27v144.84s-1.53,10.28,9.08,10.28h36.84v26.49h-56.09c-10.02,0-14.1-3.02-14.1-13.19V54.19s0,0,0,0Z" />
        <path d="M351.54,345.89l-24.21-.02.12-247.34s0-17.84-15.93-17.85l-130.01-.06v-26.83s141.39.07,141.39.07c0,0,28.82.08,28.81,31.97l-.17,260.06h0Z" />
        <path d="M318.12,345.87h-24.14s.1-212.17.1-212.17c0,0,1.7-16.5-14-16.46-77.66.09-98.48-.04-98.48-.04v-26.49s122.48.06,122.48.06c0,0,14.29,1.09,14.15,15.72-.09,10.42-.11,239.37-.11,239.37h0Z" />
        <path d="M284.91,345.86h-24.27s.05-179.47.05-179.47c0,0,1.4-12.2-10.13-12.21l-69.1-.03.13-26.68,93.07.04s10.34,2.07,10.33,14.46l-.09,203.89Z" />
        <path d="M251.57,345.84h-24.27s.07-144.84.07-144.84c0,0,1.54-10.28-9.07-10.29-12.28,0-24.56,0-36.84-.02v-26.48s56.1.03,56.1.03c10.02,0,14.1,3.02,14.09,13.19l-.08,168.41Z" />
    </g>
  </svg>
);

// --- ANIMACIONES PERSONALIZADAS ---
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 1, ease: EASE_LUXURY } 
    }
};

const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 1, ease: EASE_LUXURY } 
    }
};

const slideFromBottom: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1, ease: EASE_LUXURY, delay: 0.2 } // Un poco de delay para que entre después
    }
};

const cardTransition: Transition = { 
    type: "spring", 
    stiffness: 120,
    damping: 20,    
    mass: 1.1       
};

export default function Gifts({ gifts }: GiftsProps) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [flipBank, setFlipBank] = useState(false);

  const bankAccount = gifts?.bankAccount;
  const registries = gifts?.registries || [];

  const liverpoolRegistry = registries.find(r => r.store.toLowerCase().includes('liverpool'));
  const amazonRegistry = registries.find(r => r.store.toLowerCase().includes('amazon'));
  const otherRegistries = registries.filter(r => 
    !r.store.toLowerCase().includes('liverpool') && 
    !r.store.toLowerCase().includes('amazon')
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const formatClabe = (clabe: string) => clabe.replace(/(.{4})/g, '$1 ').trim();

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden" style={{ background: '#FFFFFF'}}>
      
      {/* Fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-6 max-w-2xl">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.5 }} // once: false para repetir al scrollear
             transition={{ duration: 1, ease: EASE_LUXURY }}
          >
             <h2 className="font-serif text-4xl md:text-4xl text-wedding-secondary transform -rotate-2">
               Mesa de Regalos
             </h2>
          </motion.div>

          <motion.p 
            className="font-sans text-sm md:text-base text-wedding-dark/60 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            Contar con su presencia y cariño en este día tan especial es nuestro mayor regalo. 
            Si desean tener un detalle adicional con nosotros y bendecirnos en esta nueva etapa, 
            aquí encontrarán algunas formas de hacerlo:
          </motion.p>
        </div>

        <div className="w-full flex flex-col gap-12 items-center">

            {/* -----------------------------------------------------------
                1. TIENDAS (ANIMACIÓN: ENTRAN DE LOS LADOS)
               ----------------------------------------------------------- */}
            <div className="flex flex-row justify-center gap-12 md:gap-24 w-full overflow-visible">
                
                {/* LIVERPOOL - ENTRA DESDE IZQUIERDA */}
                {liverpoolRegistry && (
                    <motion.a 
                        href={liverpoolRegistry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-4"
                        variants={slideFromLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }} // Repite animación
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Icono Grande */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                             <div className="absolute inset-0 bg-pink-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                             <IconLiverpool className="w-full h-full text-[#E91E63]" />
                        </div>
                        
                        {/* Botón Píldora */}
                        <div className="px-5 py-2 bg-white border border-stone-200 rounded-full shadow-sm flex items-center gap-2 group-hover:border-[#E91E63] group-hover:text-[#E91E63] transition-all duration-300">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600 group-hover:text-[#E91E63]">
                                Ver Mesa
                            </span>
                            <ExternalLink size={12} className="text-stone-400 group-hover:text-[#E91E63]" />
                        </div>
                    </motion.a>
                )}

                {/* AMAZON - ENTRA DESDE DERECHA */}
                {amazonRegistry && (
                    <motion.a 
                        href={amazonRegistry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-4"
                        variants={slideFromRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }} // Repite animación
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Icono Grande */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                             <div className="absolute inset-0 bg-gray-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                             <IconAmazon className="w-full h-full text-[#232F3E]" />
                        </div>

                        {/* Botón Píldora */}
                        <div className="px-5 py-2 bg-white border border-stone-200 rounded-full shadow-sm flex items-center gap-2 group-hover:border-[#232F3E] group-hover:text-[#232F3E] transition-all duration-300">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600 group-hover:text-[#232F3E]">
                                Ver Mesa
                            </span>
                            <ExternalLink size={12} className="text-stone-400 group-hover:text-[#232F3E]" />
                        </div>
                    </motion.a>
                )}
            </div>

            {/* -----------------------------------------------------------
                2. BANCO (ANIMACIÓN: ENTRA DESDE ABAJO)
               ----------------------------------------------------------- */}
            {bankAccount && (
                <motion.div 
                    className="w-full flex flex-col items-center mt-6"
                    variants={slideFromBottom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "10px" }} 
                >
                     <div className="mb-2 flex items-center justify-center gap-2 text-wedding-primary/80">
                        <Sparkles size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Transferencia Bancaria</span>
                    </div>

                    <div 
                        className="relative w-full max-w-[320px] aspect-[1.586/1] group cursor-pointer" 
                        style={{ perspective: "1200px" }}
                        onClick={() => setFlipBank(!flipBank)}
                    >
                        <motion.div
                            className="w-full h-full relative"
                            animate={{ rotateY: flipBank ? 180 : 0 }}
                            transition={cardTransition}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* FRENTE VERDE */}
                            <div 
                                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#2C3E2E] to-[#1a251b] shadow-2xl text-white p-6 flex flex-col justify-between overflow-hidden border border-white/10"
                                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", zIndex: 2 }}
                            >
                                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="w-10 h-6 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 opacity-80 shadow-sm" />
                                    <span className="font-sans text-[9px] uppercase tracking-widest opacity-60">Bank Card</span>
                                </div>
                                <div className="space-y-1 z-10">
                                    <p className="font-serif text-xl opacity-90">Lluvia de Sobres</p>
                                    <p className="font-sans text-[16px] uppercase tracking-widest opacity-50">Toca para ver datos</p>
                                </div>
                                <div className="flex justify-between items-end z-10">
                                    <p className="font-mono text-base tracking-widest opacity-80">**** 2026</p>
                                    <CreditCard size={20} className="opacity-50" />
                                </div>
                            </div>

                            {/* ATRÁS VERDE */}
                            <div 
                                className="absolute inset-0 w-full h-full rounded-2xl bg-[#1a251b] shadow-2xl text-white p-5 flex flex-col justify-center border border-wedding-secondary/30"
                                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                            >
                                <div className="space-y-3 text-center relative z-10">
                                    <div>
                                        <p className="text-[8px] uppercase tracking-widest text-wedding-secondary">Banco</p>
                                        <p className="font-bold text-base">{bankAccount.bankName}</p>
                                    </div>
                                    <div className="bg-white/5 p-2 rounded-lg border border-white/10 relative">
                                        <p className="text-[8px] uppercase tracking-widest text-wedding-secondary mb-1">CLABE</p>
                                        <p className="font-mono text-xs tracking-wider text-white select-all">
                                            {formatClabe(bankAccount.clabe)}
                                        </p>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); copyToClipboard(bankAccount.clabe); }}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-wedding-secondary hover:bg-white hover:text-wedding-dark rounded-full transition-colors shadow-lg"
                                        >
                                            {copiedBank ? <Check size={10} /> : <Copy size={10} />}
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-[8px] uppercase tracking-widest text-wedding-secondary">Titular</p>
                                        <p className="font-serif text-sm italic truncate">{bankAccount.holder}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <p className="mt-4 mb-16 text-[9px] text-center text-wedding-dark/40 font-sans uppercase tracking-widest animate-pulse">
                        Toca para ver cuenta
                    </p>
                </motion.div>
            )}
        </div>

        {/* --- OTRAS TIENDAS --- */}
        {otherRegistries.length > 0 && (
            <motion.div 
                className="w-full max-w-sm mx-auto space-y-3 mt-12 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
            >
                <div className="w-full h-[1px] bg-wedding-dark/10 my-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-wedding-dark/40 mb-2">
                    Otras Opciones
                </p>
                {otherRegistries.map((reg) => (
                    <a 
                        key={reg.id}
                        href={reg.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 bg-white border border-stone-100 rounded-lg hover:border-stone-300 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Gift size={14} className="text-stone-400" />
                            <span className="font-sans font-medium text-wedding-dark text-xs">
                                {reg.store}
                            </span>
                        </div>
                        <ExternalLink size={12} className="text-stone-400" />
                    </a>
                ))}
            </motion.div>
        )}

      </div>
    </section>
  );
}