"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FormalInvitationProps {
  guestName: string;
  type?: 'family' | 'individual' | 'couple';
}

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  
  return (
    // FONDO: Color sólido limpio (#F9F5F0), sin texturas.
    <section className="relative w-full bg-[#F9F5F0] min-h-[80vh] py-24 px-4 flex justify-center items-center overflow-hidden">
      
      {/* Partículas: Se mantienen sutiles en los colores del tema */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <FloatingParticle className="top-1/4 left-1/4 bg-[#DB8C8A]" delay={0} />
         <FloatingParticle className="bottom-1/4 right-1/3 bg-[#7A8B77]" delay={1} />
         <FloatingParticle className="top-1/2 left-1/2 bg-[#DB8C8A]" delay={3} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative max-w-[520px] w-full mx-auto"
      >
        
        {/* ======================================================= */}
        {/* === ESQUINAS BARROCAS (Verde Bosque #2C3E2E) === */}
        <div className="absolute inset-0 z-30 pointer-events-none">
            
            {/* 1. Arriba Izquierda */}
            <div className="absolute top-0 left-0 w-20 h-20 text-[#2C3E2E] opacity-80">
                <BaroqueCorner />
            </div>

            {/* 2. Arriba Derecha */}
            <div 
                className="absolute top-0 right-0 w-20 h-20 text-[#2C3E2E] opacity-80"
                style={{ transform: 'rotate(90deg)' }} 
            >
                <BaroqueCorner />
            </div>

            {/* 3. Abajo Derecha */}
            <div 
                className="absolute bottom-0 right-0 w-20 h-20 text-[#2C3E2E] opacity-80"
                style={{ transform: 'rotate(180deg)' }} 
            >
                <BaroqueCorner />
            </div>

            {/* 4. Abajo Izquierda */}
            <div 
                className="absolute bottom-0 left-0 w-20 h-20 text-[#2C3E2E] opacity-80"
                style={{ transform: 'rotate(270deg)' }} 
            >
                <BaroqueCorner />
            </div>

        </div>
        {/* ======================================================= */}


        {/* === TARJETA CENTRAL === */}
        {/* Fondo blanco semitransparente para resaltar sobre el crema */}
        <div className="relative border-[1px] border-[#2C3E2E]/20 p-2 my-4 mx-4 shadow-xl bg-white/60 backdrop-blur-sm">
            
            {/* Marco interior fino */}
            <div className="absolute inset-[6px] border-[1px] border-[#2C3E2E]/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center py-16 px-6 md:px-10">
                
                {/* ANILLOS */}
                <div className="relative w-24 h-24 mb-8">
                    <Image 
                        src="/images/iconos_anillos.png" 
                        alt="Anillos" 
                        fill 
                        className="object-contain opacity-90 drop-shadow-sm"
                    />
                </div>

                {/* TEXTO INTRO: Verde Bosque */}
                <h3 className="font-serif text-xl md:text-2xl text-[#2C3E2E] italic leading-relaxed max-w-[320px] mb-8 font-medium">
                    "Bajo la bendición de Dios y honrando el amor de quienes nos acompañan."
                </h3>

                <p className="font-serif text-[10px] md:text-xs text-[#7A8B77] uppercase tracking-[0.3em] mb-4">
                    Tenemos el honor de invitar a
                </p>

                {/* NOMBRE DEL INVITADO */}
                <div className="my-4 w-full relative">
                    {/* Brillo cálido muy sutil detrás del nombre */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-20 bg-[#DB8C8A]/10 blur-2xl rounded-full -z-10"></div>
                    
                    {type === 'family' && (
                        <span className="block font-sans text-[10px] text-[#DB8C8A] uppercase tracking-[0.4em] font-bold mb-2">
                            Familia
                        </span>
                    )}
                    
                    <span 
                        className="font-alex text-5xl md:text-7xl text-[#2C3E2E] block leading-none drop-shadow-sm" 
                        style={{ fontFamily: 'var(--font-alex), cursive' }}
                    >
                        {guestName}
                    </span>
                </div>

                {/* Adorno Inferior (Rosa Palo) */}
                <div className="mb-8 mt-2 opacity-80 text-[#DB8C8A]">
                     <SimpleFlourish />
                </div>

                {/* VERSÍCULO */}
                <div className="max-w-xs mx-auto">
                    <p className="font-serif text-sm text-[#57534e] italic leading-relaxed font-light">
                        "El amor es paciente, es bondadoso... no es egoísta."
                    </p>
                    <p className="font-sans text-[10px] text-[#2C3E2E] uppercase tracking-[0.25em] mt-4 font-bold border-t border-[#2C3E2E]/20 pt-4 inline-block">
                        1 Corintios 13:4-5
                    </p>
                </div>

            </div>
        </div>
      </motion.div>
    </section>
  );
}

// === COMPONENTES SVG ===

function BaroqueCorner({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M2 98V30C2 15 15 2 30 2H98" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 98V35C15 25 25 15 35 15H100" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
            <circle cx="2" cy="2" r="2" fill="currentColor" />
            <circle cx="30" cy="2" r="1.5" fill="currentColor" />
            <circle cx="2" cy="30" r="1.5" fill="currentColor" />
            <path d="M2 30 Q 15 30 25 20 Q 30 15 30 2" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </svg>
    );
}

function SimpleFlourish() {
    return (
         <svg width="60" height="15" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5C10 5 15 10 20 10C25 10 30 5 40 5" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        </svg>
    )
}

function FloatingParticle({ className, delay }: { className?: string, delay: number }) {
    return (
        <motion.div
            animate={{ 
                y: [0, -30, 0], 
                opacity: [0, 0.4, 0],
                scale: [0.5, 1, 0.5] 
            }}
            transition={{ 
                duration: 6, 
                repeat: Infinity, 
                delay: delay,
                ease: "easeInOut" 
            }}
            className={`absolute w-1.5 h-1.5 rounded-full blur-[1px] ${className}`}
        />
    );
}