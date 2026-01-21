"use client";

import { useState } from "react";
import { motion, Transition } from "framer-motion"; 
import { Copy, Check, CreditCard, Gift, ExternalLink, Sparkles, ShoppingBag } from "lucide-react";

interface GiftsProps {
  gifts?: {
    bankAccount?: { bankName: string; clabe: string; holder: string };
    registries?: { id: string; store: string; url: string }[];
    cashInstructions?: string;
  };
}

// 1. ICONO DE LIVERPOOL
const IconLiverpool = ({ className, color = "#E91E63" }: { className?: string, color?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.9" />
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke={color} strokeWidth="1.5" strokeOpacity="0.2"/>
    <path d="M15 15H10C9.44772 15 9 14.5523 9 14V9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Transición para la tarjeta verde (la única que gira)
const cardTransition: Transition = { 
    type: "spring", 
    stiffness: 120,
    damping: 20,    
    mass: 1.1       
};

export default function Gifts({ gifts }: GiftsProps) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedLiverpool, setCopiedLiverpool] = useState(false);
  const [flipBank, setFlipBank] = useState(false); // Solo el banco gira ahora

  const bankAccount = gifts?.bankAccount;
  const registries = gifts?.registries || [];

  const liverpoolRegistry = registries.find(r => r.store.toLowerCase().includes('liverpool'));
  const otherRegistries = registries.filter(r => !r.store.toLowerCase().includes('liverpool'));

  const copyToClipboard = (text: string, type: 'bank' | 'liverpool') => {
    navigator.clipboard.writeText(text);
    if (type === 'bank') {
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 2000);
    } else {
        setCopiedLiverpool(true);
        setTimeout(() => setCopiedLiverpool(false), 2000);
    }
  };

  const formatClabe = (clabe: string) => clabe.replace(/(.{4})/g, '$1 ').trim();

  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#F9F5F0] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent [background-size:20px_20px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: EASE_LUXURY }}
          >
             <h2 className="font-sans text-5xl md:text-7xl font-extrabold text-wedding-dark uppercase tracking-tight mb-2">
               Detalles
             </h2>
             <p className="font-serif text-3xl md:text-4xl text-wedding-secondary transform -rotate-2">
               Mesa de Regalos
             </p>
          </motion.div>

          <motion.p 
            className="font-sans text-sm md:text-base text-wedding-dark/60 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Su presencia es nuestro mayor regalo. Si desean tener un detalle adicional con nosotros:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* -----------------------------------------------------
               COLUMNA 1: BANCO (GIRATORIA - VERDE)
               ----------------------------------------------------- */}
            <div className="flex flex-col items-center">
                <div className="mb-6 flex items-center gap-2 text-wedding-primary/80">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Transferencia</span>
                </div>

                {bankAccount ? (
                    <>
                        <div 
                            className="relative w-full max-w-[420px] aspect-[1.586/1] group cursor-pointer" 
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
                                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#2C3E2E] to-[#1a251b] shadow-2xl text-white p-8 flex flex-col justify-between overflow-hidden border border-white/10"
                                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", zIndex: 2 }}
                                >
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 opacity-80 shadow-sm" />
                                        <span className="font-sans text-[10px] uppercase tracking-widest opacity-60">Bank Card</span>
                                    </div>
                                    <div className="space-y-1 z-10">
                                        <p className="font-serif text-2xl opacity-90">Lluvia de Sobres</p>
                                        <p className="font-sans text-[10px] uppercase tracking-widest opacity-50">Toca para ver datos</p>
                                    </div>
                                    <div className="flex justify-between items-end z-10">
                                        <p className="font-mono text-lg tracking-widest opacity-80">**** 2026</p>
                                        <CreditCard className="opacity-50" />
                                    </div>
                                </div>

                                {/* ATRÁS VERDE */}
                                <div 
                                    className="absolute inset-0 w-full h-full rounded-2xl bg-[#1a251b] shadow-2xl text-white p-6 md:p-8 flex flex-col justify-center border border-wedding-secondary/30"
                                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                                >
                                    <div className="space-y-3 text-center relative z-10">
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-wedding-secondary">Banco</p>
                                            <p className="font-bold text-lg">{bankAccount.bankName}</p>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-lg border border-white/10 relative">
                                            <p className="text-[9px] uppercase tracking-widest text-wedding-secondary mb-1">CLABE</p>
                                            <p className="font-mono text-sm md:text-base tracking-wider text-white select-all">
                                                {formatClabe(bankAccount.clabe)}
                                            </p>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); copyToClipboard(bankAccount.clabe, 'bank'); }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-wedding-secondary hover:bg-white hover:text-wedding-dark rounded-full transition-colors shadow-lg"
                                            >
                                                {copiedBank ? <Check size={12} /> : <Copy size={12} />}
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-wedding-secondary">Titular</p>
                                            <p className="font-serif text-base italic truncate">{bankAccount.holder}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <p className="mt-4 text-[10px] text-wedding-dark/40 font-sans uppercase tracking-widest animate-pulse">
                            Toca para ver cuenta
                        </p>
                    </>
                ) : null}
            </div>

            {/* -----------------------------------------------------
               COLUMNA 2: LIVERPOOL (ENLACE DIRECTO - ROSA)
               ----------------------------------------------------- */}
            <div className="flex flex-col items-center justify-start space-y-10">
                
                {liverpoolRegistry && (
                    <div className="flex flex-col items-center w-full">
                        <div className="mb-6 flex items-center gap-2 text-[#E91E63]/80">
                            <ShoppingBag size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Liverpool</span>
                        </div>

                        {/* TARJETA ROSA: ES UN LINK GIGANTE, NO GIRA */}
                        <a 
                            href={liverpoolRegistry.url}
                            target="_blank"
                            rel="noreferrer"
                            className="relative w-full max-w-[420px] aspect-[1.586/1] group block"
                        >
                            <div 
                                className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#EC407A] to-[#880E4F] shadow-2xl text-white p-8 flex flex-col justify-between overflow-hidden border border-white/20 transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(233,30,99,0.3)]"
                            >
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                                
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="w-12 h-8 rounded backdrop-blur-sm " />
                                    <span className="font-sans text-[10px] uppercase tracking-widest opacity-80">Gift Card</span>
                                </div>

                                {/* CENTRO: LOGO + ACCIÓN */}
                                <div className="space-y-4 z-10 flex flex-col items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white p-2 rounded-full shadow-lg">
                                            <IconLiverpool className="w-8 h-8" color="#E91E63" />
                                        </div>
                                        <div>
                                            <p className="font-serif text-2xl opacity-95 leading-none">Liverpool</p>
                                            <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Mesa de Regalos</p>
                                        </div>
                                    </div>
                                </div>
                                  <ExternalLink size={0} />
                            </div>
                        </a>
                        <p className="mt-4 text-[10px] text-wedding-dark/40 font-sans uppercase tracking-widest animate-pulse">
                            Click para ir a la mesa de regalos
                        </p>
                    </div>
                )}

                {/* OTRAS TIENDAS */}
                {otherRegistries.length > 0 && (
                    <div className="w-full max-w-[420px] space-y-4">
                        {liverpoolRegistry && <div className="w-full h-[1px] bg-wedding-dark/10 my-4" />}
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-wedding-dark/50 mb-4">
                            Otras Opciones
                        </p>
                        {otherRegistries.map((reg) => (
                            <a 
                                key={reg.id}
                                href={reg.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center justify-between p-4 bg-white border border-wedding-dark/5 rounded-xl hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#F9F5F0] flex items-center justify-center text-wedding-dark group-hover:bg-wedding-secondary group-hover:text-white transition-colors">
                                        <Gift size={14} />
                                    </div>
                                    <span className="font-sans font-bold text-wedding-dark text-sm">
                                        {reg.store}
                                    </span>
                                </div>
                                <ExternalLink size={14} className="text-wedding-dark/30 group-hover:text-wedding-secondary" />
                            </a>
                        ))}
                    </div>
                )}
            </div>

        </div>
      </div>
    </section>
  );
}