"use client";

import { motion } from "framer-motion";

interface FormalInvitationProps {
  guestName: string;
  type?: 'family' | 'individual' | 'couple';
}

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  return (
    // FONDO: Un tono crema/hueso muy suave para dar calidez (#FDFBF7)
    <section className="relative w-full bg-[#FDFBF7] min-h-[85vh] flex justify-center items-center overflow-hidden py-20 px-4">
      
      {/* Textura de fondo sutil (Ruido granulado opcional para sensación de papel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      {/* Partículas de color ambiental (Rosa y Verde muy difuminados) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D4A5A5]/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3A4A3B]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[550px]"
      >
        {/* === TARJETA PRINCIPAL === */}
        {/* Fondo blanco puro con sombra suave para separarlo del fondo crema */}
        <div className="relative bg-white shadow-xl shadow-[#3A4A3B]/5 p-2">
          
          {/* MARCO DECORATIVO INTERNO (Doble línea fina) */}
          <div className="border border-[#3A4A3B]/10 p-1">
            <div className="border border-[#3A4A3B]/20 py-12 px-6 md:px-12 flex flex-col items-center text-center">
              
              {/* Icono Superior: Hoja de Olivo Minimalista */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#556B2F] mb-8 opacity-80"
              >
                <OliveBranchIcon className="w-10 h-10" />
              </motion.div>

              {/* INTRODUCCIÓN - Bodoni (Verde Olivo Oscuro) */}
              <h3 
                className="text-[#3A4A3B] text-lg md:text-xl leading-relaxed max-w-[340px] mb-8 font-medium italic"
                style={{ fontFamily: 'var(--font-bodoni)' }}
              >
                Con la bendición de Dios y honrando el amor de quienes nos acompañan.
              </h3>

              <p 
                className="text-[#7A8B77] text-[10px] md:text-xs uppercase tracking-[0.25em] mb-4"
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
              {/* Aquí usamos el Verde Olivo Profundo para máxima elegancia y legibilidad */}
              <div className="relative mb-8 w-full">
                <h1 
                  className="text-5xl md:text-7xl text-[#2C3E2E] leading-none drop-shadow-sm"
                  style={{ fontFamily: 'var(--font-alex)' }}
                >
                  {guestName}
                </h1>
              </div>

              {/* Separador Floral Sutil (Rosa Palo) */}
              <div className="mb-8 text-[#D4A5A5] w-full max-w-[120px] opacity-70">
                 <FloralDivider />
              </div>

              {/* VERSÍCULO - Bodoni */}
              <div className="max-w-xs mx-auto">
                  <p 
                    className="text-[#59665A] text-sm md:text-base italic leading-relaxed font-light"
                    style={{ fontFamily: 'var(--font-bodoni)' }}
                  >
                    "El amor es paciente, es bondadoso... no es egoísta."
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

function OliveBranchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
       {/* Dibujo minimalista de una rama de olivo */}
       <path d="M12 20C12 20 13 12 18 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
       <path d="M12 20C12 20 10 14 6 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
       {/* Hojas Derecha */}
       <ellipse cx="16" cy="10" rx="3" ry="1.5" transform="rotate(-45 16 10)" fill="currentColor" opacity="0.6"/>
       <ellipse cx="19" cy="7" rx="3" ry="1.5" transform="rotate(-45 19 7)" fill="currentColor" opacity="0.6"/>
       {/* Hojas Izquierda */}
       <ellipse cx="8" cy="14" rx="3" ry="1.5" transform="rotate(45 8 14)" fill="currentColor" opacity="0.6"/>
       <ellipse cx="6" cy="11" rx="3" ry="1.5" transform="rotate(45 6 11)" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

function FloralDivider() {
  return (
    <svg width="100%" height="15" viewBox="0 0 100 15" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 7.5H42" stroke="currentColor" strokeWidth="0.5" />
      <path d="M58 7.5H100" stroke="currentColor" strokeWidth="0.5" />
      {/* Pequeña flor central */}
      <circle cx="50" cy="7.5" r="2" fill="currentColor" />
      <circle cx="50" cy="3.5" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="50" cy="11.5" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="46" cy="7.5" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="54" cy="7.5" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}