"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FormalInvitationProps {
  guestName: string;
  type?: 'family' | 'individual' | 'couple';
}

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  return (
    // FONDO: Crema suave (#FDFBF7)
    <section className="relative w-full bg-[#FDFBF7] min-h-[85vh] flex justify-center items-center overflow-hidden py-20 px-4">
      
      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      {/* Partículas de color ambiental (Rosa y Verde difuminados) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#D4A5A5]/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-[#3A4A3B]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-137.5"
      >
        {/* === TARJETA PRINCIPAL === */}
        <div className="relative bg-white shadow-xl shadow-[#3A4A3B]/5 p-2">
          
          {/* MARCO DECORATIVO INTERNO */}
          <div className="border border-[#3A4A3B]/10 p-1">
            <div className="border border-[#3A4A3B]/20 py-12 px-6 md:px-12 flex flex-col items-center text-center">
              
              {/* IMAGEN: ANILLOS */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative w-20 h-20 mb-6"
              >
                 <Image 
                    src="/images/iconos_anillos.png" 
                    alt="Anillos de boda" 
                    fill 
                    className="object-contain opacity-90 drop-shadow-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 />
              </motion.div>

              {/* INTRODUCCIÓN - Bodoni (Verde Olivo Oscuro) */}
              <h3 
                className="text-[#3A4A3B] text-lg md:text-xl leading-relaxed max-w-85 mb-8 font-medium italic"
                style={{ fontFamily: 'var(--font-bodoni)' }}
              >
                Con la bendición de Dios y honrando el amor de quienes nos acompañan.
              </h3>

              <p 
                className="text-wedding-primary text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4"
                style={{ fontFamily: 'var(--font-bodoni)' }}
              >
                Tenemos el honor de invitar a
              </p>

              {/* TIPO DE INVITADO (Rosa Palo) */}
              {type === 'family' && (
                <span 
                  className="inline-block px-3 py-1 bg-[#F9F0F0] text-[#BC8F8F] text-[9px] uppercase tracking-widest mb-6 rounded-sm font-semibold"
                  style={{ fontFamily: 'var(--font-bodoni)' }}
                >
                  Familia
                </span>
              )}

              {/* NOMBRE DEL INVITADO - Alex Brush */}
              <div className="relative mb-8 w-full">
                <h1 
                  className="text-5xl md:text-7xl text-wedding-dark leading-none drop-shadow-sm"
                  style={{ fontFamily: 'var(--font-alex)' }}
                >
                  {guestName}
                </h1>
              </div>

              {/* Separador Floral Sutil (Rosa Palo) */}
              <div className="mb-8 text-[#D4A5A5] w-full max-w-30 opacity-70">
                 <FloralDivider />
              </div>

              {/* VERSÍCULO - Bodoni */}
              <div className="max-w-xs mx-auto">
                  <p 
                    className="text-[#59665A] text-sm md:text-base italic leading-relaxed font-light"
                    style={{ fontFamily: 'var(--font-bodoni)' }}
                  >
                    El amor es paciente,
                  </p>
                  <p 
                    className="text-[#59665A] text-sm md:text-base italic leading-relaxed font-light"
                    style={{ fontFamily: 'var(--font-bodoni)' }}
                  >
                    es bondadoso... no es egoísta.
                  </p>
                  
                  <p 
                    className="text-[#8F9E8D] text-[10px] uppercase tracking-[0.2em] mt-4 font-bold border-t border-[#3A4A3B]/10 pt-4 inline-block"
                    style={{ fontFamily: 'var(--font-bodoni)' }}
                  >
                    1 Corintios 13:4-5
                  </p>
              </div>

            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}

// === COMPONENTES SVG PERSONALIZADOS ===

function FloralDivider() {
  return (
    <svg width="100%" height="15" viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 7.5H42" stroke="currentColor" strokeWidth="0.5" />
      <path d="M58 7.5H100" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="7.5" r="2" fill="currentColor" />
      <circle cx="50" cy="3.5" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="50" cy="11.5" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="46" cy="7.5" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="54" cy="7.5" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}