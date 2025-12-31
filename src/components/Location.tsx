"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function Location() {
  const handleOpenMap = (app: 'waze' | 'google') => {
    // RECUERDA: Poner tus coordenadas reales aquí
    const lat = "20.9144";
    const lng = "-100.7438";
    
    if (app === 'waze') {
      window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  };

  return (
    <section className="relative w-full py-24 bg-white overflow-hidden rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
      
      {/* 1. HEADER MINIMALISTA (Solo Título) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <span className="text-[#E8DCC4] text-xs uppercase tracking-[0.4em] font-sans block mb-3">
            Destino
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E2E]">
            Ubicación
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 items-center">
        
        {/* 2. MAPA "CHIQUITO" (Entra por IZQUIERDA) */}
        <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // h-[300px] hace el mapa más pequeño y compacto
            className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-lg border border-[#E8DCC4]/50 bg-gray-100"
        >
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.4!2d-100.74!3d20.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU0JzUxLjgiTiAxMDDCsDQ0JzM3LjciVw!5e0!3m2!1ses!2smx!4v1600000000000!5m2!1ses!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                className="grayscale opacity-80" 
             />
             
             {/* Pin Decorativo */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <MapPin size={40} className="text-[#2C3E2E] fill-[#E8DCC4] drop-shadow-md animate-bounce" />
             </div>
        </motion.div>

        {/* 3. DIRECCIÓN E INFO (Entra por DERECHA) */}
        <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center md:text-left pl-0 md:pl-8"
        >
            {/* Aquí ponemos la dirección para que esté a la derecha del mapa */}
            <h3 className="text-2xl md:text-3xl font-serif text-[#2C3E2E] mb-2">
                Hacienda Los Arcángeles
            </h3>
            <p className="text-[#2C3E2E]/70 mb-6 font-light leading-relaxed">
                San Miguel de Allende, Guanajuato.<br/>
                <span className="text-xs uppercase tracking-wider opacity-60">Entrada Principal por Carr. a Dolores</span>
            </p>

            {/* Botones Compactos */}
            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => handleOpenMap('waze')}
                    className="flex items-center justify-center md:justify-start gap-3 px-6 py-3 bg-[#2C3E2E] text-white rounded-lg hover:bg-[#1a261c] transition-all w-full md:w-auto"
                >
                    <Navigation size={16} className="text-[#E8DCC4]" />
                    <span className="tracking-widest uppercase text-xs font-medium">Ir con Waze</span>
                </button>

                <button 
                    onClick={() => handleOpenMap('google')}
                    className="flex items-center justify-center md:justify-start gap-3 px-6 py-3 bg-transparent border border-[#2C3E2E]/30 text-[#2C3E2E] rounded-lg hover:border-[#2C3E2E] hover:bg-[#F9F5F0] transition-all w-full md:w-auto"
                >
                    <MapPin size={16} />
                    <span className="tracking-widest uppercase text-xs font-medium">Google Maps</span>
                </button>
            </div>
            
        </motion.div>

      </div>
    </section>
  );
}