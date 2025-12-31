"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    <section className="relative w-full py-24 bg-wedding-dark overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem] -mt-20 z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
      
      {/* Textura */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')] z-0 mix-blend-overlay" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center md:justify-between">
            
            {/* 1. INFORMACIÓN (Izquierda) */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_LUXURY }}
                className="text-center md:text-left flex-1"
            >
                <span className="text-wedding-secondary text-xs uppercase tracking-[0.4em] font-sans block mb-4">
                    Destino
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-wedding-light mb-4 leading-tight">
                    Hacienda Los Arcángeles
                </h3>
                
                <p className="text-wedding-light/70 font-sans text-base font-light mb-8 max-w-md mx-auto md:mx-0">
                    San Miguel de Allende, Guanajuato.
                </p>

                {/* Botones compactos */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button 
                        onClick={() => handleOpenMap('waze')}
                        className="group relative px-5 py-3 bg-wedding-light text-wedding-dark overflow-hidden rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                        <div className="absolute inset-0 w-full h-full bg-wedding-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <div className="relative flex items-center justify-center gap-2">
                            <Navigation size={14} className="text-wedding-dark group-hover:text-white transition-colors" />
                            <span className="tracking-widest uppercase text-[9px] font-bold group-hover:text-white transition-colors">Waze</span>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleOpenMap('google')}
                        className="group px-5 py-3 bg-transparent border border-wedding-light/30 text-wedding-light rounded-full hover:bg-wedding-light/10 transition-all duration-300"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <MapPin size={14} />
                            <span className="tracking-widest uppercase text-[9px] font-bold">Mapa</span>
                        </div>
                    </button>
                </div>
            </motion.div>

            {/* 2. EL MAPA CIRCULAR (Derecha - Icono de lujo) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }} 
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "backOut", delay: 0.2 }}
                // Tamaño fijo, circular, borde grueso elegante
                className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-2xl border-4 border-wedding-light/10 bg-black/50 shrink-0 hover:scale-105 hover:rotate-6 transition-all duration-500 ease-out cursor-pointer group"
                onClick={() => handleOpenMap('google')} // Al hacer clic en el círculo abre Google Maps
            >
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.970104117076!2d-100.74602682496358!3d20.91448838070868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b51bc0d663b33%3A0xc3f8319f626154c1!2sHacienda%20Los%20Arcangeles!5e0!3m2!1ses-419!2smx!4v1709230000000!5m2!1ses-419!2smx" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, pointerEvents: 'none' }} // pointer-events-none para que el click lo detecte el div padre
                    allowFullScreen={true} 
                    loading="lazy"
                    // Siempre grayscale y oscuro para que sea abstracto
                    className="opacity-50 grayscale transition-all duration-500 group-hover:opacity-70 group-hover:scale-110" 
                />
                {/* Icono central decorativo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <MapPin className="text-wedding-secondary opacity-80 drop-shadow-lg" size={28} />
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}