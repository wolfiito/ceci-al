"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Navigation, Map as MapIcon, ExternalLink } from "lucide-react";

interface LocationProps {
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
}

export default function Location({ locationName, address, googleMapsUrl, wazeUrl }: LocationProps) {
  const venue = locationName || "Lugar del Evento";
  const venueAddress = address || "Dirección pendiente de confirmar";

  return (
    // FORZAMOS 'flex-row' SIEMPRE (incluso en mobile)
    <section className="relative w-full min-h-[50vh] flex flex-row bg-white overflow-hidden">
      
      {/* --- COLUMNA IZQUIERDA: IMAGEN (35% - 40% del ancho) --- */}
      <div className="relative w-[90%] md:w-1/2 h-auto">
        <Image
          src="/images/fincaBonanza.jpg" 
          alt="Venue"
          fill
          className="object-cover object-center"
        />
        {/* Degradado lateral para suavizar la unión con el blanco */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-transparent" />
        
        {/* Texto vertical o pequeño sobre la imagen en mobile */}
        <div className="absolute bottom-4 left-3 md:bottom-12 md:left-12 text-white z-10">
             <div className="hidden md:block h-1 w-12 bg-wedding-secondary mb-4 rounded-full" />
             {/* En mobile ocultamos el nombre grande de la foto para que no se corte, lo mostramos a la derecha */}
             <h2 className="hidden md:block font-serif text-5xl leading-none">
                {venue}
             </h2>
        </div>
      </div>

      {/* --- COLUMNA DERECHA: INFO (65% - 60% del ancho) --- */}
      <div className="relative w-[65%] md:w-1/2 flex flex-col justify-center p-4 md:p-24 bg-white">
        <h1>Ubicacion</h1>
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-wedding-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
        >
            {/* ICONO */}
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-16 md:h-16 rounded-full bg-wedding-light text-wedding-secondary mb-3 md:mb-8 border border-wedding-secondary/10">
                <MapPin className="w-4 h-4 md:w-8 md:h-8" strokeWidth={1.5} />
            </div>

            {/* Título (visible en mobile aquí) */}
            <h3 className="font-serif text-xl md:text-4xl text-wedding-dark mb-2 md:mb-6 leading-tight">
                {venue}
            </h3>
            
            {/* Dirección */}
            <p className="font-sans text-wedding-dark/60 text-[10px] md:text-lg mb-4 md:mb-10 leading-snug">
                {venueAddress}
            </p>

            {/* BOTONES COMPACTOS */}
            <div className="flex flex-col gap-2 md:gap-4 max-w-[200px] md:max-w-none">
                
                {/* Google Maps */}
                {googleMapsUrl && (
                    <a 
                        href={googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 md:gap-3 bg-wedding-dark text-white px-3 py-2 md:px-8 md:py-4 rounded-lg md:rounded-xl shadow-md active:scale-95 transition-all"
                    >
                        <MapIcon className="w-3 h-3 md:w-[18px] md:h-[18px]" />
                        <span className="font-sans text-[9px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                            Ver Mapa
                        </span>
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-50 ml-auto" />
                    </a>
                )}

                {/* Waze */}
                {wazeUrl && (
                    <a 
                        href={wazeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 md:gap-3 bg-[#F9F5F0] text-wedding-dark border border-wedding-dark/5 px-3 py-2 md:px-8 md:py-4 rounded-lg md:rounded-xl active:scale-95 transition-all"
                    >
                        <Navigation className="w-3 h-3 md:w-[18px] md:h-[18px] text-[#33CCFF]" />
                        <span className="font-sans text-[9px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                            Ir con Waze
                        </span>
                    </a>
                )}
            </div>

        </motion.div>
      </div>

    </section>
  );
}