"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

// NUESTRA CONSTANTE DE SUAVIDAD
const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Location() {
  const handleOpenMap = (app: 'waze' | 'google') => {
    // COORDENADAS (Hacienda Los Arcángeles, San Miguel)
    // Actualízalas si son diferentes
    const lat = "20.9144";
    const lng = "-100.7438";
    
    if (app === 'waze') {
      window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
  };

  return (
    // rounded-t-[3rem] crea ese efecto de "tarjeta" superpuesta elegante
    <section className="relative w-full py-24 bg-wedding-light overflow-hidden rounded-t-[3rem] -mt-12 z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
      
      {/* 1. HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_LUXURY }}
        className="text-center mb-16 px-4"
      >
        <span className="text-wedding-primary text-xs uppercase tracking-[0.4em] font-sans block mb-4">
            Destino
        </span>
        <h2 className="font-serif text-5xl md:text-6xl text-wedding-dark">
            Ubicación
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-12 items-center">
        
        {/* 2. MAPA (Entrada suave desde abajo) */}
        <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }} 
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_LUXURY }}
            className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-wedding-secondary/30 bg-gray-100 group"
        >
             {/* IFRAME REAL DE GOOGLE MAPS (San Miguel de Allende) */}
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.439399222485!2d-100.7460286249625!3d20.91475998070381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b510c66657691%3A0x66f6c77119253456!2sHacienda%20Los%20Arcangeles!5e0!3m2!1ses-419!2smx!4v1709234567890!5m2!1ses-419!2smx"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out" 
             />
             
             {/* Botón flotante "Ver Mapa" */}
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Ver Interactivo
             </div>
        </motion.div>

        {/* 3. INFO (Entrada retrasada) */}
        <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_LUXURY, delay: 0.2 }}
            className="text-center md:text-left space-y-6"
        >
            <div>
                <h3 className="text-3xl md:text-4xl font-serif text-wedding-dark mb-2">
                    Hacienda Los Arcángeles
                </h3>
                <div className="h-1 w-20 bg-wedding-secondary mx-auto md:mx-0 mb-4" />
                <p className="text-wedding-dark/70 font-sans font-light leading-relaxed text-lg">
                    San Miguel de Allende, Guanajuato.<br/>
                    <span className="text-sm uppercase tracking-wider opacity-60">Entrada Principal por Carr. a Dolores</span>
                </p>
            </div>

            {/* Botones Estilizados */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <button 
                    onClick={() => handleOpenMap('waze')}
                    className="group relative px-8 py-4 bg-wedding-dark text-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                    <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <div className="relative flex items-center justify-center gap-3">
                        <Navigation size={18} className="text-wedding-secondary" />
                        <span className="tracking-widest uppercase text-xs font-bold">Ir con Waze</span>
                    </div>
                </button>

                <button 
                    onClick={() => handleOpenMap('google')}
                    className="group px-8 py-4 bg-transparent border border-wedding-dark text-wedding-dark rounded-lg hover:bg-wedding-dark hover:text-white transition-all duration-300"
                >
                    <div className="flex items-center justify-center gap-3">
                        <MapPin size={18} />
                        <span className="tracking-widest uppercase text-xs font-bold">Google Maps</span>
                    </div>
                </button>
            </div>
            
        </motion.div>
      </div>
    </section>
  );
}