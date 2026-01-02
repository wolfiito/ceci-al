"use client";

import { motion } from "framer-motion";
import { Shirt, Gem, Palette } from "lucide-react"; 

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DressCode() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-wedding-light overflow-hidden">
      
      {/* 1. FONDO SUTIL: Un toque de "papel" para dar textura */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" />
      
      {/* Elemento decorativo grande y suave */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-wedding-secondary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* 2. CABECERA EDITORIAL */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_LUXURY }}
            className="text-center mb-20"
        >
            <span className="font-serif text-5xl md:text-7xl text-wedding-secondary opacity-80 block transform -rotate-2 mb-2">
                Guía de Estilo
            </span>
            <h2 className="font-sans text-5xl md:text-7xl font-extrabold text-wedding-dark uppercase tracking-tight leading-none drop-shadow-sm">
                Formal Casual
            </h2>
            <div className="h-[2px] w-24 bg-wedding-primary/30 mx-auto my-8" />
            <p className="font-sans text-lg text-wedding-dark/60 max-w-2xl mx-auto leading-relaxed font-light italic">
                Queremos que se sientan libres, cómodos y listos para disfrutar al máximo con nosotros.
            </p>
        </motion.div>

        {/* 3. COLUMNAS DE ESTILO (ELLAS / ELLOS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            
            {/* Tarjeta ELLAS */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_LUXURY }}
                className="group relative bg-white p-10 border border-wedding-secondary/20 shadow-lg shadow-wedding-dark/5 text-center overflow-hidden"
            >
                {/* Hover Effect de fondo */}
                <div className="absolute inset-0 bg-wedding-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                
                <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-wedding-light border border-wedding-secondary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Gem size={28} strokeWidth={1} className="text-wedding-primary" />
                    </div>
                    <h3 className="font-serif text-3xl text-wedding-dark mb-4">Ellas</h3>
                    <p className="text-base font-sans text-wedding-dark/70 leading-relaxed mb-2">
                        Vestido largo, midi o traje sastre.
                    </p>
                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold text-wedding-secondary bg-wedding-secondary/10 px-3 py-1 rounded-full">
                        ¡Tu estilo es lo primero!
                    </span>
                </div>
            </motion.div>

            {/* Tarjeta ELLOS */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_LUXURY }}
                className="group relative bg-white p-10 border border-wedding-primary/20 shadow-lg shadow-wedding-dark/5 text-center overflow-hidden"
            >
                {/* Hover Effect de fondo */}
                <div className="absolute inset-0 bg-wedding-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                
                <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-wedding-light border border-wedding-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Shirt size={28} strokeWidth={1} className="text-wedding-dark" />
                    </div>
                    <h3 className="font-serif text-3xl text-wedding-dark mb-4">Ellos</h3>
                    <p className="text-base font-sans text-wedding-dark/70 leading-relaxed mb-2">
                        Traje (con o sin corbata) o guayabera.
                    </p>
                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold text-wedding-primary bg-wedding-primary/10 px-3 py-1 rounded-full">
                        Comodidad y elegancia
                    </span>
                </div>
            </motion.div>
        </div>

        {/* 4. PALETA DE COLORES (SWATCH CARD) */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white border border-wedding-dark/10 p-8 md:p-12 shadow-2xl shadow-wedding-dark/5 max-w-3xl mx-auto"
        >
            {/* Etiqueta flotante */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wedding-dark text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Palette size={14} />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Nota de Color</span>
            </div>

            <div className="text-center mb-8 pt-4">
                <p className="font-serif text-xl md:text-2xl text-wedding-dark italic">
                    Reservados para la corte y los novios
                </p>
                <p className="text-xs text-wedding-dark/40 uppercase tracking-widest mt-2">
                    Agradecemos evitar estos tonos
                </p>
            </div>
            
            {/* GRID DE MUESTRAS */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                
                {/* Muestra: ROSA */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-full bg-[#D4B9B9] shadow-inner border-4 border-white ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-wedding-dark/60">Rosa</span>
                </div>

                {/* Muestra: VERDE */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-full bg-[#7A8B77] shadow-inner border-4 border-white ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-wedding-dark/60">Verde</span>
                </div>

                 {/* Muestra: BEIGE */}
                 <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-full bg-[#E8DCC4] shadow-inner border-4 border-white ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-wedding-dark/60">Beige</span>
                </div>

                {/* Muestra: BLANCO */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-full bg-white shadow-inner border-4 border-white ring-1 ring-black/5 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                        {/* Patrón sutil para que se note que es blanco sobre blanco */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />
                    </div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-wedding-dark/60">Blanco</span>
                </div>

            </div>
        </motion.div>

      </div>
    </section>
  );
}