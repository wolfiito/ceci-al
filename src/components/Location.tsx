// src/components/Location.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Map as MapIcon, ArrowRight } from "lucide-react";

interface LocationProps {
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
}

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Location({ locationName, address, googleMapsUrl, wazeUrl }: LocationProps) {
  // Si no hay datos, mostramos fallback para que el diseño no se rompa
  const venue = locationName || "Lugar del Evento";
  const venueAddress = address || "Dirección pendiente de confirmar";

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-wedding-dark text-wedding-light">
      
      {/* 1. FONDO CON TEXTURA Y GRADIENTE */}
      <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      
      {/* Círculo decorativo de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE_LUXURY }}
          className="space-y-12"
        >
          {/* ICONO FLOTANTE */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 shadow-2xl">
            <MapPin className="w-8 h-8 text-wedding-secondary" strokeWidth={1.5} />
          </div>

          {/* TEXTOS DE ALTO CONTRASTE */}
          <div className="space-y-4">
            {/* Cursiva elegante (Firma) */}
            <h2 className="font-serif text-5xl md:text-7xl text-wedding-secondary opacity-90 transform -rotate-2 origin-center">
               Nos vemos en
            </h2>
            
            {/* Nombre del lugar: GIGANTE y Sólido (Open Sans ExtraBold) */}
            <h3 className="font-sans text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg leading-tight max-w-4xl mx-auto">
              {venue}
            </h3>

            {/* Dirección: Pequeña y técnica */}
            <div className="pt-4 flex items-center justify-center gap-2 opacity-70">
                <div className="h-[1px] w-8 bg-white/40" />
                <p className="font-sans text-sm md:text-base font-light tracking-wide max-w-md">
                  {venueAddress}
                </p>
                <div className="h-[1px] w-8 bg-white/40" />
            </div>
          </div>

          {/* BOTONES DE ACCIÓN (Estilo Countdown) */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10">
            {/* Botón Google Maps */}
            {googleMapsUrl && (
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-white text-wedding-dark px-10 py-5 font-bold transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
              >
                <span className="relative flex items-center justify-center gap-3">
                  <MapIcon size={20} />
                  <span className="font-sans text-xs uppercase tracking-[0.2em]">Ver en Mapa</span>
                  <ArrowRight size={16} className="-ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </a>
            )}
            
            {/* Botón Waze (Outline) */}
            {wazeUrl && (
              <a 
                href={wazeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto overflow-hidden rounded-full border border-white/30 px-10 py-5 text-white transition-all hover:border-white"
              >
                {/* Fondo hover */}
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                
                <span className="relative flex items-center justify-center gap-3">
                  <Navigation size={20} />
                  <span className="font-sans text-xs uppercase tracking-[0.2em]">Ir con Waze</span>
                </span>
              </a>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}