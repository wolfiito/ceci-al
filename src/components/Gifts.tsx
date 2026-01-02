"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // QUITAMOS AnimatePresence
import { Copy, Check, CreditCard, Gift, ExternalLink, Sparkles } from "lucide-react";

interface GiftsProps {
  gifts?: {
    bankAccount?: { bankName: string; clabe: string; holder: string };
    registries?: { id: string; store: string; url: string }[];
    cashInstructions?: string;
  };
}

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Gifts({ gifts }: GiftsProps) {
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!gifts) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatClabe = (clabe: string) => {
    return clabe.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#F9F5F0] overflow-hidden">
      
      {/* Patrón de fondo estilo billete de seguridad */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent [background-size:20px_20px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 1. CABECERA */}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-sans text-sm md:text-base text-wedding-dark/60 max-w-xl mx-auto leading-relaxed"
          >
            Su presencia es nuestro mayor regalo. Si desean tener un detalle adicional con nosotros, ponemos a su disposición nuestra:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* 2. LA TARJETA INTERACTIVA (Lluvia de Sobres) */}
            <div className="flex flex-col items-center">
                <div className="mb-6 flex items-center gap-2 text-wedding-primary/80">
                    <Sparkles size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Lluvia de Sobres Digital</span>
                </div>

                {/* CONTENEDOR DE LA TARJETA (Scene) */}
                {/* Forzamos perspective aquí para asegurar el efecto 3D */}
                <div 
                    className="relative w-full max-w-[420px] aspect-[1.586/1] group cursor-pointer" 
                    style={{ perspective: "1000px" }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    <motion.div
                        className="w-full h-full relative transition-all duration-700"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        // Forzamos transformStyle para que los hijos 3D funcionen
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* --- CARA FRONTAL (Diseño Lujoso) --- */}
                        <div 
                            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#2C3E2E] to-[#1a251b] shadow-2xl text-white p-8 flex flex-col justify-between overflow-hidden border border-white/10"
                            // Ocultamos la cara trasera al girar
                            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                        >
                            {/* Brillo decorativo */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 opacity-80 shadow-sm" /> {/* Chip */}
                                <span className="font-sans text-[10px] uppercase tracking-widest opacity-60">Wedding Card</span>
                            </div>

                            <div className="space-y-1 z-10">
                                <p className="font-serif text-2xl opacity-90">Lluvia de Sobres</p>
                                <p className="font-sans text-[10px] uppercase tracking-widest opacity-50">Toca para ver datos</p>
                            </div>

                            <div className="flex justify-between items-end z-10">
                                <p className="font-mono text-lg md:text-xl tracking-widest opacity-80">**** **** **** 2026</p>
                                <CreditCard className="opacity-50" />
                            </div>
                        </div>

                        {/* --- CARA TRASERA (Datos Bancarios) --- */}
                        <div 
                            className="absolute inset-0 w-full h-full rounded-2xl bg-[#1a251b] shadow-2xl text-white p-8 flex flex-col justify-center border border-wedding-secondary/30"
                            // Esta cara ya está rotada 180deg y oculta su espalda
                            style={{ 
                                transform: "rotateY(180deg)", 
                                backfaceVisibility: "hidden", 
                                WebkitBackfaceVisibility: "hidden" 
                            }}
                        >
                             {gifts.bankAccount ? (
                                <div className="space-y-4 text-center relative z-10">
                                    <div className="text-center space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-wedding-secondary">Banco</p>
                                        <p className="font-bold text-xl">{gifts.bankAccount.bankName}</p>
                                    </div>
                                    
                                    <div className="bg-white/5 p-3 rounded-lg border border-white/10 relative group">
                                        <p className="text-[10px] uppercase tracking-widest text-wedding-secondary mb-1">CLABE Interbancaria</p>
                                        <p className="font-mono text-sm md:text-lg tracking-wider text-white select-all">
                                            {formatClabe(gifts.bankAccount.clabe)}
                                        </p>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(gifts.bankAccount!.clabe);
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-wedding-secondary hover:bg-white hover:text-wedding-dark rounded-full transition-colors shadow-lg"
                                        >
                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-wedding-secondary">Titular</p>
                                        <p className="font-serif text-lg italic">{gifts.bankAccount.holder}</p>
                                    </div>
                                </div>
                             ) : (
                                 <p className="text-center italic opacity-60">Datos no disponibles</p>
                             )}
                        </div>
                    </motion.div>
                </div>
                <p className="mt-6 text-xs text-wedding-dark/40 font-sans uppercase tracking-widest animate-pulse">
                    Click en la tarjeta para voltear
                </p>
            </div>

            {/* 3. LISTA DE REGALOS (REGISTRIES) */}
            <div className="flex flex-col justify-center space-y-8 pl-0 lg:pl-10 relative">
                {/* Línea divisoria decorativa en desktop */}
                <div className="hidden lg:block absolute left-0 top-10 bottom-10 w-[1px] bg-wedding-dark/10" />

                <div className="space-y-2 text-center lg:text-left">
                    <h3 className="font-serif text-3xl text-wedding-dark">Registros Externos</h3>
                    <p className="text-sm text-wedding-dark/60">También hemos seleccionado algunas opciones en tiendas:</p>
                </div>

                {gifts.registries && gifts.registries.length > 0 ? (
                    <div className="grid gap-4">
                        {gifts.registries.map((reg) => (
                            <a 
                                key={reg.id}
                                href={reg.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative flex items-center justify-between p-5 bg-white border border-wedding-dark/5 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-wedding-secondary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                
                                <div className="relative z-10 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#F9F5F0] flex items-center justify-center text-wedding-dark group-hover:bg-wedding-secondary group-hover:text-white transition-colors">
                                        <Gift size={18} />
                                    </div>
                                    <span className="font-sans font-bold text-wedding-dark uppercase tracking-wide text-sm">
                                        {reg.store}
                                    </span>
                                </div>

                                <ExternalLink size={16} className="text-wedding-dark/30 group-hover:text-wedding-secondary transition-colors relative z-10" />
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 border border-dashed border-wedding-dark/20 rounded-xl text-center">
                        <p className="text-sm text-wedding-dark/50 italic">Próximamente agregaremos nuestras mesas de regalos.</p>
                    </div>
                )}
            </div>

        </div>
      </div>
    </section>
  );
}