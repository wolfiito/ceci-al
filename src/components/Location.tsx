// src/components/Location.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Map as MapIcon } from "lucide-react";

interface LocationProps {
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
}

export default function Location({ locationName, address, googleMapsUrl, wazeUrl }: LocationProps) {
  if (!locationName || !address) return null;

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <MapPin className="w-10 h-10 text-wedding-primary mx-auto opacity-50" />
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-dark italic">Ubicación</h2>
          
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-wedding-dark uppercase tracking-widest">
              {locationName}
            </h3>
            <p className="font-sans text-wedding-dark/60 max-w-md mx-auto leading-relaxed">
              {address}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
            {googleMapsUrl && (
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-wedding-dark text-white px-8 py-4 rounded-full font-serif tracking-widest hover:bg-wedding-primary transition-all shadow-lg"
              >
                <MapIcon size={18} />
                Google Maps
              </a>
            )}
            
            {wazeUrl && (
              <a 
                href={wazeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-wedding-dark text-wedding-dark px-8 py-4 rounded-full font-serif tracking-widest hover:bg-stone-50 transition-all"
              >
                <Navigation size={18} />
                Waze
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}