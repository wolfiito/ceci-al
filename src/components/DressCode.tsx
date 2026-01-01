"use client";

import { motion } from "framer-motion";
import { Shirt, Gem, Palette } from "lucide-react"; 

export default function DressCode() {
  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-rose-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-orange-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* 1. CABECERA AMIGABLE */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
        >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-950/40 font-bold mb-3">
                Código de Vestimenta
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-rose-950 mb-4">
                Formal Casual
            </h2>
            <p className="font-sans text-rose-950/60 max-w-lg mx-auto leading-relaxed italic">
                "Queremos que se sientan libres, cómodos y listos para disfrutar al máximo con nosotros."
            </p>
        </motion.div>

        {/* 2. TARJETAS DE COMODIDAD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            
            {/* Ellas */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center p-6"
            >
                <div className="w-16 h-16 rounded-full bg-[#fff0f3] flex items-center justify-center mb-4 border border-rose-100">
                    <Gem size={28} strokeWidth={1.5} className="text-rose-400" />
                </div>
                <h3 className="font-serif text-xl text-rose-950 mb-2">Ellas</h3>
                <p className="text-sm font-sans text-rose-950/70 max-w-xs mx-auto leading-relaxed">
                    Vestido largo, midi o traje sastre. <br/>
                    <span className="text-xs font-bold opacity-80 mt-1 block">¡Tu estilo es lo primero!</span>
                </p>
            </motion.div>

            {/* Ellos */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center p-6"
            >
                <div className="w-16 h-16 rounded-full bg-[#fff0f3] flex items-center justify-center mb-4 border border-rose-100">
                    <Shirt size={28} strokeWidth={1.5} className="text-rose-400" />
                </div>
                <h3 className="font-serif text-xl text-rose-950 mb-2">Ellos</h3>
                <p className="text-sm font-sans text-rose-950/70 max-w-xs mx-auto leading-relaxed">
                    Traje (con o sin corbata) o guayabera. <br/>
                    <span className="text-xs font-bold opacity-80 mt-1 block">Comodidad y elegancia.</span>
                </p>
            </motion.div>
        </div>

        {/* 3. RESTRICCIÓN DE COLOR (Polite but clear) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-[#fff0f3] px-8 py-6 rounded-3xl border border-rose-100 shadow-sm"
        >
            <div className="flex flex-col items-center gap-4">
                
                <div className="flex items-center gap-2 text-rose-950/60">
                    <Palette size={18} />
                    <span className="text-xs uppercase tracking-widest font-bold">Nota de Color</span>
                </div>

                <div className="text-center max-w-md">
                    <p className="text-sm text-rose-950/80 font-serif mb-4 leading-relaxed">
                        Les pedimos con mucho cariño <span className="font-bold">evitar</span> los siguientes colores, ya que están reservados para la corte y los novios:
                    </p>
                    
                    {/* MUESTRARIO DE COLORES PROHIBIDOS */}
                    <div className="flex flex-wrap justify-center gap-3">
                        
                        {/* Rosa */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-rose-100/50 shadow-sm">
                            <div className="w-3 h-3 rounded-full bg-rose-300" />
                            <span className="text-[10px] uppercase tracking-wider text-rose-950/70 font-bold">Rosa</span>
                        </div>

                        {/* Verde */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-rose-100/50 shadow-sm">
                            <div className="w-3 h-3 rounded-full bg-emerald-700" />
                            <span className="text-[10px] uppercase tracking-wider text-rose-950/70 font-bold">Verde</span>
                        </div>

                         {/* Beige */}
                         <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-rose-100/50 shadow-sm">
                            <div className="w-3 h-3 rounded-full bg-[#e8e0d5]" />
                            <span className="text-[10px] uppercase tracking-wider text-rose-950/70 font-bold">Beige</span>
                        </div>

                        {/* Blanco */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-rose-100/50 shadow-sm">
                            <div className="w-3 h-3 rounded-full bg-white border border-gray-200" />
                            <span className="text-[10px] uppercase tracking-wider text-rose-950/70 font-bold">Blanco</span>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}