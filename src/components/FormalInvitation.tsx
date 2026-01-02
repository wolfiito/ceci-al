"use client";

import { motion } from "framer-motion";

// Definimos las props actualizadas
interface FormalInvitationProps {
  guestName: string; // Ej: "Pérez", "Juan", "Ceci y Al"
  type?: 'family' | 'individual' | 'couple'; // Opcional por si no viene
}

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FormalInvitation({ guestName, type = 'family' }: FormalInvitationProps) {
  
  // Lógica de presentación del nombre
  const getDisplayName = () => {
    if (type === 'family') return (
        <>
          Familia
          <br />
          <br />
          {guestName}
        </>
      )
      else return guestName;
  };

  return (
    <section className="relative z-20 py-24 md:py-32 px-4 bg-[#F9F5F0] flex justify-center items-center overflow-hidden">
      
      {/* FONDO SUTIL: Patrón repetitivo muy suave para dar textura al 'suelo' */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#7A8B77_1px,transparent_1px)] [background-size:16px_16px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: EASE_LUXURY }}
        // LA TARJETA: Fondo blanco puro, sombra profunda, bordes redondeados
        className="relative max-w-3xl w-full bg-white shadow-2xl shadow-wedding-dark/10 p-8 md:p-16 text-center border border-wedding-secondary/20 outline outline-4 outline-white/50 -outline-offset-8"
      >
        {/* Esquinas decorativas (estilo invitación clásica) */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-wedding-secondary/40" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-wedding-secondary/40" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-wedding-secondary/40" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-wedding-secondary/40" />

        {/* CONTENIDO */}
        <div className="relative z-10 space-y-8">
            
            {/* 1. ENCUESTA ESPIRITUAL O INTRO */}
            <h3 className="font-serif text-xl md:text-2xl text-wedding-dark/70 italic">
                &ldquo;Con la bendición de Dios y nuestros padres&rdquo;
            </h3>

            {/* 2. EL CONECTOR (Sans Bold para contraste) */}
            <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-8 bg-wedding-primary/30" />
                <p className="font-sans text-xs md:text-sm text-wedding-dark uppercase tracking-[0.3em] font-bold">
                    Tenemos el honor de invitar a
                </p>
                <div className="h-[1px] w-8 bg-wedding-primary/30" />
            </div>

            {/* 3. EL INVITADO (EL HÉROE) */}
            {/* Usamos Alex Brush gigante para que parezca escrito a mano en la tarjeta */}
            <div className="py-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
                    className="relative inline-block"
                >
                   <span className="font-serif text-5xl md:text-7xl lg:text-8xl text-wedding-dark leading-tight drop-shadow-sm transform -rotate-2 block">
                        {getDisplayName()}
                   </span>
                   {/* Subrayado artístico */}
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ delay: 0.8, duration: 1 }}
                     className="h-[2px] bg-wedding-secondary/50 mt-2 mx-auto rounded-full"
                   />
                </motion.div>
            </div>

            {/* 4. CIERRE */}
            <p className="font-sans text-sm md:text-base text-wedding-dark/60 max-w-md mx-auto leading-relaxed font-medium">
                A celebrar el comienzo de nuestra nueva vida juntos.
            </p>

            {/* 5. SELLO O DETALLE FINAL */}
            <div className="pt-6 opacity-40">
                <span className="text-3xl text-wedding-primary">ꕥ</span>
            </div>

        </div>
      </motion.div>
    </section>
  );
}