"use client";

import { motion } from "framer-motion";
import { MapPin, Car } from "lucide-react";

export default function Location() {
  const handleOpenMap = (app: 'waze' | 'google') => {
    const lat = "20.9144";
    const lng = "-100.7438"; 
    
    if (app === 'waze') {
      window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#fff0f3] flex flex-col items-center text-center overflow-hidden">
      
      {/* Elemento Decorativo de Fondo (Opcional, muy sutil) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl px-6"
      >
        
        {/* ETIQUETA SUPERIOR */}
        <div className="flex flex-col items-center gap-4 mb-8">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-rose-950/50 font-bold">
                El Destino
            </span>
            <div className="w-12 h-[1px] bg-rose-950/20"></div>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <h2 className="font-serif text-5xl md:text-7xl text-rose-950 mb-6 leading-none">
            Hacienda <br />
            <span className="italic text-rose-400">Los Arcángeles</span>
        </h2>

        {/* DESCRIPCIÓN Y DIRECCIÓN */}
        <div className="space-y-6 text-rose-950/70 font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-12">
            <p>
                San Miguel de Allende, Guanajuato.
            </p>
            <p className="opacity-80 font-light">
                Salida a Real de Querétaro #145
            </p>
        </div>

        {/* BOTONES DE ACCIÓN (Centrados) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Waze: Botón Sólido y Elegante */}
            <button 
                onClick={() => handleOpenMap('waze')}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-rose-950 text-white rounded-full shadow-[0_10px_20px_-5px_rgba(88,28,60,0.3)] hover:bg-rose-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
                <Car size={18} className="text-rose-200" />
                <span className="uppercase tracking-widest text-xs font-bold">Ir con Waze</span>
            </button>

            {/* Google Maps: Botón Outline Minimalista */}
            <button 
                onClick={() => handleOpenMap('google')}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-rose-950/20 text-rose-950 rounded-full hover:bg-rose-950 hover:text-white hover:border-transparent transition-all duration-300"
            >
                <MapPin size={18} />
                <span className="uppercase tracking-widest text-xs font-bold">Google Maps</span>
            </button>
        </div>

      </motion.div>
    </section>
  );
}