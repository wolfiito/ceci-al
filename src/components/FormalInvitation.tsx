"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FormalInvitationProps {
  guestName: string;
  type?: 'family' | 'individual' | 'couple';
}

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  
  return (
    <section className="relative w-full bg-[#050505] min-h-screen py-12 px-4 flex justify-center items-center overflow-hidden">
      
      {/* === AMBIENTE (Fondo) === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1500_0%,_#000000_100%)]" />
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <FloatingParticle className="top-1/4 left-1/4" delay={0} />
         <FloatingParticle className="bottom-1/4 right-1/3" delay={1} />
         <FloatingParticle className="top-1/2 left-1/2" delay={3} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative max-w-[480px] w-full mx-auto"
      >
        
        {/* ======================================================= */}
        {/* === SOLUCIÓN DEFINITIVA: CAPA DE ESQUINAS CON CSS PURO === */}
        <div className="absolute inset-0 z-30 pointer-events-none">
            
            {/* 1. Arriba Izquierda (Normal) */}
            {/* ----|  */}
            <div className="absolute top-0 left-0 w-20 h-20 text-[#D4AF37]">
                <BaroqueCorner />
            </div>

            {/* 2. Arriba Derecha (Rotar 90 grados) */}
            {/* |----  */}
            <div 
                className="absolute top-0 right-0 w-20 h-20 text-[#D4AF37]"
                style={{ transform: 'rotate(90deg)' }} // FORZAMOS ROTACIÓN
            >
                <BaroqueCorner />
            </div>

            {/* 3. Abajo Derecha (Rotar 180 grados) */}
            {/* |____  */}
            <div 
                className="absolute bottom-0 right-0 w-20 h-20 text-[#D4AF37]"
                style={{ transform: 'rotate(180deg)' }} // FORZAMOS ROTACIÓN
            >
                <BaroqueCorner />
            </div>

            {/* 4. Abajo Izquierda (Rotar 270 grados - que es lo mismo que -90) */}
            {/* ____|  */}
            <div 
                className="absolute bottom-0 left-0 w-20 h-20 text-[#D4AF37]"
                style={{ transform: 'rotate(270deg)' }} // FORZAMOS ROTACIÓN
            >
                <BaroqueCorner />
            </div>

        </div>
        {/* ======================================================= */}


        {/* === ESTRUCTURA Y CONTENIDO === */}
        <div className="relative border-[1px] border-[#D4AF37]/30 p-1 my-3 mx-3">
            
            <div className="absolute inset-[4px] border-[1px] border-[#D4AF37]/20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center py-16 px-6 md:px-10 bg-[#0a0a0a]/90 backdrop-blur-[2px]">
                
                {/* ANILLOS */}
                <div className="relative w-24 h-24 mb-6">
                    <Image 
                        src="/images/iconos_anillos.png" 
                        alt="Anillos" 
                        fill 
                        className="object-contain opacity-100 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                    />
                </div>

                <h3 className="font-serif text-l text-[#E5E5E5] italic leading-relaxed max-w-[280px] mb-8 font-light tracking-wide">
                    "Bajo la bendición de Dios y honrando el amor de quienes nos acompañan."
                </h3>

                

                <p className="font-serif text-xs text-[#9CA3AF] uppercase tracking-[0.3em] mb-2">
                    Tenemos el honor de invitar a
                </p>

                {/* NOMBRE DEL INVITADO */}
                <div className="my-6 w-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-16 bg-[#D4AF37]/10 blur-xl rounded-full -z-10"></div>
                    
                    {type === 'family' && (
                        <span className="block font-sans text-[9px] text-[#D4AF37] uppercase tracking-[0.4em] font-bold mb-3">
                            Familia
                        </span>
                    )}
                    <span 
                        className="font-alex text-5xl md:text-7xl text-[#F4EBD0] block leading-none drop-shadow-lg" 
                        style={{ fontFamily: 'var(--font-alex), cursive' }}
                    >
                        {guestName}
                    </span>
                </div>

                {/* Adorno Inferior Sutil */}
                <div className="mb-6 opacity-60">
                     <SimpleFlourish />
                </div>

                <div className="max-w-xs mx-auto mt-2">
                    <p className="font-serif text-sm text-[#D1D5DB] italic leading-relaxed font-light">
                        "El amor es paciente, es bondadoso... no es egoísta."
                    </p>
                    <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-[0.25em] mt-4 font-bold border-t border-[#D4AF37]/30 pt-4 inline-block">
                        1 Corintios 13:4-5
                    </p>
                </div>

            </div>
        </div>
      </motion.div>
    </section>
  );
}

// === COMPONENTES SVG (Sin cambios aquí, el SVG base está bien) ===

// 1. ESQUINA BARROCA
function BaroqueCorner({ className }: { className?: string }) {
    // Este SVG está dibujado para ser la esquina Superior-Izquierda por defecto
    return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M2 98V30C2 15 15 2 30 2H98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 98V35C15 25 25 15 35 15H100" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
            <circle cx="2" cy="2" r="2" fill="currentColor" />
            <circle cx="30" cy="2" r="1.5" fill="currentColor" />
            <circle cx="2" cy="30" r="1.5" fill="currentColor" />
            <path d="M2 30 Q 15 30 25 20 Q 30 15 30 2" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
    );
}

// 2. Adorno pequeño inferior
function SimpleFlourish() {
    return (
         <svg width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5C10 5 15 10 20 10C25 10 30 5 40 5" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
        </svg>
    )
}

// 3. Partícula
function FloatingParticle({ className, delay }: { className?: string, delay: number }) {
    return (
        <motion.div
            animate={{ 
                y: [0, -20, 0], 
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5] 
            }}
            transition={{ 
                duration: 5, 
                repeat: Infinity, 
                delay: delay,
                ease: "easeInOut" 
            }}
            className={`absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px] ${className}`}
        />
    );
}