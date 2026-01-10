"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Palette } from "lucide-react";
// En producción, usa 'next/image'. Aquí usamos 'img' para el preview.
// import Image from "next/image";

export default function DressCode() {
  const containerRef = useRef(null);

  // CONTROL DEL SCROLL
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"], 
  });

  // PARALLAX SUAVE
  const xSuit = useTransform(scrollYProgress, [0, 1], [-30, 0]); // Reducido un poco para mobile
  const xDress = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacityImages = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Variantes para animaciones de entrada
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 md:py-32 px-2 md:px-4 bg-stone-50 overflow-hidden"
    >
      
      {/* Fondo Decorativo Sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-stone-200/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-stone-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* CABECERA */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 md:mb-20"
        >
            <span className="uppercase tracking-[0.2em] text-xs md:text-sm text-stone-500 font-semibold mb-3 block">
                Guía de Estilo
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-800 mb-6">
                Código de Vestimenta
            </h2>
            <div className="w-16 md:w-24 h-1 bg-stone-300 mx-auto rounded-full mb-8" />
            
            <div className="inline-block bg-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-sm border border-stone-100">
                <span className="font-serif text-lg md:text-2xl text-stone-700 italic">
                    "Formal - Formal Casual"
                </span>
            </div>
            
            <p className="mt-6 md:mt-8 font-sans text-sm md:text-base text-stone-500 max-w-2xl mx-auto leading-relaxed font-light px-4">
                Para nosotros lo más importante es su comodidad, lo ideal es Formal o Formal Casual pero eso no es relevante para nosotros, contar contigo es lo más importante
            </p>
        </motion.div>

        {/* CONTENEDOR DE TARJETAS (GRID) */}
        {/* CAMBIO: grid-cols-2 desde móvil, gap reducido en móvil */}
        <div className="grid grid-cols-2 gap-3 md:gap-12 mb-16 md:mb-24 max-w-4xl mx-auto">
            
            {/* --- TARJETA ELLOS --- */}
            <motion.div 
                className="bg-white p-4 md:p-12 rounded-2xl md:rounded-3xl shadow-xl border border-stone-50 relative overflow-hidden group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-50px" }}
            >
                <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div 
                        style={{ x: xSuit, opacity: opacityImages }}
                        // Ajuste de tamaño de imagen para móvil
                        className="w-24 h-24 md:w-48 md:h-48 relative mb-4 md:mb-6"
                    >
                         {/* Placeholder para preview. Usa tu /images/traje.png */}
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3345/3345607.png" 
                            alt="Traje"
                            className="w-full h-full object-contain drop-shadow-md opacity-80 group-hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>

                    <h3 className="font-serif text-xl md:text-3xl text-stone-800 mb-2">Ellos</h3>
                    <div className="h-px w-8 md:w-12 bg-stone-200 mb-3 md:mb-4" />
                    
                    <ul className="text-stone-600 space-y-1 md:space-y-2 mb-4 md:mb-6 text-[10px] md:text-base leading-tight">
                        <li>Traje completo</li>
                        <li>Pantalón y Camisa</li>
                        <li>Tenis o Zapatos</li>
                        <li>Cómo tu gustes</li>
                    </ul>

                    <span className="bg-stone-100 text-stone-600 px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                        Elegancia Relax
                    </span>
                </div>
                {/* Degradado decorativo en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>

            {/* --- TARJETA ELLAS --- */}
            <motion.div 
                className="bg-white p-4 md:p-12 rounded-2xl md:rounded-3xl shadow-xl border border-stone-50 relative overflow-hidden group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ margin: "-50px" }}
            >
                <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div 
                        style={{ x: xDress, opacity: opacityImages }}
                        // Ajuste de tamaño de imagen para móvil
                        className="w-24 h-24 md:w-48 md:h-48 relative mb-4 md:mb-6"
                    >
                        {/* Placeholder para preview. Usa tu /images/vestido.png */}
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/2806/2806240.png" 
                            alt="Vestido"
                            className="w-full h-full object-contain drop-shadow-md opacity-80 group-hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>

                    <h3 className="font-serif text-xl md:text-3xl text-stone-800 mb-2">Ellas</h3>
                    <div className="h-px w-8 md:w-12 bg-stone-200 mb-3 md:mb-4" />

                    <ul className="text-stone-600 space-y-1 md:space-y-2 mb-4 md:mb-6 text-[10px] md:text-base leading-tight">
                        <li>Vestido Midi o Largo Vaporoso</li>
                        <li>Colores vivos o pasteles</li>
                        <li>Tacón o Tenis</li>
                    </ul>

                    <span className="bg-stone-100 text-stone-600 px-3 md:px-4 py-1 rounded-full text-[8px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                        ELEGANCIA RELAX
                    </span>
                </div>
                 {/* Degradado decorativo en hover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>

        </div>

        {/* --- PALETA DE COLORES --- */}
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-50px" }}
            className="max-w-3xl mx-auto"
        >
            <div className="bg-white/80 backdrop-blur-md border border-white p-6 md:p-10 rounded-[2rem] shadow-lg text-center relative mx-4 md:mx-0">
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-stone-800 text-white px-4 md:px-6 py-2 rounded-full flex items-center gap-2 shadow-lg w-max max-w-[90%]">
                    <Palette size={12} className="md:w-[14px] md:h-[14px]" />
                    <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">
                        Colores Reservados
                    </span>
                </div>

                <p className="font-serif text-sm md:text-lg text-stone-600 mt-4 mb-6 md:mb-8 italic opacity-80">
                    Lo que si te pedimos es evitar estos tonos, reservados para la corte nupcial. 
                </p>
                
                {/* GRID DE MUESTRAS */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    <ColorSwatch color="#D4B9B9" label="Rosa Palo" delay={0.1} />
                    <ColorSwatch color="#8F9E8B" label="Verde Salvia" delay={0.2} />
                    <ColorSwatch color="#E6DCCA" label="Beige" delay={0.3} />
                    <ColorSwatch color="#FFFFFF" label="Blanco" delay={0.4} isWhite />
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}

// Subcomponente de Muestra de Color
const ColorSwatch = ({ color, label, delay, isWhite }: { color: string, label: string, delay: number, isWhite?: boolean }) => (
    <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: delay }}
        viewport={{ margin: "-20px" }}
        className="flex flex-col items-center gap-2 md:gap-3 group cursor-default"
    >
        <div 
            className={`w-12 h-12 md:w-20 md:h-20 rounded-full shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${isWhite ? 'border border-stone-200' : ''}`}
            style={{ backgroundColor: color }}
        >
            {isWhite && (
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />
            )}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
        </div>
        <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-stone-500 group-hover:text-stone-800 transition-colors">
            {label}
        </span>
    </motion.div>
);