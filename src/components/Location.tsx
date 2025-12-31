"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Image from "next/image";

export default function Location() {
  // URLs de ejemplo - Luego las cambiamos por las reales de Google Maps
  const GOOGLE_MAPS_URL = "https://goo.gl/maps/placeholder"; 
  const WAZE_URL = "https://waze.com/ul/placeholder";

  return (
    <section className="py-20 bg-wedding-secondary/10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-dark mb-4">
            Ubicación
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La ceremonia y recepción se llevarán a cabo en este hermoso recinto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* Mapa Visual (Imagen estática o Embed) */}
          <div className="relative h-[300px] md:h-[400px] w-full bg-gray-200">
             {/* Aquí podrías usar un iframe de Google Maps, pero por diseño una foto del lugar o mapa estilizado se ve mejor */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d-99.133!3d19.432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU1LjIiTiA5OcKwMDgnMDAuMCJX!5e0!3m2!1ses!2smx!4v1600000000000!5m2!1ses!2smx" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
             </div>
          </div>

          {/* Botones de Acción */}
          <div className="p-8 md:p-12 text-center md:text-left">
            <h3 className="text-2xl font-serif text-wedding-primary mb-2">Hacienda Los Fresnos</h3>
            <p className="text-gray-500 mb-8">Carretera Federal Km 45, Bosque Real.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-wedding-primary text-white rounded-lg hover:bg-wedding-dark transition-colors"
              >
                <MapPin size={20} />
                Ver en Google Maps
              </a>
              
              <a 
                href={WAZE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#33CCFF] text-white rounded-lg hover:bg-[#2cb5e3] transition-colors shadow-sm"
              >
                <Navigation size={20} />
                Ir con Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}